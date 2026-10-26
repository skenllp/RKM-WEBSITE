import type { SVGProps } from "react";
import type { ServiceIcon } from "@/content/services";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------- Service icons (line style) ---------- */

export function EyeIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  );
}
function ChildIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 9.6h.01M15.8 9.6h.01" strokeWidth="2.4" />
      <path d="M8.6 14.2c.9 1.3 2 1.9 3.4 1.9s2.5-.6 3.4-1.9" />
      <path d="M12 3.2c.2 1.2-.3 2-1.2 2.6" />
    </Base>
  );
}
function CataractIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.6" />
      <path d="M9.6 10.4c.5-.9 1.4-1.4 2.4-1.4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </Base>
  );
}
function CorneaIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M4 17a8 8 0 0 1 16 0" />
      <path d="M7 17a5 5 0 0 1 10 0" />
      <path d="M3 17h18" />
      <path d="M12 4.5V3M5.6 7 4.5 5.9M18.4 7l1.1-1.1" />
      <path d="M9 21h6" />
    </Base>
  );
}
function GlaucomaIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M2 11s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6Z" />
      <circle cx="11" cy="11" r="2.6" />
      <path d="M18 17.5c1.1-.8 2-1.7 2.6-2.5M15 20.3l1.2.4M19.5 19.2l.8-.6" />
    </Base>
  );
}
function UveaIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M5.4 7.5a9 9 0 0 1 13.2 0" />
      <circle cx="12" cy="12" r="5.5" strokeDasharray="2 2.4" />
      <circle cx="12" cy="12" r="2" />
    </Base>
  );
}
function RetinaIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="1.4" />
      <path d="M12 12 7.5 8M12 12l5-1.5M12 12l-1 6M12 12l4.2 4" />
      <path d="M14.4 7.2a5 5 0 0 1 2.6 2" />
    </Base>
  );
}

export function ServiceGlyph({ name, ...p }: P & { name: ServiceIcon }) {
  switch (name) {
    case "eye":
      return <EyeIcon {...p} />;
    case "child":
      return <ChildIcon {...p} />;
    case "cataract":
      return <CataractIcon {...p} />;
    case "cornea":
      return <CorneaIcon {...p} />;
    case "glaucoma":
      return <GlaucomaIcon {...p} />;
    case "uvea":
      return <UveaIcon {...p} />;
    case "retina":
      return <RetinaIcon {...p} />;
  }
}

/* ---------- UI icons ---------- */

export function MenuIcon(p: P) {
  return (
    <Base strokeWidth="2" {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  );
}
export function CloseIcon(p: P) {
  return (
    <Base strokeWidth="2" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  );
}
export function ArrowRight(p: P) {
  return (
    <Base strokeWidth="2" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}
export function PhoneIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M5 4h3.5l1.6 4.2-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2L19 14.5V18a2 2 0 0 1-2.2 2A14.5 14.5 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
    </Base>
  );
}
export function MailIcon(p: P) {
  return (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  );
}
export function PinIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M12 21s7-6.2 7-11.2A7 7 0 0 0 5 9.8C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </Base>
  );
}
export function ClockIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </Base>
  );
}
export function CalendarIcon(p: P) {
  return (
    <Base {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </Base>
  );
}
export function InstagramIcon(p: P) {
  return (
    <Base {...p}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" />
    </Base>
  );
}
export function CheckIcon(p: P) {
  return (
    <Base strokeWidth="2.2" {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Base>
  );
}
export function UserIcon(p: P) {
  return (
    <Base {...p}>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.5 20c.8-3.6 3.7-5.5 7.5-5.5s6.7 1.9 7.5 5.5" />
    </Base>
  );
}
export function ShieldIcon(p: P) {
  return (
    <Base {...p}>
      <path d="M12 3 5 6v5.5c0 4.4 2.9 7.9 7 9.5 4.1-1.6 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </Base>
  );
}
export function WhatsAppIcon(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true" focusable="false" {...p}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.13.82.84-3.05-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.9c-.2 0-.52.07-.8.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.07 3.3 5.1 4.5 2.52 1 3.03.8 3.57.75.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35s-1.77-.87-2.04-.97c-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07a8.2 8.2 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5s.05-.38-.02-.53c-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57Z" />
    </svg>
  );
}
