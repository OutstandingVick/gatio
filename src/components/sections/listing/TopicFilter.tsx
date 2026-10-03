import Link from "next/link";
import { cn } from "@/lib/cn";
import type { AllTopicsQueryResult } from "@/sanity/types";

type TopicFilterProps = {
  topics: AllTopicsQueryResult;
  active: string | null;
  basePath: string;
};

const item = "label inline-flex min-h-11 items-center border-b pb-1 whitespace-nowrap transition-colors";

/** Topic filter as tracked text links; state lives in the URL so it works without JS and can be shared. */
export function TopicFilter({ topics, active, basePath }: TopicFilterProps) {
  const entries = [{ key: "all", label: "All", href: basePath, isActive: active === null }].concat(
    topics.map((t) => ({ key: t._id, label: t.title ?? "", href: `${basePath}?topic=${encodeURIComponent(t.slug ?? "")}`, isActive: active === t.slug })),
  );
  return (
    <nav aria-label="Filter by topic" className="-mx-[var(--gutter)] overflow-x-auto border-b border-rule px-[var(--gutter)] [scrollbar-width:none]">
      <ul className="flex gap-8">
        {entries.map((e) => (
          <li key={e.key}>
            <Link
              href={e.href}
              scroll={false}
              aria-current={e.isActive ? "page" : undefined}
              className={cn(item, e.isActive ? "border-gold text-gold" : "border-transparent text-fg-muted hover:text-fg")}
            >
              {e.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
