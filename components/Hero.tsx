import Image from "next/image";
import Link from "next/link";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { getImage } from "@/content/gallery";
import { ArrowRight } from "./Icons";

/**
 * Home hero. Text sits on a navy band, and the supplied exterior rendering is
 * framed below it, overlapping the band. Nothing covers the image, so the
 * signage stays crisp and it never scales past its source resolution.
 */
export function Hero() {
  const img = getImage("exterior-front");

  return (
    <section aria-labelledby="hero-heading">
      <div className="relative isolate overflow-hidden bg-navy text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(70rem_32rem_at_85%_-20%,rgb(0_160_170/0.28),transparent_65%)]"
        />
        <div className="container-x pb-28 pt-14 sm:pb-36 sm:pt-20 lg:pb-44 xl:grid xl:grid-cols-[1.35fr_1fr] xl:items-end xl:gap-12">
          <div>
            <p className="inline-flex items-center gap-2.5 text-[0.74rem] font-bold uppercase tracking-[0.2em] text-white/85">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-aqua" />
              {site.openingStatus} · {site.town}
            </p>
            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.5rem,6.4vw,3.75rem)] leading-[1.06] !text-white"
            >
              A Clearer Vision.
              <br />
              <span className="text-aqua">A Brighter Tomorrow.</span>
            </h1>
          </div>

          <div className="mt-6 xl:mt-0">
            <p className="max-w-md text-[1.1rem] leading-relaxed text-white/85">
              Compassionate, ethical and patient-focused eye care.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={APPOINTMENT_HREF} className="btn btn-light">
                {cta.label}
              </Link>
              <Link href="/services" className="btn btn-ghost-light">
                Explore Our Services
                <ArrowRight width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <figure className="container-x relative z-10 -mt-20 sm:-mt-28 lg:-mt-32">
        <div className="overflow-hidden rounded-2xl shadow-lift">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            priority
            sizes="(min-width: 1216px) 1152px, 94vw"
            placeholder="blur"
            blurDataURL={img.blurDataURL}
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm text-slate-600">
          Architectural visualisation, not a photograph of the finished clinic.
        </figcaption>
      </figure>
    </section>
  );
}
