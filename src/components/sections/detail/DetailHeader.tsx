import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { TopicTag } from "@/components/ui/TopicTag";
import { formatDate } from "@/lib/format";

type DetailHeaderProps = {
  title: string;
  subtitle?: string | null;
  topic: { title: string | null; slug: string | null; colorKey: string | null } | null;
  authors: { name: string | null; role?: string | null }[];
  publishedAt: string | null;
  readTime: number | null;
  coverStyle: string | null;
  isSample: boolean | null;
};

/** Topic, title, byline and a wide CoverArt banner. */
export function DetailHeader({
  title,
  subtitle,
  topic,
  authors,
  publishedAt,
  readTime,
  coverStyle,
  isSample,
}: DetailHeaderProps) {
  const date = formatDate(publishedAt);
  const named = authors.filter((a) => a.name);

  return (
    <header>
      <Container className="pt-12 pb-10 md:pt-20">
        <div className="flex flex-wrap items-center gap-4">
          <TopicTag slug={topic?.slug} colorKey={topic?.colorKey} label={topic?.title} />
          {isSample && <SampleBadge />}
        </div>
        <h1 className="mt-6 max-w-[20ch] text-5xl md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-[48ch] font-display text-2xl text-ink-muted md:text-[28px]">{subtitle}</p>}
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-[15px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
          {named.length > 0 && (
            <p>
              <span className="sr-only">By </span>
              {named.map((a, i) => (
                <span key={`${a.name}-${i}`}>
                  {i > 0 && ", "}
                  <span className="font-medium">{a.name}</span>
                  {a.role && <span className="text-ink-muted"> ({a.role})</span>}
                </span>
              ))}
            </p>
          )}
          <p className="flex gap-3 text-ink-muted">
            {date && <time dateTime={publishedAt ?? undefined}>{date}</time>}
            {date && readTime ? <span aria-hidden="true">·</span> : null}
            {readTime ? <span>{readTime} min read</span> : null}
          </p>
        </div>
      </Container>
      <Container>
        <div className="aspect-[16/9] overflow-hidden rounded-[var(--radius-panel)] md:aspect-[21/9]">
          <CoverArt coverStyle={coverStyle} topicSlug={topic?.slug} colorKey={topic?.colorKey} />
        </div>
      </Container>
    </header>
  );
}
