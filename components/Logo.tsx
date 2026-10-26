import Image from "next/image";
import Link from "next/link";
import sizes from "@/content/logo-size.json";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The official RKM Eye Care logo, extracted from the supplied brand document
 * (not a re-drawn replacement).
 *  - "colour": full-colour logo for white backgrounds
 *  - "white":  single-colour white version of the same artwork for dark backgrounds
 * `withTagline` switches between the logo with and without the tagline line.
 */
export function Logo({
  variant = "colour",
  withTagline = false,
  className,
  priority = false,
  linked = true,
  height = 44,
}: {
  variant?: "colour" | "white";
  withTagline?: boolean;
  className?: string;
  priority?: boolean;
  linked?: boolean;
  /** rendered height in px */
  height?: number;
}) {
  const dims = withTagline ? sizes.logo : sizes.mark;
  const white = variant === "white";
  const src = withTagline
    ? white
      ? "/brand/rkm-logo-white.png"
      : "/brand/rkm-logo.png"
    : white
      ? "/brand/rkm-logo-white-mark.png"
      : "/brand/rkm-logo-mark.png";
  const width = Math.round((height * dims.width) / dims.height);

  const img = (
    <Image
      src={src}
      alt=""
      width={dims.width}
      height={dims.height}
      priority={priority}
      sizes={`${width}px`}
      style={{ height, width }}
    />
  );

  if (!linked) {
    return (
      <span className={cn("inline-block", className)} role="img" aria-label={`${site.name} logo`}>
        {img}
      </span>
    );
  }
  return (
    <Link href="/" className={cn("inline-block", className)} aria-label={`${site.name}, home`}>
      {img}
    </Link>
  );
}
