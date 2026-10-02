import Link from "next/link";
import { cn } from "@/lib/cn";
import { researchTopicHref } from "@/lib/routes";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";
import type { AllTopicsQueryResult } from "@/sanity/types";

export function ResearchAreas({ topics, heading }: { topics: AllTopicsQueryResult; heading?: string | null }) {
  if (!topics.length) return null;

  return (
    <Section tone="ink" labelledBy="areas-title">
      <h2 id="areas-title" className="mb-12 text-4xl md:text-6xl [&_em]:text-mustard">
        <Emphasis text={heading || "Where we dig *deepest*"} />
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic, i) => {
          const key = topicColor(topic.slug, topic.colorKey);
          const color = COLOR_CLASSES[key];
          return (
            <li key={topic._id}>
              <Link
                href={researchTopicHref(topic.slug)}
                className={cn(
                  "flex aspect-[5/4] flex-col justify-between rounded-[var(--radius-card)] p-6 focus-visible:outline-mustard",
                  color.bg,
                  color.fg,
                  key === "ink" && "border border-cream/25",
                  "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="font-display text-lg tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex items-end justify-between gap-3">
                  <span className="font-display text-3xl leading-tight tracking-[-0.02em]">{topic.title}</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
