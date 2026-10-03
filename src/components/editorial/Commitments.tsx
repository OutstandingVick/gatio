import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Hairline grid of commitments: gold numeral label, serif title, short line. */
export function Commitments({ heading, items }: { heading?: string | null; items: { _key: string; title: string | null; text: string | null }[] }) {
  if (!items.length) return null;
  return (
    <Section labelledBy="commitments-title">
      <SectionHeading id="commitments-title" eyebrow="Why clients trust us" align="center" title={heading || "Six things we *never* compromise on"} />
      <ul className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <li key={c._key} className="flex flex-col gap-3 border-r border-b border-rule p-8 md:p-10">
            <span className="label text-gold">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-2xl md:text-3xl">{c.title}</h3>
            {c.text && <p className="leading-relaxed text-fg-muted">{c.text}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}
