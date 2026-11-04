import Link from "next/link";
import { doctor } from "@/content/doctor";
import { APPOINTMENT_HREF, cta, site } from "@/content/site";
import { DoctorPortrait } from "./DoctorPortrait";
import { Reveal } from "./Reveal";
import { ArrowRight, ShieldIcon } from "./Icons";
import { SectionHeading } from "./Section";

export function DoctorFeature() {
  return (
    <section className="section" aria-labelledby="doctor-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <DoctorPortrait />
        </Reveal>

        <div>
          <SectionHeading
            id="doctor-heading"
            eyebrow="Our Doctor"
            title="Meet the doctor behind your care"
          />
          <Reveal delay={100} className="mt-8">
            <h3 className="text-[clamp(1.5rem,3vw,2rem)]">{doctor.name}</h3>
            <p className="mt-2 text-lg font-medium text-teal-700">{doctor.designation}</p>
            <dl className="mt-7 grid gap-5 border-y border-line py-5 sm:grid-cols-2">
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
            <p className="mt-6 max-w-xl text-slate-600">
              Care that begins by listening, with clear explanations and guidance towards the care
              each patient needs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/doctor" className="btn btn-primary">
                View Full Profile
                <ArrowRight width={18} height={18} />
              </Link>
              {site.bookingOpen ? (
                <Link href={APPOINTMENT_HREF} className="btn btn-outline">
                  {cta.label}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
