import { ReportCard, type ReportCardProps } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";

type Item = Omit<ReportCardProps, "headingLevel" | "className"> & { id: string };

/** "Related" grid at the foot of detail pages. */
export function RelatedList({ title, items }: { title: string; items: Item[] }) {
  if (!items.length) return null;
  return (
    <Section tone="sand" labelledBy="related-title">
      <h2 id="related-title" className="mb-10 text-4xl md:text-5xl">
        {title}
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ id, ...card }) => (
          <li key={id} className="flex">
            <ReportCard {...card} className="w-full" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
