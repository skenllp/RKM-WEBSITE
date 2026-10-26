import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { getImage } from "@/content/gallery";
import { opticalAreas } from "@/content/optical";
import { PageHero, SectionHeading, CtaBand } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { DraftNote } from "@/components/DraftNote";
import { EyeIcon } from "@/components/Icons";

export const metadata = buildMetadata({
  title: "Optical Care",
  description: `RKM Optical Care, the eyewear showroom of ${site.name}. Architectural visualisations of the optical space.`,
  path: "/optical-care",
});

export default function OpticalCarePage() {
  const hero = getImage("optical-showroom-wall");
  const a = getImage("optical-showroom-corner");
  const b = getImage("optical-waiting-view");
  const areas = opticalAreas.filter((x) => x.description !== null || site.showDraftNotes);

  return (
    <>
      <PageHero
        eyebrow="Optical Care"
        title="RKM Optical Care"
        intro="A calm, well-lit eyewear space designed to sit alongside the clinic."
        image={{ src: hero.src, blurDataURL: hero.blurDataURL }}
      />

      <section className="section">
        <div className="container-x">
          <figure>
            <Reveal className="overflow-hidden rounded-[1.75rem] shadow-lift">
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                placeholder="blur"
                blurDataURL={hero.blurDataURL}
                sizes="(min-width: 1216px) 1184px, 94vw"
                className="h-auto w-full"
              />
            </Reveal>
            <figcaption className="mt-3 text-sm text-slate-600">
              Architectural visualisation of the RKM Optical Care showroom. The finished showroom may differ.
            </figcaption>
          </figure>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <SectionHeading
              eyebrow="What to expect"
              title="Eyewear, in the same place as your eye care"
              intro="RKM Optical Care is planned as the eyewear showroom of RKM Eye Care, with open displays, seating for fittings and a counter for personal assistance."
            />
            <div>
              <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {areas.map((o, i) => (
                  <li key={o.title}>
                    <Reveal delay={i * 80} className="h-full">
                      <div className="card h-full p-6">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-mist text-teal-700">
                          <EyeIcon width={26} height={26} />
                        </span>
                        <h3 className="mt-5 text-[1.3rem]">{o.title}</h3>
                        {o.description ? (
                          <p className="mt-2 text-[0.95rem] text-slate-600">{o.description}</p>
                        ) : (
                          <p className="mt-3">
                            <DraftNote>Details to be confirmed</DraftNote>
                          </p>
                        )}
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <Reveal className="mt-5">
                <DraftNote>Optical products and services will be listed once the clinic confirms them</DraftNote>
              </Reveal>
            </div>
          </div>

          <ul className="mt-16 grid gap-5 md:grid-cols-2">
            {[a, b].map((g, i) => (
              <li key={g.id}>
                <Reveal delay={i * 100}>
                  <figure>
                    <div className="overflow-hidden rounded-[1.5rem] shadow-soft">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        placeholder="blur"
                        blurDataURL={g.blurDataURL}
                        loading="lazy"
                        sizes="(min-width: 768px) 580px, 94vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-slate-600">
                      {g.caption}. Architectural visualisation.
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10 max-w-3xl rounded-2xl bg-mist p-6 text-[0.95rem] text-slate-600">
            <p>
              <strong className="text-navy">About the visualisations:</strong> signage, fittings and any
              eyewear brand names shown in these images are part of the architectural design and do not
              indicate an official retail partnership. Products and brands will be confirmed by the clinic.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Visit RKM Optical Care" text="Send an appointment request for an eye examination, or get in touch with the clinic." />
    </>
  );
}
