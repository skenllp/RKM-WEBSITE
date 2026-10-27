import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { getImage } from "@/content/gallery";
import { PageHero, CtaBand } from "@/components/Section";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { Reveal } from "@/components/Reveal";

export const metadata = buildMetadata({
  title: "Clinic & Optical Showroom Facilities",
  description: `A first look at the ${site.name} eye clinic and RKM Optical Care in Parappanangadi: reception, consultation rooms and the optical showroom (architectural visualisations).`,
  path: "/facilities",
});

export default function FacilitiesPage() {
  const hero = getImage("exterior-front");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Facilities", path: "/facilities" }])} />
      <PageHero
        eyebrow="Facilities"
        title="A first look at the clinic"
        intro="Explore the clinic exterior, reception and waiting area, consultation area and optical showroom."
        image={{ src: hero.src, blurDataURL: hero.blurDataURL }}
      />
      <section className="section">
        <div className="container-x">
          <Reveal className="mb-8 max-w-3xl rounded-2xl border border-teal/30 bg-mist p-5 text-[0.95rem] text-slate-600">
            <p>
              <strong className="text-navy">Architectural visualisations.</strong> These images are
              design renderings, not photographs of the completed clinic. They will be replaced with
              photographs once the clinic is complete, and the finished spaces may differ.
            </p>
          </Reveal>
          <GalleryExplorer />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
