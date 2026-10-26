import Link from "next/link";
import { services } from "@/content/services";
import { APPOINTMENT_HREF } from "@/content/site";
import { ArrowRight, CalendarIcon, ServiceGlyph } from "./Icons";
import { Reveal } from "./Reveal";

export function ServicesGrid({
  showDetail = false,
  headingLevel: H = "h3",
}: {
  showDetail?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((s, i) => (
        <li key={s.slug} className="h-full">
          <Reveal delay={(i % 4) * 70} className="h-full">
            <article
              id={s.slug}
              className="card group flex h-full flex-col p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="flex size-14 items-center justify-center rounded-2xl bg-mist text-teal-700 transition group-hover:bg-navy group-hover:text-white">
                <ServiceGlyph name={s.icon} width={28} height={28} />
              </span>
              <H className="mt-6 text-[1.35rem]">{s.title}</H>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-slate-600">{s.summary}</p>
              {showDetail ? (
                <p className="mt-3 text-[0.97rem] leading-relaxed text-slate-600">{s.detail}</p>
              ) : null}
            </article>
          </Reveal>
        </li>
      ))}
      <li className="h-full">
        <Reveal delay={210} className="h-full">
          <Link
            href={APPOINTMENT_HREF}
            className="group flex h-full min-h-60 flex-col justify-between rounded-[1.25rem] bg-navy p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-teal">
              <CalendarIcon width={28} height={28} />
            </span>
            <span>
              <span className="mt-6 block font-display text-[1.35rem] leading-snug">
                Not sure which service you need?
              </span>
              <span className="mt-2 block text-[0.95rem] text-white/80">
                Send an appointment request and we will guide you.
              </span>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                Book an Appointment
                <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </Reveal>
      </li>
    </ul>
  );
}
