import { ArrowLink } from "@/components/ui/ArrowLink";
import { Blossom } from "@/components/ui/Blossom";
import { ReportCard, type ReportCardProps } from "@/components/ui/ReportCard";

type Item = Omit<ReportCardProps, "headingLevel" | "className"> & { id: string };

/** Card grid for listing pages: 3 columns desktop, 2 tablet, 1 mobile. */
export function ListingGrid({
  items,
  emptyTopic,
  basePath,
  noun,
}: {
  items: Item[];
  emptyTopic: string | null;
  basePath: string;
  noun: string;
}) {
  if (!items.length) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-panel)] bg-paper px-6 py-20 text-center">
        <Blossom color="var(--lavender)" className="size-16" />
        <p className="mt-6 text-2xl font-extrabold tracking-[-0.03em]">
          {emptyTopic ? `No ${noun} on ${emptyTopic} yet.` : `No ${noun} published yet.`}
        </p>
        <p className="mt-2 text-ink-muted">New work is published regularly. Check back soon.</p>
        {emptyTopic && (
          <ArrowLink href={basePath} className="mt-6">
            See all {noun}
          </ArrowLink>
        )}
      </div>
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, ...card }) => (
        <li key={id} className="flex">
          <ReportCard {...card} headingLevel="h2" className="w-full" />
        </li>
      ))}
    </ul>
  );
}
