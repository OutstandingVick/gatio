import Link from "next/link";
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
      <div className="rounded-[var(--radius-panel)] border border-dashed border-line bg-paper px-6 py-16 text-center">
        <p className="font-display text-3xl tracking-[-0.02em]">
          {emptyTopic ? `No ${noun} on ${emptyTopic} yet.` : `No ${noun} published yet.`}
        </p>
        {emptyTopic && (
          <Link href={basePath} className="mt-4 inline-block font-medium underline decoration-accent decoration-2 underline-offset-4">
            See all {noun}
          </Link>
        )}
      </div>
    );
  }

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, ...card }) => (
        <li key={id} className="flex">
          <ReportCard {...card} headingLevel="h2" className="w-full" />
        </li>
      ))}
    </ul>
  );
}
