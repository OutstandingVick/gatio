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
    <article className={cn("group relative flex flex-col gap-5", className)}>
      <div className="aspect-[4/3] overflow-hidden border border-rule">
        <CoverArt
          coverStyle={coverStyle}
          topicSlug={topic?.slug}
          colorKey={topic?.colorKey}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <TopicTag slug={topic?.slug} colorKey={topic?.colorKey} label={topic?.title} />
        <Heading className="text-2xl leading-snug md:text-[28px]">
          <Link
            href={href}
            className="transition-colors after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-gold group-hover:text-gold"
          >
            {title}
          </Link>
        </Heading>
        <p className="label mt-auto flex gap-2 pt-1 text-fg-faint">
          {date && <time dateTime={publishedAt ?? undefined}>{date}</time>}
          {date && readTime ? <span aria-hidden="true">·</span> : null}
          {readTime ? <span>{readTime} min read</span> : null}
        </p>
      </div>
    </article>
  );
}
