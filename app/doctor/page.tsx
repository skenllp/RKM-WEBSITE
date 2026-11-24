import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { doctors, type Doctor } from "@/content/doctor";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { physicianJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, CtaBand } from "@/components/Section";
import { DoctorPortrait } from "@/components/DoctorPortrait";
import { DraftNote } from "@/components/DraftNote";
import { Reveal } from "@/components/Reveal";
import { CalendarIcon, ShieldIcon } from "@/components/Icons";

export const metadata = buildMetadata({
  title: "Our Doctors, Ophthalmologists",
  description: `${doctors.map((d) => `${d.name} (${d.qualifications})`).join(" and ")}, Consultant Ophthalmologists and Surgeons. Eye care for Parappanangadi and Malappuram at ${site.name}.`,
  path: "/doctor",
});

function Pending({ children }: { children: string }) {
  return <DraftNote alwaysShow={false}>{children}</DraftNote>;
}

const H2 = "text-[clamp(1.7rem,3vw,2.3rem)]";
/** Hairline-separated list for plain facts, so they do not read as clickable cards. */
const LIST = "mt-5 divide-y divide-line border-y border-line";

function DoctorProfile({ doctor, priority }: { doctor: Doctor; priority?: boolean }) {
  const { biography, qualificationDetails, clinicalInterests, awards } = doctor;
  return (
      <section id={doctor.slug} className="section scroll-mt-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* Profile card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="mx-auto max-w-sm lg:max-w-none">
              <DoctorPortrait doctor={doctor} priority={priority} />
              <dl className="mt-6 grid gap-4 text-base">
                <div>
                  <dt className="label">Qualifications</dt>
                  <dd className="mt-0.5 font-semibold text-navy">{doctor.qualifications}</dd>
                </div>
                <div>
                  <dt className="label flex items-center gap-1.5">
                    <ShieldIcon width={16} height={16} className="text-teal-700" />
                    Registration
                  </dt>
                  <dd className="mt-0.5 font-semibold text-navy">{doctor.registration}</dd>
                </div>
              </dl>
              <Link href={APPOINTMENT_HREF} className="btn btn-primary mt-6 w-full">
                <CalendarIcon width={19} height={19} />
                {cta.label}
              </Link>
            </Reveal>
          </div>

          {/* Details */}
          <div className="grid content-start gap-14">
            <Reveal>
              <h2 className={H2}>Biography</h2>
              <div className="mt-5 grid gap-4 text-[1.05rem] leading-relaxed text-slate-600">
                {biography ? (
                  biography.map((p) => <p key={p}>{p}</p>)
                ) : (
                  <>
                    <p>
                      {doctor.name} is a {doctor.designation} at {site.name}.
                    </p>
                    <Pending>Complete biography to be provided by the clinic</Pending>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal>
              <h2 className={H2}>Qualifications</h2>
              <ul className={LIST}>
                {qualificationDetails ? (
                  qualificationDetails.map((q) => (
                    <li key={q.title} className="py-4">
                      <p className="font-semibold text-navy">{q.title}</p>
                      {q.institution ? <p className="text-slate-600">{q.institution}</p> : null}
                    </li>
                  ))
                ) : (
                  <li className="py-4">
                    <p className="font-semibold text-navy">{doctor.qualifications}</p>
                  </li>
                )}
              </ul>
              {!qualificationDetails ? (
                <p className="mt-3">
                  <Pending>Full qualification details (institutions and years) to be provided</Pending>
                </p>
              ) : null}
            </Reveal>

            {/* The next two sections appear when filled in, or as labelled placeholders while draft notes are on. */}
            {clinicalInterests || site.showDraftNotes ? (
              <Reveal>
                <h2 className={H2}>Areas of Clinical Interest</h2>
                {clinicalInterests ? (
                  <ul className="mt-5 grid gap-x-10 border-t border-line sm:grid-cols-2">
                    {clinicalInterests.map((c) => (
                      <li key={c} className="border-b border-line py-4 font-medium text-navy">
                        {c}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5">
                    <Pending>Areas of clinical interest to be provided by the clinic</Pending>
                  </p>
                )}
              </Reveal>
            ) : null}

            {awards || site.showDraftNotes ? (
              <Reveal>
                <h2 className={H2}>Academic Awards and Achievements</h2>
                {awards ? (
                  <ul className={LIST}>
                    {awards.map((a) => (
                      <li key={a} className="py-4 font-medium text-navy">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-5">
                    <Pending>Academic awards and achievements to be provided by the clinic</Pending>
                  </p>
                )}
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>
  );
}

export default function DoctorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Our Doctors", path: "/doctor" }])} />
      {physicianJsonLd().map((d) => (
        <JsonLd key={d["@id"]} data={d} />
      ))}
      <PageHero
        eyebrow="Our Doctors"
        title="Meet our ophthalmologists"
        intro="Consultant Ophthalmologists and Surgeons committed to ethical, compassionate and patient-centred eye care."
      />
      {doctors.map((doctor, i) => (
        <DoctorProfile key={doctor.slug} doctor={doctor} priority={i === 0} />
      ))}
      <CtaBand
        title={site.bookingOpen ? "Book a consultation" : "Meet our doctors when we open"}
        text="Send an appointment request and the clinic will contact you to confirm a time."
      />
    </>
  );
}
