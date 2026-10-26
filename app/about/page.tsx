import Image from "next/image";
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
  description: `About ${site.fullName}: founded in loving memory of Radhakrishnan, with a commitment to clinical excellence, affordability, integrity and compassionate care.`,
  path: "/about",
});

export default function AboutPage() {
  const hero = getImage("exterior-angle");
  const side = getImage("waiting-area");
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Radhakrishnan Memorial Eye Care"
        intro="Founded in loving memory of Radhakrishnan, RKM carries a family’s shared commitment to protecting sight and serving people with integrity."
        image={{ src: hero.src, blurDataURL: hero.blurDataURL }}
      />

      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
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
                  <li key={c.title} className="border-l-2 border-teal pl-4">
                    <p className="font-bold text-navy">{c.title}</p>
                    <p className="text-[0.93rem] text-slate-600">{c.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-[1.75rem] shadow-lift">
              <Image
                src={side.src}
                alt={side.alt}
                width={side.width}
                height={side.height}
                placeholder="blur"
                blurDataURL={side.blurDataURL}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 text-sm text-slate-600">Architectural visualisation of the waiting area.</p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-mist" id="vision-mission">
        <div className="container-x">
          <SectionHeading eyebrow="Vision and Mission" title="Where we are headed, and how we get there" />
          <div className="mt-10 grid gap-5">
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
        </div>
      </section>

      <CtaBand />
    </>
  );
}
