import Link from "next/link";
import { services } from "@/content/services";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { ArrowRight, ServiceGlyph } from "./Icons";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Hairline grid of the seven services.
 *  - Default (home page): each tile links to its entry on the services page,
 *    and on phones collapses to a compact row without the summary.
 *  - `showDetail` (services page): full text, not linked.
 */
export function ServicesGrid({
  showDetail = false,
  headingLevel: H = "h3",
}: {
  showDetail?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Reveal>
      <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s) => (
          <li key={s.slug} className="bg-white">
            <article
              id={showDetail ? s.slug : undefined}
              className={cn(
                "group relative h-full",
                showDetail
                  ? "p-7 lg:p-8"
                  : "flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-ivory sm:block sm:p-7 lg:p-8",
              )}
            >
              <ServiceGlyph name={s.icon} width={28} height={28} className="shrink-0 text-teal-700" />
              <H className={showDetail ? "mt-6 text-[1.35rem]" : "min-w-0 flex-1 text-[1.15rem] sm:mt-6 sm:text-[1.35rem]"}>
                {showDetail ? (
                  s.title
                ) : (
                  <Link href={`/services#${s.slug}`} className="after:absolute after:inset-0 after:content-['']">
                    {s.title}
                  </Link>
                )}
              </H>
              {showDetail ? null : (
                <ArrowRight width={18} height={18} className="shrink-0 text-navy/40 sm:hidden" />
              )}
              <p className={cn("mt-3 text-[0.97rem] leading-relaxed text-slate-600", !showDetail && "hidden sm:block")}>
                {s.summary}
              </p>
              {showDetail ? (
                <p className="mt-3 text-[0.97rem] leading-relaxed text-slate-600">{s.detail}</p>
              ) : null}
            </article>
          </li>
        ))}
        <li className="bg-navy">
          <Link
            href={APPOINTMENT_HREF}
            className="group flex h-full flex-col justify-between gap-6 p-7 text-white transition-colors duration-300 hover:bg-navy-900 lg:p-8"
          >
            <span className="block font-display text-[1.35rem] leading-snug">
              Not sure which service you need?
            </span>
            <span>
              <span className="block text-[0.95rem] text-white/80">
                {site.bookingOpen
                  ? "Send an appointment request and we will guide you."
                  : "We will guide you when we open. Follow along for the date."}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                {cta.label}
                <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </Reveal>
  );
}
