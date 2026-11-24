import Link from "next/link";
import { doctors } from "@/content/doctor";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { DoctorPortrait } from "./DoctorPortrait";
import { Reveal } from "./Reveal";
import { ArrowRight, ShieldIcon } from "./Icons";
import { SectionHeading } from "./Section";

export function DoctorFeature() {
  return (
    <section className="section" aria-labelledby="doctor-heading">
      <div className="container-x">
        <SectionHeading
          id="doctor-heading"
          eyebrow="Our Doctors"
          title="Meet the doctors behind your care"
        />
        <div className="mt-10 grid gap-12 md:grid-cols-2 lg:gap-16">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.slug} delay={i * 100} className="mx-auto w-full max-w-sm md:max-w-none">
              <DoctorPortrait doctor={doctor} />
              <h3 className="mt-6 text-[clamp(1.4rem,2.6vw,1.8rem)]">{doctor.name}</h3>
              <p className="mt-2 text-lg font-medium text-teal-700">{doctor.designation}</p>
              <dl className="mt-5 grid gap-5 border-y border-line py-5 sm:grid-cols-2">
                <div>
                  <dt className="label">Qualifications</dt>
                  <dd className="mt-1 text-lg font-semibold text-navy">{doctor.qualifications}</dd>
                </div>
                <div>
                  <dt className="label flex items-center gap-1.5">
                    <ShieldIcon width={16} height={16} className="text-teal-700" />
                    Registration
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-navy">
                    {doctor.registration.replace("TCMC Registration No: ", "TCMC No. ")}
                  </dd>
                </div>
              </dl>
              <Link href={`/doctor#${doctor.slug}`} className="btn btn-outline mt-6">
                View Full Profile
                <ArrowRight width={18} height={18} />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-xl text-slate-600">
          Care that begins by listening, with clear explanations and guidance towards the care each
          patient needs.
        </p>
        {site.bookingOpen ? (
          <Link href={APPOINTMENT_HREF} className="btn btn-primary mt-6">
            {cta.label}
          </Link>
        ) : null}
      </div>
    </section>
  );
}
