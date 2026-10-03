import { Check } from "lucide-react";
import { Blossom } from "@/components/ui/Blossom";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const BADGES = ["var(--lime)", "var(--sky)", "var(--blush)", "var(--butter)", "var(--mint)", "var(--lavender)"];

export function Commitments({
  heading,
  items,
}: {
  heading?: string | null;
  items: { _key: string; title: string | null; text: string | null }[];
}) {
  if (!items.length) return null;
  return (
    <Section labelledBy="commitments-title">
      <SectionHeading
        id="commitments-title"
        eyebrow="Why clients trust us"
        eyebrowTone="teal"
        title={heading || "Six things we *never* compromise on"}
      />
      <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c, i) => (
          <li key={c._key} className="flex gap-5">
            <span className="relative flex size-16 shrink-0 items-center justify-center">
              <Blossom color={BADGES[i % BADGES.length]} className="absolute inset-0 size-16" />
              <Check className="relative size-6" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div className="pt-1">
              <h3 className="text-xl">{c.title}</h3>
              {c.text && <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{c.text}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
