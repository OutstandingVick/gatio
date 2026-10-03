import Link from "next/link";
import type { CSSProperties } from "react";
import { CoverArt } from "@/components/ui/CoverArt";
import { TopicTag } from "@/components/ui/TopicTag";
import { reportHref } from "@/lib/routes";
import type { ReportCardData } from "@/sanity/types";

const MAX_ANGLE = 24;

/** Spread n cards evenly between -24° and 24°, outer cards set lower. */
function fanPosition(index: number, count: number) {
  const angle = count === 1 ? 0 : -MAX_ANGLE + (index * MAX_ANGLE * 2) / (count - 1);
  return { angle, drop: Math.abs(angle) * 2.4 };
}

/** Report covers fanned like a hand of cards; a scrollable row on mobile. */
export function ReportFan({ reports }: { reports: ReportCardData[] }) {
  if (!reports.length) return null;

  return (
    <ul
      aria-label="Latest reports"
      className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pt-4 pb-8 xl:mx-0 xl:justify-center xl:gap-0 xl:overflow-visible xl:px-0 xl:pt-8 xl:pb-32"
    >
      {reports.map((report, i) => {
        const { angle, drop } = fanPosition(i, reports.length);
        const style = {
          "--fan-r": `${angle}deg`,
          "--fan-y": `${drop}px`,
          "--row-r": `${i % 2 ? 2 : -2}deg`,
        } as CSSProperties;

        return (
          <li
            key={report._id}
            style={style}
            className="w-[210px] shrink-0 snap-center origin-bottom [transform:rotate(var(--row-r))] xl:-mx-[42px] xl:w-[196px] xl:[transform:translateY(var(--fan-y))_rotate(var(--fan-r))] xl:hover:z-10"
          >
            <Link
              href={reportHref(report.slug)}
              className="flex h-full flex-col gap-3 rounded-[22px] bg-paper p-3 shadow-[0_8px_24px_rgb(13_20_33/0.08)] hover:shadow-[0_12px_32px_rgb(13_20_33/0.14)]"
            >
              <span className="px-1 pt-1">
                <TopicTag slug={report.topic?.slug} colorKey={report.topic?.colorKey} label={report.topic?.title} />
              </span>
              <span className="block aspect-[4/3] overflow-hidden rounded-2xl">
                <CoverArt coverStyle={report.coverStyle} topicSlug={report.topic?.slug} colorKey={report.topic?.colorKey} />
              </span>
              <span className="line-clamp-3 px-1 pb-1 text-[15px] leading-snug font-bold tracking-[-0.02em]">
                {report.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
