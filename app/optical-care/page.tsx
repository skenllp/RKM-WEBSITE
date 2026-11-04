import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { getImage } from "@/content/gallery";
import { opticalAreas, opticalSpace } from "@/content/optical";
import { PageHero, SectionHeading, CtaBand } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export const metadata = buildMetadata({
  title: "Optical Care & Eyewear in Parappanangadi",
  description: `RKM Optical Care, the eyewear showroom beside ${site.name} in Parappanangadi, Kerala. Get your eye examination and eyewear in one place. Opening soon.`,
  path: "/optical-care",
});

export default function OpticalCarePage() {
  const hero = getImage("optical-showroom-wall");
  const a = getImage("optical-showroom-corner");
  const b = getImage("optical-waiting-view");
  const confirmed = opticalAreas.filter((x) => x.description !== null);
  const areas = confirmed.length > 0 ? confirmed : opticalSpace;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Optical Care", path: "/optical-care" }])} />
      <PageHero
        eyebrow="Optical Care"
        title="RKM Optical Care"
        intro="A calm, well-lit eyewear space designed to sit alongside the clinic."
      />

      <section className="section">
        <div className="container-x">
          <figure>
            <Reveal className="overflow-hidden rounded-2xl">
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

          <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <SectionHeading
              eyebrow="What to expect"
              title="Eyewear, in the same place as your eye care"
              intro="RKM Optical Care is planned as the eyewear showroom of RKM Eye Care, with open displays, seating for fittings and a counter for personal assistance."
            />
            <Reveal>
              <ul className="divide-y divide-line border-y border-line">
                {areas.map((o) => (
                  <li key={o.title} className="py-5">
                    <h3 className="text-[1.3rem]">{o.title}</h3>
                    {o.description ? (
                      <p className="mt-1 text-[0.97rem] text-slate-600">{o.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-24">
            {[a, b].map((g, i) => (
              <li key={g.id}>
                <Reveal delay={i * 100}>
                  <figure>
                    <div className="overflow-hidden rounded-2xl">
                      <Image
                        src={g.src}
                        alt={g.alt}
                        width={g.width}
                        height={g.height}
                        placeholder="blur"
                        blurDataURL={g.blurDataURL}
                        loading="lazy"
                        sizes="(min-width: 768px) 580px, 94vw"
                        className="aspect-[4/3] w-full object-cover"
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

          <Reveal className="mt-10 max-w-3xl rounded-2xl bg-ivory p-6 text-[0.95rem] text-slate-600">
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
