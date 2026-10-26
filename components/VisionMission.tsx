import { coreValues, foundation, mission, promise, vision } from "@/content/about";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { CheckIcon } from "./Icons";

/** Vision, mission and mission-statement text are used verbatim from the supplied document. */
export function VisionMissionBlock() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Reveal className="rounded-[1.5rem] bg-navy p-8 text-white sm:p-10">
        <p className="eyebrow !text-[#7fe0e6] before:!bg-teal">Our Vision</p>
        <p className="mt-5 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
          {vision}
        </p>
      </Reveal>
      <Reveal delay={90} className="rounded-[1.5rem] bg-teal-700 p-8 text-white sm:p-10">
        <p className="eyebrow !text-white before:!bg-white/70">Our Mission</p>
        <p className="mt-5 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] leading-snug">
          {mission}
        </p>
      </Reveal>
    </div>
  );
}

export function FoundationBlock() {
  return (
    <Reveal className="rounded-[1.5rem] border border-mist-200 bg-white p-8 shadow-soft sm:p-10">
      <p className="eyebrow">Our Foundation</p>
      <p className="mt-5 max-w-3xl font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug text-navy">
        {foundation}
      </p>
    </Reveal>
  );
}

export function CoreValues() {
  return (
    <div>
      <SectionHeading eyebrow="Our Core Values" title="What guides every decision" />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {coreValues.map((v, i) => (
          <li key={v.title}>
            <Reveal delay={(i % 3) * 70} className="h-full">
              <div className="card h-full p-7">
                <span className="flex size-9 items-center justify-center rounded-full bg-teal/15 text-teal-700">
                  <CheckIcon width={18} height={18} />
                </span>
                <h3 className="mt-5 text-[1.3rem]">{v.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-slate-600">{v.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PatientPromise() {
  return (
    <Reveal className="rounded-[1.5rem] bg-mist p-8 sm:p-12">
      <p className="eyebrow">Our Promise</p>
      <p className="mt-5 max-w-3xl font-display text-[clamp(1.4rem,2.8vw,2.1rem)] leading-snug text-navy">
        {promise}
      </p>
    </Reveal>
  );
}
