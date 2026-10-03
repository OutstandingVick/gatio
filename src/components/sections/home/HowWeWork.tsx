import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const TONES = ["bg-sky text-accent", "bg-mint text-teal", "bg-blush text-plum", "bg-butter text-mustard-text"];

export function HowWeWork({
  heading,
  steps,
}: {
  heading?: string | null;
  steps: { _key: string; label: string | null; title: string | null; text: string | null }[];
}) {
  if (!steps.length) return null;
  return (
    <Section labelledBy="steps-title">
      <SectionHeading id="steps-title" eyebrow="How we work" align="center" title={heading || "From question {blossom} to *answer*"} />
      <ol className="grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s._key} className="flex flex-col gap-5 rounded-[var(--radius-panel)] bg-paper p-7 md:p-8">
            <div className="flex items-center justify-between">
              <span className={cn("rounded-full px-3.5 py-1.5 text-[13px] font-bold", TONES[i % TONES.length])}>{s.label}</span>
              <span className="text-5xl font-extrabold tracking-[-0.05em] text-line tabular-nums" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-2xl">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            {s.text && <p className="text-[15px] leading-relaxed text-ink-muted">{s.text}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
