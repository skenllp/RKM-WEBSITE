import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { doctor } from "@/content/doctor";
import { APPOINTMENT_HREF, site } from "@/content/site";
import { physicianJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, CtaBand } from "@/components/Section";
import { DoctorPortrait } from "@/components/DoctorPortrait";
import { DraftNote } from "@/components/DraftNote";
import { Reveal } from "@/components/Reveal";
import { CalendarIcon, ShieldIcon } from "@/components/Icons";

export const metadata = buildMetadata({
  title: `${doctor.name}, ${doctor.designation}`,
  description: `${doctor.name} (${doctor.qualifications}), ${doctor.designation} at ${site.name}.`,
  path: "/doctor",
});

function Pending({ children }: { children: string }) {
  return <DraftNote alwaysShow={false}>{children}</DraftNote>;
}

export default function DoctorPage() {
  const { biography, qualificationDetails, clinicalInterests, awards } = doctor;
  return (
    <>
      <JsonLd data={physicianJsonLd()} />
      <PageHero
        eyebrow="Our Doctor"
        title={doctor.name}
        intro={`${doctor.designation}. ${doctor.qualifications}.`}
      />

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Profile card */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="mx-auto max-w-sm lg:max-w-none">
              <DoctorPortrait priority />
              <div className="card mt-5 p-6">
                <h2 className="text-2xl">{doctor.name}</h2>
                <p className="mt-1 font-semibold text-teal-700">{doctor.designation}</p>
                <dl className="mt-5 grid gap-3 text-[0.95rem]">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                      Qualifications
                    </dt>
                    <dd className="font-bold text-navy">{doctor.qualifications}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                      <ShieldIcon width={16} height={16} className="text-teal-700" />
                      Registration
                    </dt>
                    <dd className="font-bold text-navy">{doctor.registration}</dd>
                  </div>
                </dl>
                <Link href={APPOINTMENT_HREF} className="btn btn-primary mt-6 w-full">
                  <CalendarIcon width={19} height={19} />
                  Book an Appointment
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <div className="grid content-start gap-12">
            <Reveal>
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">Biography</h2>
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
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">Qualifications</h2>
              <ul className="mt-5 grid gap-3">
                {qualificationDetails ? (
                  qualificationDetails.map((q) => (
                    <li key={q.title} className="card p-5">
                      <p className="font-bold text-navy">{q.title}</p>
                      {q.institution ? <p className="text-slate-600">{q.institution}</p> : null}
                    </li>
                  ))
                ) : (
                  <li className="card p-5">
                    <p className="font-bold text-navy">{doctor.qualifications}</p>
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
                <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">Areas of Clinical Interest</h2>
                {clinicalInterests ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {clinicalInterests.map((c) => (
                      <li key={c} className="card p-5 font-semibold text-navy">
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
                <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">Academic Awards and Achievements</h2>
                {awards ? (
                  <ul className="mt-5 grid gap-3">
                    {awards.map((a) => (
                      <li key={a} className="card p-5 font-semibold text-navy">
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

      <CtaBand
        title={`Book a consultation with ${doctor.name}`}
        text="Send an appointment request and the clinic will contact you to confirm a time."
      />
    </>
  );
}
