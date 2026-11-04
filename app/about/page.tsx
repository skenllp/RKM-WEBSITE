import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { intro } from "@/content/about";
import { getImage } from "@/content/gallery";
import { site } from "@/content/site";
import { PageHero, SectionHeading, CtaBand } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  CoreValues,
  FoundationBlock,
  PatientPromise,
  VisionMissionBlock,
} from "@/components/VisionMission";

export const metadata = buildMetadata({
  title: "About Us",
  description: `About ${site.fullName}, an eye clinic and optical showroom coming soon to Parappanangadi, Kerala. Founded in loving memory of Radhakrishnan on clinical excellence, affordability, integrity and compassion.`,
  path: "/about",
});

export default function AboutPage() {
  const hero = getImage("exterior-angle");
  const side = getImage("waiting-area");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About Us", path: "/about" }])} />
      <PageHero
        eyebrow="About Us"
        title="Radhakrishnan Memorial Eye Care"
        intro="Founded in loving memory of Radhakrishnan, RKM carries a family’s shared commitment to protecting sight and serving people with integrity."
        image={{ src: hero.src, blurDataURL: hero.blurDataURL }}
      />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow="Who we are" title={intro.heading} />
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
                    <p className="text-base text-slate-600">{c.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={side.src}
                alt={side.alt}
                width={side.width}
                height={side.height}
                placeholder="blur"
                blurDataURL={side.blurDataURL}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">Architectural visualisation of the waiting area.</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy" id="vision-mission">
        <div className="container-x">
          <SectionHeading tone="dark" eyebrow="Vision and Mission" title="Where we are headed, and how we get there" />
          <div className="mt-12 grid gap-10 md:gap-14">
            <VisionMissionBlock />
            <FoundationBlock />
          </div>
        </div>
      </section>

      <section className="section" id="values">
        <div className="container-x">
          <CoreValues />
          <div className="mt-10">
            <PatientPromise />
          </div>
          <Reveal className="mt-8">
            <Link href="/news" className="btn btn-outline">
              News &amp; Updates
              <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
