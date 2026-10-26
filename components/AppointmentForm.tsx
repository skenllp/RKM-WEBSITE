"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import {
  LIMITS,
  REASONS,
  TIME_WINDOWS,
  addDays,
  clean,
  todayIST,
  validateAppointment,
  type AppointmentInput,
  type FieldErrors,
} from "@/lib/appointment";
import { CheckIcon } from "./Icons";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "unavailable" | "rate_limited" | "error";

const EMPTY: AppointmentInput = {
  name: "",
  phone: "",
  date: "",
  time: "",
  reason: "",
  message: "",
  consent: false,
};

const FIELD_ORDER: (keyof AppointmentInput)[] = [
  "name",
  "phone",
  "date",
  "time",
  "reason",
  "message",
  "consent",
];

export function AppointmentForm() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<AppointmentInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [range, setRange] = useState<{ min: string; max: string } | null>(null);
  const [sentName, setSentName] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // Date limits are computed after mount so server and browser markup always match.
  useEffect(() => {
    const t = todayIST();
    setRange({ min: t, max: addDays(t, 90) });
  }, []);

  useEffect(() => {
    if (status !== "idle" && status !== "submitting") resultRef.current?.focus();
  }, [status]);

  function set<K extends keyof AppointmentInput>(key: K, value: AppointmentInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function focusFirstError(errs: FieldErrors) {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) document.getElementById(id(first))?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const input: AppointmentInput = {
      ...values,
      name: clean(values.name, LIMITS.name),
      phone: clean(values.phone, 30),
      message: clean(values.message, LIMITS.message, true),
    };
    const errs = validateAppointment(input);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
      });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: honeypot }),
      });

      if (res.ok) {
        setSentName(input.name.split(" ")[0]);
        setValues(EMPTY); // do not keep personal details in the page after sending
        setErrors({});
        setStatus("success");
        return;
      }

      const data = (await res.json().catch(() => ({}))) as {
        code?: string;
        errors?: FieldErrors;
      };
      if (res.status === 503 && data.code === "not_configured") setStatus("unavailable");
      else if (res.status === 429) setStatus("rate_limited");
      else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => focusFirstError(data.errors!));
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const showResult = status !== "idle" && status !== "submitting";

  if (status === "success") {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-teal/40 bg-mist p-8 outline-none"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-teal text-white">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="mt-5 text-2xl">
          Thank you{sentName ? `, ${sentName}` : ""}. Your request has been sent.
        </h3>
        <p className="mt-3 text-slate-600">
          This is an appointment <strong>request</strong>, not a confirmed booking. The clinic will
          contact you on the phone number you gave to confirm a suitable time.
        </p>
        <button
          type="button"
          className="btn btn-outline mt-6"
          onClick={() => {
            setStatus("idle");
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={id("intro")} className="grid gap-5">
      <p id={id("intro")} className="text-[0.95rem] text-slate-600">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required. Sending this form requests an
        appointment. It does not confirm one.
      </p>

      {errorList.length > 0 ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-xl border border-[#b42318]/40 bg-[#fef3f2] p-4 text-sm text-[#7a271a] outline-none"
        >
          <p className="font-bold">Please check the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k)}`} className="underline" onClick={(ev) => { ev.preventDefault(); document.getElementById(id(k))?.focus(); }}>
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Field label="Patient name" id={id("name")} required error={errors.name}>
        <input
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={LIMITS.name}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? `${id("name")}-err` : undefined}
          className="field"
        />
      </Field>

      <Field
        label="Phone number"
        id={id("phone")}
        required
        error={errors.phone}
        hint="We will use this number to confirm your request."
      >
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={30}
          placeholder="98765 43210"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={
            [`${id("phone")}-hint`, errors.phone ? `${id("phone")}-err` : ""].filter(Boolean).join(" ")
          }
          className="field"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Preferred date" id={id("date")} required error={errors.date}>
          <input
            id={id("date")}
            name="date"
            type="date"
            required
            min={range?.min}
            max={range?.max}
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? `${id("date")}-err` : undefined}
            className="field"
          />
        </Field>
        <Field label="Preferred time" id={id("time")} required error={errors.time}>
          <select
            id={id("time")}
            name="time"
            required
            value={values.time}
            onChange={(e) => set("time", e.target.value)}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? `${id("time")}-err` : undefined}
            className="field"
          >
            <option value="">Select a time of day</option>
            {TIME_WINDOWS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Reason for consultation" id={id("reason")} required error={errors.reason}>
        <select
          id={id("reason")}
          name="reason"
          required
          value={values.reason}
          onChange={(e) => set("reason", e.target.value)}
          aria-invalid={!!errors.reason}
          aria-describedby={errors.reason ? `${id("reason")}-err` : undefined}
          className="field"
        >
          <option value="">Select a reason</option>
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Message (optional)"
        id={id("message")}
        error={errors.message}
        hint={`Please do not include detailed medical records. ${values.message.length}/${LIMITS.message}`}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-describedby={`${id("message")}-hint`}
          className="field resize-y"
        />
      </Field>

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${id("consent")}-err` : undefined}
            className="mt-1 size-5 shrink-0 accent-navy"
          />
          <label htmlFor={id("consent")} className="text-[0.95rem] leading-relaxed text-slate-600">
            I agree that RKM Eye Care may contact me by phone about this request. My details will be
            used only to respond to it, as described in the{" "}
            <Link href="/privacy" className="font-semibold text-navy underline">
              Privacy Notice
            </Link>
            . <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
        </div>
        {errors.consent ? (
          <p id={`${id("consent")}-err`} className="mt-2 text-sm font-semibold text-[#b42318]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary w-full sm:w-auto sm:min-w-64 disabled:opacity-70">
          {status === "submitting" ? "Sending request…" : "Request Appointment"}
        </button>
      </div>

      {showResult ? (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className={cn(
            "rounded-xl border p-5 text-[0.95rem] outline-none",
            status === "unavailable"
              ? "border-[#b7791f]/50 bg-[#fff8e6] text-[#7a4b00]"
              : "border-[#b42318]/40 bg-[#fef3f2] text-[#7a271a]",
          )}
        >
          {status === "unavailable" ? (
            <>
              <p className="font-bold">Online requests are not open yet.</p>
              <p className="mt-1">
                Your request has <strong>not</strong> been sent. Please use the contact details on
                this page once they are published, or follow our Instagram page for updates.
              </p>
            </>
          ) : status === "rate_limited" ? (
            <>
              <p className="font-bold">Too many requests.</p>
              <p className="mt-1">Your request has not been sent. Please wait a few minutes and try again.</p>
            </>
          ) : (
            <>
              <p className="font-bold">We could not send your request.</p>
              <p className="mt-1">
                Nothing has been sent. Please check your connection and try again, or contact the
                clinic directly.
              </p>
            </>
          )}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  id,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-navy">
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-[#b42318]">*</span>
            <span className="sr-only">(required)</span>
          </>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.82rem] text-slate-600">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-sm font-semibold text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
