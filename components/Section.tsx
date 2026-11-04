import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { InstagramIcon, ArrowRight } from "./Icons";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  id,
  as: Tag = "h2",
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  /** "dark" is for headings on a navy section. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className={cn("eyebrow", dark && "!text-aqua")}>{eyebrow}</p> : null}
      <Tag id={id} className={cn("mt-5 text-[clamp(2rem,4.2vw,3.1rem)]", dark && "!text-white")}>
        {title}
      </Tag>
      {intro ? (
        <div className={cn("mt-5 text-[1.05rem] leading-relaxed", dark ? "text-white/80" : "text-slate-600")}>
          {intro}
        </div>
      ) : null}
    </Reveal>
  );
}

/** Compact page header for inner pages: navy band, optional background image. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  image?: { src: string; blurDataURL?: string };
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {image ? (
        /* Phones get a plain navy band so no picture ever sits behind text; the render appears from tablet width up. */
        <div aria-hidden="true" className="absolute inset-0 -z-20 hidden md:block">
          <Image
            src={image.src}
            alt=""
            fill
            sizes="100vw"
            placeholder={image.blurDataURL ? "blur" : "empty"}
            blurDataURL={image.blurDataURL}
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgb(0_160_170/0.28),transparent_60%)]"
        />
      )}
      <div className="container-x py-14 sm:py-16 lg:py-20">
        <p className="eyebrow !text-aqua">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,3.5rem)] !text-white">{title}</h1>
        {intro ? (
          <div className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/85">{intro}</div>
        ) : null}
      </div>
    </section>
  );
}

/** Closing call-to-action band shared by most pages. Sits on ivory, so the section before it should be white. */
export function CtaBand({
  title = "Ready to look after your eyes?",
  text = "Send an appointment request and the clinic will get back to you to confirm.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-ivory">
      <div className="container-x section">
        <Reveal className="relative isolate overflow-hidden rounded-2xl bg-navy px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(44rem_22rem_at_50%_-20%,rgb(0_160_170/0.3),transparent_70%)]"
          />
          <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,4vw,2.9rem)] !text-white">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            {site.bookingOpen
              ? text
              : `We are opening soon in ${site.town}. Follow along for the opening date and first appointments.`}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={APPOINTMENT_HREF} className="btn btn-light">
              {cta.label}
            </Link>
            {site.bookingOpen ? (
              <Link href="/contact" className="btn btn-ghost-light">
                Contact Us
              </Link>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Instagram tile that sits beside news posts. */
export function InstagramCard({ title, text }: { title: string; text: string }) {
  return (
    <a
      href={site.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full min-h-64 flex-col justify-between gap-10 rounded-2xl bg-navy p-8 text-white transition-colors duration-300 hover:bg-navy-900"
    >
      <InstagramIcon width={32} height={32} className="text-aqua" />
      <span>
        <span className="block font-display text-[1.6rem] leading-snug">{title}</span>
        <span className="mt-2 block text-white/80">{text}</span>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          Open Instagram
          <ArrowRight width={18} height={18} className="transition group-hover:translate-x-1" />
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      </span>
    </a>
  );
}
