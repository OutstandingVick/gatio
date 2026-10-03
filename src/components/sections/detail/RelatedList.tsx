import { ReportCard, type ReportCardProps } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Item = Omit<ReportCardProps, "headingLevel" | "className"> & { id: string };

/** "Related" grid at the foot of detail pages. */
export function RelatedList({ title, items, eyebrow = "Keep reading" }: { title: string; items: Item[]; eyebrow?: string }) {
  if (!items.length) return null;
  return (
    <Section tone="paper" labelledBy="related-title">
      <SectionHeading id="related-title" eyebrow={eyebrow} eyebrowTone="lavender" title={title} />
      <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, ...card }) => (
          <li key={id} className="flex">
            <ReportCard {...card} className="w-full" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
