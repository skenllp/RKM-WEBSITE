import { NextResponse } from "next/server";
import {
  LIMITS,
  clean,
  normalisePhone,
  validateAppointment,
  type AppointmentInput,
} from "@/lib/appointment";

/**
 * Appointment enquiry endpoint.
 *
 * Delivery: the request is emailed to the clinic via Resend. A request is only
 * reported as received (HTTP 200) AFTER the email provider has accepted it.
 * If delivery is not configured, the endpoint answers 503 with
 * `code: "not_configured"` and the website never shows a success message.
 *
 * Privacy: nothing is stored in a database or written to logs by this code.
 * Personal details exist only in the email sent to the clinic.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort throttles per server instance (use a Vercel WAF / Firewall rate-limit rule for stricter, shared limits).
//  - "attempts": every request, generous, stops hammering of the endpoint
//  - "sends": only requests that pass validation and would send an email, tight, stops email flooding
// Mistyped forms therefore never use up a visitor's email allowance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 40;
const MAX_SENDS = 5;
const MAX_BODY_BYTES = 8 * 1024;
const buckets = { attempts: new Map<string, number[]>(), sends: new Map<string, number[]>() };

function overLimit(kind: keyof typeof buckets, ip: string, max: number) {
  const map = buckets[kind];
  const now = Date.now();
  const recent = (map.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    map.set(ip, recent);
    return true;
  }
  recent.push(now);
  map.set(ip, recent);
  if (map.size > 5000) map.clear();
  return false;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: Record<string, unknown>, status: number, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  // Same-origin only. Browsers always send an Origin header on a cross-site or same-site POST,
  // so a missing or different Origin is rejected. (This stops other websites and casual scripts;
  // it is not a substitute for a CAPTCHA, see README "Before going live".)
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let originHost = "";
  try {
    originHost = origin ? new URL(origin).host : "";
  } catch {
    /* invalid origin */
  }
  if (!origin || !host || originHost !== host) return json({ code: "forbidden" }, 403);

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json"))
    return json({ code: "invalid" }, 415);
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BODY_BYTES) return json({ code: "too_large" }, 413);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPOINTMENT_TO_EMAIL;
  const from = process.env.APPOINTMENT_FROM_EMAIL;
  if (!apiKey || !to || !from) return json({ code: "not_configured" }, 503);

  // On Vercel these headers are set by the platform and cannot be spoofed by the visitor.
  const ip = (
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for") ??
    "unknown"
  )
    .split(",")[0]
    .trim();
  if (overLimit("attempts", ip, MAX_ATTEMPTS))
    return json({ code: "rate_limited" }, 429, { "Retry-After": "600" });

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return json({ code: "too_large" }, 413);
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") throw new Error("bad body");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json({ code: "invalid" }, 400);
  }

  // Honeypot: real people never fill this hidden field. Pretend success to bots, deliver nothing.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const input: AppointmentInput = {
    name: clean(raw.name, LIMITS.name),
    phone: clean(raw.phone, 30),
    date: clean(raw.date, 10),
    time: clean(raw.time, 30),
    reason: clean(raw.reason, 80),
    message: clean(raw.message, LIMITS.message, true),
    consent: raw.consent === true,
  };

  const errors = validateAppointment(input);
  if (Object.keys(errors).length > 0) return json({ code: "invalid", errors }, 422);

  if (overLimit("sends", ip, MAX_SENDS)) return json({ code: "rate_limited" }, 429, { "Retry-After": "600" });

  const phone = normalisePhone(input.phone) ?? input.phone;
  const lines = [
    "New appointment REQUEST (not a confirmed booking)",
    "",
    `Patient name: ${input.name}`,
    `Phone: ${phone}`,
    `Preferred date: ${input.date}`,
    `Preferred time: ${input.time}`,
    `Reason: ${input.reason}`,
    `Message: ${input.message || "(none)"}`,
    "",
    "Consent to be contacted about this request: Yes",
    "",
    "Please contact the patient to confirm or arrange a suitable time.",
  ];
  const html = `<div style="font-family:Arial,sans-serif;color:#1d2b3a;line-height:1.55">
<h2 style="color:#123C61;margin:0 0 4px">New appointment request</h2>
<p style="margin:0 0 16px;color:#4a5b6c">This is a request only, not a confirmed booking.</p>
<table cellpadding="6" style="border-collapse:collapse">
<tr><td><b>Patient name</b></td><td>${escapeHtml(input.name)}</td></tr>
<tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
<tr><td><b>Preferred date</b></td><td>${escapeHtml(input.date)}</td></tr>
<tr><td><b>Preferred time</b></td><td>${escapeHtml(input.time)}</td></tr>
<tr><td><b>Reason</b></td><td>${escapeHtml(input.reason)}</td></tr>
<tr><td valign="top"><b>Message</b></td><td>${escapeHtml(input.message || "(none)").replace(/\n/g, "<br>")}</td></tr>
</table>
<p style="margin-top:16px">Consent to be contacted about this request: <b>Yes</b></p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        subject: `Appointment request: ${input.name} (${input.date})`,
        text: lines.join("\n"),
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Log only the provider's status and error text (never the patient's details) so a wrong key
      // or an unverified sender domain is easy to diagnose in the Vercel function logs.
      const detail = await res.text().catch(() => "");
      console.error("[appointments] email provider rejected the request", res.status, detail.slice(0, 300));
      return json({ code: "delivery_failed" }, 502);
    }
  } catch (err) {
    console.error("[appointments] email delivery failed", err instanceof Error ? err.name : "unknown error");
    return json({ code: "delivery_failed" }, 502);
  }

  return json({ ok: true }, 200);
}

export function GET() {
  return json({ code: "method_not_allowed" }, 405, { Allow: "POST" });
}
