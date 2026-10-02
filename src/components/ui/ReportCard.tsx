import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/format";
import { CoverArt } from "./CoverArt";
import { TopicTag } from "./TopicTag";

export type ReportCardProps = {
  title: string;
  href: string;
  coverStyle?: string | null;
  topic?: { title?: string | null; slug?: string | null; colorKey?: string | null } | null;
  publishedAt?: string | null;
  /** Read time in minutes. */
  readTime?: number | null;
  /** Heading level for the title, to keep document outline correct. */
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

export function ReportCard({
  title,
  href,
  coverStyle,
  topic,
  publishedAt,
  readTime,
  headingLevel: Heading = "h3",
  className,
}: ReportCardProps) {
  const date = formatDate(publishedAt);

  return (
    <article
      className={cn(
        "group relative flex flex-col gap-5 rounded-[var(--radius-card)] bg-paper p-3 pb-6",
        "transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgb(13_20_33/0.08)] focus-within:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl">
        <CoverArt coverStyle={coverStyle} topicSlug={topic?.slug} colorKey={topic?.colorKey} />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-3">
        <TopicTag slug={topic?.slug} colorKey={topic?.colorKey} label={topic?.title} />
        <Heading className="text-xl leading-snug font-bold tracking-[-0.02em]">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent group-hover:text-accent"
          >
            {title}
          </Link>
        </Heading>
        <p className="mt-auto flex gap-2 pt-1 text-sm text-ink-muted">
          {date && <time dateTime={publishedAt ?? undefined}>{date}</time>}
          {date && readTime ? <span aria-hidden="true">·</span> : null}
          {readTime ? <span>{readTime} min read</span> : null}
        </p>
      </div>
    </article>
  );
}
