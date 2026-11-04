import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { newsPosts } from "@/content/news";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { ServicesGrid } from "@/components/ServicesGrid";
import { DoctorFeature } from "@/components/DoctorFeature";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { NewsCard } from "@/components/NewsCard";
import { ClinicDetails } from "@/components/ClinicDetails";
import { DraftNote } from "@/components/DraftNote";
import { ArrowRight } from "@/components/Icons";

export const metadata = buildMetadata({
  title: site.name,
  description: site.seoDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

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
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/services" className="btn btn-outline">
              All Services
              <ArrowRight width={18} height={18} />
            </Link>
            <Link href="/optical-care" className="btn btn-outline">
              Optical Care
              <ArrowRight width={18} height={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <DoctorFeature />

      {/* Clinic images */}
      <section className="section bg-ivory" aria-labelledby="facilities-heading">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="facilities-heading"
              eyebrow="Facilities"
              title="A first look at the clinic"
              intro="Architectural visualisations of the clinic. The finished spaces may differ."
            />
            <Reveal>
              <Link href="/facilities" className="btn btn-outline">
                View Full Gallery
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10">
            <GalleryExplorer
              showFilters={false}
              only={["reception-entrance", "consultation-room", "waiting-area"]}
              preview
            />
          </div>
        </div>
      </section>

      {/* Contact details and opening news */}
      <section className="section" aria-labelledby="visit-heading">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              id="visit-heading"
              eyebrow="Visit Us"
              title={site.bookingOpen ? "Book your visit" : `Opening soon in ${site.town}`}
              intro={
                site.bookingOpen
                  ? "Send an appointment request and the clinic will contact you to confirm a time."
                  : "Follow along for the opening date and first appointments."
              }
            />
            <Reveal delay={80} className="mt-8">
              <ClinicDetails />
              <Link href={APPOINTMENT_HREF} className="btn btn-primary mt-8">
                {cta.label}
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <NewsCard post={newsPosts[0]} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
