import { ArrowLink } from "@/components/ui/ArrowLink";
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
      <div className="flex flex-col items-center border-y border-rule py-24 text-center">
        <p className="label text-gold">Nothing here yet</p>
        <p className="mt-5 max-w-[22ch] font-serif text-4xl font-semibold">
          {emptyTopic ? `No ${noun} on ${emptyTopic} yet.` : `No ${noun} published yet.`}
        </p>
        {emptyTopic && (
          <ArrowLink href={basePath} className="mt-8">
            See all {noun}
          </ArrowLink>
        )}
      </div>
    );
  }

  return (
    <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ id, ...card }) => (
        <li key={id} className="flex">
          <ReportCard {...card} headingLevel="h2" className="w-full" />
        </li>
      ))}
    </ul>
  );
}
