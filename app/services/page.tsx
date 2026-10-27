import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { PageHero, CtaBand } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { DraftNote } from "@/components/DraftNote";
import { Reveal } from "@/components/Reveal";

export const metadata = buildMetadata({
  title: "Eye Care Services in Parappanangadi",
  description: `Eye care at ${site.name}, Parappanangadi: general ophthalmology, paediatric eye care, cataract, corneal diseases, glaucoma, uvea and medical retina. Opening soon.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Eye Care Services", path: "/services" }])} />
      <PageHero
        eyebrow="Eye Care Services"
        title="Seven areas of eye care, one patient-first approach"
        intro="Each area below describes what the specialty looks after. Your doctor will explain what is right for you."
      />
      <section className="section">
        <div className="container-x">
          <Reveal className="mb-8">
            <DraftNote>
              Service availability to be confirmed by the clinic before this page is published
            </DraftNote>
          </Reveal>
          <ServicesGrid showDetail headingLevel="h2" />
          <Reveal className="mt-10 max-w-3xl rounded-2xl bg-mist p-6 text-[0.95rem] text-slate-600">
            <p>
              <strong className="text-navy">Please note:</strong> the information on this website is
              general and is not a substitute for an eye examination or medical advice. If you have
              a sudden change in vision, eye pain or an eye injury, please seek care from a qualified
              doctor without delay.
            </p>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
