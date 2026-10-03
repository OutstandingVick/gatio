import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** How we work: numbered columns with a gold label and a serif step title. */
export function Process({ heading, steps }: { heading?: string | null; steps: { _key: string; label: string | null; title: string | null; text: string | null }[] }) {
  if (!steps.length) return null;
  return (
    <Section tone="paper" labelledBy="process-title">
      <SectionHeading id="process-title" eyebrow="How we work" title={heading || "From question to *answer*"} />
      <ol className="grid gap-12 md:grid-cols-3 md:gap-10">
        {steps.map((s, i) => (
          <li key={s._key} className="flex flex-col gap-4 border-t border-gold/50 pt-6">
            <p className="label text-gold">
              {String(i + 1).padStart(2, "0")} — {s.label}
            </p>
            <h3 className="text-3xl">
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </h3>
            {s.text && <p className="leading-relaxed text-fg-muted">{s.text}</p>}
          </li>
        ))}
      </ol>
    </Section>
  );
}
