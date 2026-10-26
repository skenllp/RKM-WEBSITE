import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Tag id={id} className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)]">{title}</Tag>
      {intro ? (
        <div className="mt-5 text-[1.05rem] leading-relaxed text-slate-600">{intro}</div>
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
          className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_90%_-10%,rgb(0_160_170/0.35),transparent_60%)]"
        />
      )}
      <div className="container-x py-16 sm:py-20 lg:py-28">
        <p className="eyebrow !text-white/85 before:!bg-teal">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,3.75rem)] !text-white">{title}</h1>
        {intro ? (
          <div className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/85">{intro}</div>
        ) : null}
      </div>
    </section>
  );
}

/** Closing call-to-action band shared by most pages. */
export function CtaBand({
  title = "Ready to look after your eyes?",
  text = "Send an appointment request and the clinic will get back to you to confirm.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-mist">
      <div className="container-x section">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-teal/25 blur-3xl"
          />
          <h2 className="relative mx-auto max-w-2xl text-[clamp(1.8rem,4vw,2.75rem)] !text-white">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-white/85">{text}</p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact#appointment" className="btn btn-light">
              Book an Appointment
            </Link>
            <Link href="/contact" className="btn btn-ghost-light">
              Contact Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
