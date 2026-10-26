import Image from "next/image";
import Link from "next/link";
import { APPOINTMENT_HREF, site } from "@/content/site";
import { getImage } from "@/content/gallery";
import { ArrowRight } from "./Icons";

/**
 * Home hero. Uses the supplied exterior architectural rendering.
 * Phones: text on navy, rendering shown whole below it.
 * Desktop: rendering full-bleed with the text in the dark shutter area above the signage.
 */
export function Hero() {
  const img = getImage("exterior-front");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy text-white lg:h-[clamp(48rem,calc(100svh-5rem),58rem)]"
    >
      {/* Content */}
      <div className="container-x relative z-10 pb-10 pt-12 sm:pt-16 lg:grid lg:h-full lg:grid-cols-[1.7fr_1fr] lg:items-start lg:gap-8 lg:pb-0 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.14em] backdrop-blur">
            <span aria-hidden="true" className="size-2 rounded-full bg-teal" />
            {site.openingStatus} · {site.town}
          </p>
          <h1
            id="hero-heading"
            className="mt-6 text-[clamp(2.4rem,6.4vw,3.6rem)] xl:text-[3.6rem] !font-medium leading-[1.06] !text-white"
          >
            A Clearer Vision.
            <br />
            <span className="text-[#7fe0e6]">A Brighter Tomorrow.</span>
          </h1>
        </div>

        <div className="mt-6 lg:mt-10">
          <p className="max-w-md text-[1.1rem] leading-relaxed text-white/90 lg:text-[1.15rem]">
            Compassionate, ethical and patient-focused eye care.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-wrap">
            <Link href={APPOINTMENT_HREF} className="btn btn-light">
              Book an Appointment
            </Link>
            <Link href="/services" className="btn btn-ghost-light">
              Explore Our Services
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:absolute lg:inset-0 lg:aspect-auto">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={img.blurDataURL}
          className="object-cover object-bottom"
        />
        {/* Navy-to-transparent gradients for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-navy to-transparent lg:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(to_bottom,rgb(18_60_97/0.96)_0%,rgb(18_60_97/0.8)_30%,rgb(18_60_97/0.3)_47%,rgb(18_60_97/0)_62%)]"
        />
      </div>
      <p className="relative bg-navy-900 px-5 py-2.5 text-center text-[0.7rem] font-bold uppercase tracking-wider text-white/90 lg:absolute lg:bottom-5 lg:right-5 lg:z-10 lg:rounded-full lg:bg-navy-900/70 lg:px-3 lg:py-1 lg:backdrop-blur">
        Architectural visualisation, not a photograph of the finished clinic
      </p>
    </section>
  );
}
