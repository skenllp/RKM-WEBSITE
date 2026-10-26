import { services } from "@/content/services";

/**
 * Shared (browser + server) description and validation of the appointment
 * enquiry. The server always re-validates; the browser uses the same rules
 * for instant feedback.
 */

export const TIME_WINDOWS = [
  "Morning",
  "Afternoon",
  "Evening",
  "No preference",
] as const;

export const REASONS = [
  ...services.map((s) => s.title),
  "Not sure / something else",
] as const;

export type AppointmentInput = {
  name: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string;
  reason: string;
  message: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<keyof AppointmentInput, string>>;

export const LIMITS = { name: 80, message: 600, phoneMin: 8, phoneMax: 15 };

/** Strip control characters and collapse whitespace. */
export function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  v = multiline ? v.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : v.replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

/** Today's date (YYYY-MM-DD) in India time, independent of the viewer's or server's time zone. */
export function todayIST(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Accepts Indian mobile numbers (with optional +91 / 91 / 0) and other international numbers written with "+". */
export function normalisePhone(raw: string): string | null {
  const trimmed = raw.trim();
  const international = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");
  if (international && !digits.startsWith("91")) {
    return digits.length >= LIMITS.phoneMin && digits.length <= LIMITS.phoneMax ? `+${digits}` : null;
  }
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91 ${digits}` : null;
}

export function validateAppointment(input: AppointmentInput, now = new Date()): FieldErrors {
  const errors: FieldErrors = {};
  if (input.name.length < 2) errors.name = "Please enter the patient’s name.";
  if (!normalisePhone(input.phone))
    errors.phone = "Please enter a valid phone number, for example 98765 43210.";

  const today = todayIST(now);
  const latest = addDays(today, 90);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.date = "Please choose a preferred date.";
  else if (input.date < today) errors.date = "Please choose today or a later date.";
  else if (input.date > latest) errors.date = "Please choose a date within the next 90 days.";

  if (!(TIME_WINDOWS as readonly string[]).includes(input.time))
    errors.time = "Please choose a preferred time.";
  if (!(REASONS as readonly string[]).includes(input.reason))
    errors.reason = "Please choose a reason for the consultation.";
  if (!input.consent) errors.consent = "Please tick the box so we may contact you about this request.";
  return errors;
}
