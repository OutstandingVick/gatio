import Link from "next/link";
import { cn } from "@/lib/cn";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import type { AllTopicsQueryResult } from "@/sanity/types";

type TopicFilterProps = {
  topics: AllTopicsQueryResult;
  active: string | null;
  basePath: string;
};

const pill =
  "inline-flex min-h-11 items-center rounded-full border-[1.5px] px-5 text-sm font-medium whitespace-nowrap";

/** Topic pills as links, so the filter lives in the URL and works without JS. */
export function TopicFilter({ topics, active, basePath }: TopicFilterProps) {
  return (
    <nav aria-label="Filter by topic" className="-mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] py-1">
      <ul className="flex gap-2 sm:flex-wrap">
        <li>
          <Link
            href={basePath}
            scroll={false}
            aria-current={active === null ? "page" : undefined}
            className={cn(pill, active === null ? "border-ink bg-ink text-paper" : "border-line hover:border-ink")}
          >
            All
          </Link>
        </li>
        {topics.map((t) => {
          const isActive = active === t.slug;
          const color = COLOR_CLASSES[topicColor(t.slug, t.colorKey)];
          return (
            <li key={t._id}>
              <Link
                href={`${basePath}?topic=${encodeURIComponent(t.slug ?? "")}`}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  pill,
                  isActive ? cn(color.bg, color.fg, "border-transparent") : "border-line hover:border-ink",
                )}
              >
                {t.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
