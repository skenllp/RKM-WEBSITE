import type { ReactNode } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Small, clearly labelled marker for information the clinic has not confirmed.
 * Hidden everywhere when `site.showDraftNotes` is set to false.
 */
export function DraftNote({
  children,
  className,
  alwaysShow = false,
}: {
  children: ReactNode;
  className?: string;
  /** Show even when draft notes are switched off (used where a value is simply missing). */
  alwaysShow?: boolean;
}) {
  if (!site.showDraftNotes && !alwaysShow) return null;
  return <span className={cn("draft-note", className)}>{children}</span>;
}
