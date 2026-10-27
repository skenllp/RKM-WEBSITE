import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { site, telHref } from "@/content/site";
import { PageHero } from "@/components/Section";
import { AppointmentForm } from "@/components/AppointmentForm";
import { DraftNote } from "@/components/DraftNote";
import { Reveal } from "@/components/Reveal";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/Icons";

export const metadata = buildMetadata({
  title: "Contact & Book an Appointment",
  description: `Contact ${site.name} in Parappanangadi or send an appointment request online. The clinic will call you to confirm a suitable time.`,
  path: "/contact",
});

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mist text-teal-700">
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">{label}</p>
        <div className="mt-0.5 font-semibold text-navy">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact Us", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact Us"
        title="We would be glad to hear from you"
        intro="Send an appointment request below. The clinic will contact you to confirm a suitable time."
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <div
              id="appointment"
              className="card scroll-mt-28 p-6 sm:p-10"
              role="region"
              aria-labelledby="appointment-heading"
            >
              <h2 id="appointment-heading" className="text-[clamp(1.6rem,3vw,2.2rem)]">
                Request an appointment
              </h2>
              <p className="mb-7 mt-3 text-slate-600">
                This sends a request to the clinic. Your appointment is confirmed only when the clinic
                contacts you.
              </p>
              <AppointmentForm />
            </div>
          </Reveal>

          <aside aria-label="Clinic contact details" className="grid content-start gap-6">
            <Reveal className="card p-6 sm:p-8">
              <h2 className="text-2xl">Clinic details</h2>
              <ul className="mt-6 grid gap-6">
                <Row icon={<PinIcon width={22} height={22} />} label="Location">
                  {c.address ? (
                    <>
                      {c.address.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                      {c.mapsUrl ? (
                        <a
                          href={c.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-teal-700 underline"
                        >
                          Open in Google Maps
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <span className="block">Coming soon to {site.town}</span>
                      <DraftNote alwaysShow className="mt-2">Address and map link to be confirmed</DraftNote>
                    </>
                  )}
                </Row>
                <Row icon={<PhoneIcon width={22} height={22} />} label="Phone">
                  {c.phone ? (
                    <a href={telHref(c.phone)} className="hover:underline">{c.phone}</a>
                  ) : (
                    <DraftNote alwaysShow>Phone number to be confirmed</DraftNote>
                  )}
                </Row>
                <Row icon={<MailIcon width={22} height={22} />} label="Email">
                  {c.email ? (
                    <a href={`mailto:${c.email}`} className="break-all hover:underline">{c.email}</a>
                  ) : (
                    <DraftNote alwaysShow>Email address to be confirmed</DraftNote>
                  )}
                </Row>
                <Row icon={<ClockIcon width={22} height={22} />} label="Opening hours">
                  {c.hours ? (
                    c.hours.map((h) => (
                      <span key={h.days} className="block">{h.days}: {h.time}</span>
                    ))
                  ) : (
                    <DraftNote alwaysShow>Opening hours to be confirmed</DraftNote>
                  )}
                </Row>
                <Row icon={<InstagramIcon width={22} height={22} />} label="Instagram">
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {site.instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Row>
              </ul>
            </Reveal>
            <Reveal delay={80} className="rounded-2xl bg-mist p-6 text-[0.95rem] text-slate-600">
              <p>
                <strong className="text-navy">In an emergency:</strong> for a sudden loss of vision,
                a serious eye injury or severe eye pain, please seek urgent medical care. This website
                does not provide emergency services.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
