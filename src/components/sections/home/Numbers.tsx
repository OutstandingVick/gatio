import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import type { ColorKey } from "@/lib/topics";

const COLORS: ColorKey[] = ["accent", "teal", "plum", "mustard"];

export function Numbers({
  heading,
  numbers,
}: {
  heading?: string | null;
  numbers: { _key: string; value: string | null; label: string | null }[];
}) {
  if (!numbers.length) return null;
  return (
    <Section tone="paper" rounded labelledBy="numbers-title">
      <SectionHeading id="numbers-title" eyebrow="By the numbers" eyebrowTone="mustard" align="center" title={heading || "The *numbers* so far"} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {numbers.map((n, i) => (
          <StatBlock key={n._key} value={n.value ?? ""} label={n.label ?? ""} color={COLORS[i % COLORS.length]} boxed className="min-h-[180px] justify-between" />
        ))}
      </div>
    </Section>
  );
}
