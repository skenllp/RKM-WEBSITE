import type { AppointmentInput } from "@/lib/appointment";

/**
 * Server-only: adds an appointment request as a row in the clinic's Google
 * Sheet, through the Apps Script web app in docs/google-sheets-apps-script.gs.
 */

export type SheetConfig = { url: string; secret: string };

/** Null until both settings are present. */
export function sheetConfig(): SheetConfig | null {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  return url && secret ? { url, secret } : null;
}

/** True only after the script confirms that the row was written. */
export async function saveToSheet({ url, secret }: SheetConfig, request: AppointmentInput) {
  const { name, phone, date, time, reason, message } = request;
  try {
    // Apps Script answers a POST with a redirect to the result, which fetch follows.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name, phone, date, time, reason, message }),
      signal: AbortSignal.timeout(15_000),
    });
    // A broken deployment can answer 200 with an HTML page, so check the reply itself.
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (res.ok && data?.ok === true) return true;
    console.error(
      "[appointments] Google Sheet rejected the request",
      res.status,
      String(data?.error ?? "unexpected reply").slice(0, 300),
    );
  } catch (err) {
    console.error("[appointments] Google Sheet could not be reached", err instanceof Error ? err.name : "unknown error");
  }
  return false;
}
