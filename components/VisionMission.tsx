import { coreValues, foundation, mission, promise, vision } from "@/content/about";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./Section";
import { cn } from "@/lib/utils";

/** Vision, mission and mission-statement text are used verbatim from the supplied document. */

/** A label and statement under a hairline, for navy sections. */
function Statement({ label, text, delay }: { label: string; text: string; delay?: number }) {
  return (
    <Reveal delay={delay} className="border-t border-white/25 pt-6">
      <p className="eyebrow !text-aqua before:hidden">{label}</p>
      <p className="mt-5 font-display text-[clamp(1.4rem,2.4vw,1.85rem)] leading-snug text-white">{text}</p>
    </Reveal>
  );
}

export function VisionMissionBlock() {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <Statement label="Our Vision" text={vision} />
      <Statement label="Our Mission" text={mission} delay={90} />
    </div>
  );
}

export function FoundationBlock() {
  return <Statement label="Our Foundation" text={foundation} />;
}

export function CoreValues() {
  return (
    <div>
      <SectionHeading eyebrow="Our Core Values" title="What guides every decision" />
      <Reveal className="mt-12">
        <ul className="grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((v) => (
            <li key={v.title} className="border-t border-line pt-5">
              <h3 className="text-[1.3rem]">{v.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{v.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** `tone="dark"` is for use inside a navy section. */
export function PatientPromise({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("rounded-2xl p-8 sm:p-12", dark ? "bg-white/[0.06]" : "bg-ivory")}>
      <p className={cn("eyebrow", dark && "!text-aqua")}>Our Promise</p>
      <p
        className={cn(
          "mt-5 max-w-3xl font-display text-[clamp(1.5rem,2.8vw,2.2rem)] leading-snug",
          dark ? "text-white" : "text-navy",
        )}
      >
        {promise}
      </p>
    </Reveal>
  );
}
