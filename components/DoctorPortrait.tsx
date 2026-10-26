import Image from "next/image";
import { doctor } from "@/content/doctor";
import { DraftNote } from "./DraftNote";
import { cn } from "@/lib/utils";

/**
 * Shows the approved portrait when `doctor.photo` is set; otherwise a neutral
 * placeholder (no stock or generated photograph is used).
 */
export function DoctorPortrait({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-mist to-mist-200",
        className,
      )}
    >
      {doctor.photo ? (
        <Image
          src={doctor.photo}
          alt={doctor.photoAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
          <svg
            viewBox="0 0 200 200"
            className="w-3/5 max-w-60 text-navy/25"
            fill="currentColor"
            role="img"
            aria-label="Portrait placeholder"
          >
            <circle cx="100" cy="72" r="38" />
            <path d="M24 188c4-44 36-68 76-68s72 24 76 68Z" />
          </svg>
          <DraftNote alwaysShow>Professional portrait to be provided</DraftNote>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-navy via-teal to-navy"
      />
    </div>
  );
}
