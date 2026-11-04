import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site } from "@/content/site";
import { PageHero } from "@/components/Section";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ClinicDetails } from "@/components/ClinicDetails";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, InstagramIcon } from "@/components/Icons";

export const metadata = buildMetadata({
  title: site.bookingOpen ? "Contact & Book an Appointment" : "Contact & Opening Updates",
  description: site.bookingOpen
    ? `Contact ${site.name} in Parappanangadi or send an appointment request online. The clinic will call you to confirm a suitable time.`
    : `${site.name} is opening soon in Parappanangadi. Follow ${site.instagram.handle} for the opening date and first appointments.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact Us"
        title={site.bookingOpen ? "We would be glad to hear from you" : "We are opening soon"}
        intro={
          site.bookingOpen
            ? "Send an appointment request below. The clinic will contact you to confirm a suitable time."
            : `RKM Eye Care is coming to ${site.town}. Appointments and contact details will be published here before we open.`
        }
      />

      <section className="section !pt-10 lg:!pt-14">
        <div className="container-x">
          <Reveal className="mb-10 border-l-2 border-[#b42318] bg-ivory p-5 text-base text-slate-600 sm:px-6 lg:mb-14">
            <p>
              <strong className="text-navy">In an emergency:</strong> for a sudden loss of vision, a
              serious eye injury or severe eye pain, please seek urgent medical care. This website
              does not provide emergency services.
            </p>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal>
              <div id="appointment" className="card p-6 sm:p-10" role="region" aria-labelledby="appointment-heading">
                {site.bookingOpen ? (
                  <>
                    <h2 id="appointment-heading" className="mb-3 text-[clamp(1.7rem,3vw,2.3rem)]">
                      Request an appointment
                    </h2>
                    <AppointmentForm />
                  </>
                ) : (
                  <>
                    <h2 id="appointment-heading" className="text-[clamp(1.7rem,3vw,2.3rem)]">
                      Appointments open soon
                    </h2>
                    <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-slate-600">
                      Online appointment requests will open here closer to the opening date. Follow us
                      on Instagram to hear first when they do.
                    </p>
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-7"
                    >
                      <InstagramIcon width={19} height={19} />
                      Follow {site.instagram.handle}
                      <ArrowRight width={18} height={18} />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </>
                )}
              </div>
            </Reveal>

            <aside aria-label="Clinic contact details" className="lg:pt-10">
              <Reveal>
                <h2 className="mb-6 text-2xl">Clinic details</h2>
                <ClinicDetails />
              </Reveal>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
