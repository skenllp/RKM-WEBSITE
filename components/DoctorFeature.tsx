import Link from "next/link";
import { doctor } from "@/content/doctor";
import { APPOINTMENT_HREF } from "@/content/site";
import { DoctorPortrait } from "./DoctorPortrait";
import { Reveal } from "./Reveal";
import { ArrowRight, ShieldIcon } from "./Icons";
import { SectionHeading } from "./Section";

export function DoctorFeature() {
  return (
    <section className="section bg-mist" aria-labelledby="doctor-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
          <DoctorPortrait />
        </Reveal>

        <div>
          <SectionHeading
            eyebrow="Our Doctor"
            title="Meet the doctor behind your care"
          />
          <Reveal delay={100} className="mt-8">
            <h3 id="doctor-heading" className="font-display text-[clamp(1.6rem,3vw,2.2rem)]">
              {doctor.name}
            </h3>
            <p className="mt-2 text-lg font-semibold text-teal-700">{doctor.designation}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                  Qualifications
                </dt>
                <dd className="mt-1 text-lg font-bold text-navy">{doctor.qualifications}</dd>
              </div>
              <div className="card p-5">
                <dt className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
                  <ShieldIcon width={16} height={16} className="text-teal-700" />
                  Registration
                </dt>
                <dd className="mt-1 text-lg font-bold text-navy">
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
              <Link href={APPOINTMENT_HREF} className="btn btn-outline">
                Book an Appointment
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
