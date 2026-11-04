import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { intro } from "@/content/about";
import { getImage } from "@/content/gallery";
import { newsPosts } from "@/content/news";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, CtaBand, InstagramCard } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { DoctorFeature } from "@/components/DoctorFeature";
import { VisionMissionBlock, PatientPromise } from "@/components/VisionMission";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { NewsCard } from "@/components/NewsCard";
import { DraftNote } from "@/components/DraftNote";
import { ArrowRight } from "@/components/Icons";

export const metadata = buildMetadata({
  title: site.name,
  description: site.seoDescription,
  path: "/",
});

export default function HomePage() {
  const about = getImage("waiting-area");
  const opt1 = getImage("optical-showroom-wall");
  const opt2 = getImage("optical-showroom-corner");

  return (
    <>
      <Hero />

      {/* About RKM */}
      <section className="section" aria-labelledby="about-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading id="about-heading" eyebrow="About RKM" title={intro.heading} />
            <Reveal delay={80} className="mt-6 grid gap-4 text-[1.05rem] leading-relaxed text-slate-600">
              {intro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal delay={140}>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {intro.commitments.map((c) => (
                  <li key={c.title} className="border-t border-line pt-3">
                    <p className="font-semibold text-navy">{c.title}</p>
                    <p className="text-[0.93rem] text-slate-600">{c.text}</p>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn btn-outline mt-9">
                More About Us
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100} className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={about.src}
                alt={about.alt}
                width={about.width}
                height={about.height}
                placeholder="blur"
                blurDataURL={about.blurDataURL}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">Architectural visualisation of the waiting area.</p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section bg-ivory" aria-labelledby="services-heading">
        <div className="container-x">
          <SectionHeading
            id="services-heading"
            eyebrow="Eye Care Services"
            title="Comprehensive eye care, explained with clarity"
            intro="From routine eye examinations to long-term conditions, our care is guided by clinical need and explained in plain language."
          />
          <Reveal className="mt-4">
            <DraftNote>Service availability to be confirmed by the clinic before launch</DraftNote>
          </Reveal>
          <div className="mt-10">
            <ServicesGrid />
          </div>
        </div>
      </section>

      <DoctorFeature />

      {/* Optical Care */}
      <section className="section bg-ivory" aria-labelledby="optical-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div className="grid grid-cols-5 items-end gap-4">
            <Reveal className="col-span-3">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={opt1.src}
                  alt={opt1.alt}
                  width={opt1.width}
                  height={opt1.height}
                  placeholder="blur"
                  blurDataURL={opt1.blurDataURL}
                  sizes="(min-width: 1024px) 400px, 56vw"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120} className="col-span-2">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src={opt2.src}
                  alt={opt2.alt}
                  width={opt2.width}
                  height={opt2.height}
                  placeholder="blur"
                  blurDataURL={opt2.blurDataURL}
                  sizes="(min-width: 1024px) 270px, 38vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
            <p className="col-span-5 text-sm text-slate-600">
              Architectural visualisations of RKM Optical Care.
            </p>
          </div>
          <div>
            <SectionHeading
              id="optical-heading"
              eyebrow="Optical Care"
              title="RKM Optical Care"
              intro="A calm, well-lit eyewear space alongside the clinic, so your eye examination and your eyewear can be in one place."
            />
            <Reveal delay={100}>
              <DraftNote className="mt-5">Optical services to be confirmed by the clinic</DraftNote>
              <Link href="/optical-care" className="btn btn-primary mt-7">
                Explore Optical Care
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-navy" aria-labelledby="vision-heading">
        <div className="container-x">
          <SectionHeading tone="dark" id="vision-heading" eyebrow="Vision and Mission" title="Where we are headed, and how we get there" />
          <div className="mt-12">
            <VisionMissionBlock />
          </div>
          <div className="mt-12">
            <PatientPromise tone="dark" />
          </div>
          <Reveal className="mt-8">
            <Link href="/about#values" className="btn btn-ghost-light">
              Our Core Values
              <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Facilities */}
      <section className="section bg-ivory" aria-labelledby="facilities-heading">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="facilities-heading"
              eyebrow="Facilities"
              title="A first look at the clinic"
              intro="Architectural visualisations of the clinic and optical showroom. The finished spaces may differ."
            />
            <Reveal>
              <Link href="/facilities" className="btn btn-outline">
                View Full Gallery
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10">
            <GalleryExplorer showFilters={false} limit={6} preview />
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section" aria-labelledby="news-heading">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading id="news-heading" eyebrow="News & Updates" title="The latest from RKM" />
            <Reveal>
              <Link href="/news" className="btn btn-outline">
                All Updates
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            <li className="lg:col-span-2">
              <Reveal className="h-full">
                <NewsCard post={newsPosts[0]} featured />
              </Reveal>
            </li>
            <li>
              <Reveal delay={100} className="h-full">
                <InstagramCard
                  title={`Follow ${site.instagram.handle}`}
                  text="Opening news and eye-health awareness posts from RKM Eye Care."
                />
              </Reveal>
            </li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
