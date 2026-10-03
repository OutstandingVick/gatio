import Link from "next/link";
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
  /** Where the back link goes, e.g. { href: "/research", label: "Research" }. */
  back?: { href: string; label: string };
};

function initials(name: string) {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Back link, markers, serif title, byline row and a framed full-width cover. */
export function DetailHeader({ title, subtitle, topic, authors, publishedAt, readTime, coverStyle, isSample, back }: DetailHeaderProps) {
  const date = formatDate(publishedAt);
  const named = authors.filter((a): a is { name: string; role?: string | null } => Boolean(a.name));

  return (
    <header>
      <Container className="pt-28 pb-12 md:pt-36">
        {back && (
          <Link href={back.href} className="label inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-gold">
            <span aria-hidden="true">←</span>
            {back.label}
          </Link>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <TopicTag slug={topic?.slug} colorKey={topic?.colorKey} label={topic?.title} />
          {isSample && <SampleBadge />}
        </div>
        <h1 className="mt-6 max-w-[20ch] text-5xl md:text-[84px] md:leading-[1]">{title}</h1>
        {subtitle && <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-fg-muted">{subtitle}</p>}

        <div className="mt-10 flex flex-col gap-5 border-t border-rule pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {named.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3" aria-label="Authors">
              {named.map((a, i) => (
                <li key={`${a.name}-${i}`} className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full border border-gold/70 font-serif text-sm font-semibold text-gold">
                    {initials(a.name) || "?"}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-serif text-lg font-semibold">{a.name}</span>
                    {a.role && <span className="label block text-fg-faint">{a.role}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="label flex gap-3 text-fg-muted">
            {date && <time dateTime={publishedAt ?? undefined}>{date}</time>}
            {date && readTime ? <span aria-hidden="true">·</span> : null}
            {readTime ? <span>{readTime} min read</span> : null}
          </p>
        </div>
      </Container>
      <Container>
        <div className="aspect-[16/9] overflow-hidden border border-rule md:aspect-[21/8]">
          <CoverArt coverStyle={coverStyle} topicSlug={topic?.slug} colorKey={topic?.colorKey} />
        </div>
      </Container>
    </header>
  );
}
