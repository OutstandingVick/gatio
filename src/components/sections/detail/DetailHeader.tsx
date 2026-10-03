import { ChevronLeft } from "lucide-react";
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

const AVATAR = ["bg-sky text-accent", "bg-mint text-teal", "bg-blush text-plum", "bg-butter text-mustard-text"];

/** Back link, pills, title, byline and a wide rounded cover banner. */
export function DetailHeader({ title, subtitle, topic, authors, publishedAt, readTime, coverStyle, isSample, back }: DetailHeaderProps) {
  const date = formatDate(publishedAt);
  const named = authors.filter((a): a is { name: string; role?: string | null } => Boolean(a.name));

  return (
    <header>
      <Container className="pt-10 pb-10 md:pt-14">
        {back && (
          <Link href={back.href} className="inline-flex items-center gap-1 text-sm font-semibold text-ink-muted hover:text-ink">
            <ChevronLeft className="size-4" aria-hidden="true" />
            {back.label}
          </Link>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <TopicTag slug={topic?.slug} colorKey={topic?.colorKey} label={topic?.title} />
          {isSample && <SampleBadge />}
        </div>
        <h1 className="mt-6 max-w-[18ch] text-[44px] md:text-[72px] md:leading-[1]">{title}</h1>
        {subtitle && <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-ink-muted">{subtitle}</p>}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          {named.length > 0 && (
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3" aria-label="Authors">
              {named.map((a, i) => (
                <li key={`${a.name}-${i}`} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className={`flex size-10 items-center justify-center rounded-full text-sm font-extrabold ${AVATAR[i % AVATAR.length]}`}>
                    {initials(a.name) || "?"}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold">{a.name}</span>
                    {a.role && <span className="block text-xs text-ink-muted">{a.role}</span>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="flex gap-2 text-sm font-medium text-ink-muted">
            {date && <time dateTime={publishedAt ?? undefined}>{date}</time>}
            {date && readTime ? <span aria-hidden="true">·</span> : null}
            {readTime ? <span>{readTime} min read</span> : null}
          </p>
        </div>
      </Container>
      <div className="mx-2 aspect-[16/9] overflow-hidden rounded-[32px] md:mx-3 md:aspect-[21/8] md:rounded-[48px]">
        <CoverArt coverStyle={coverStyle} topicSlug={topic?.slug} colorKey={topic?.colorKey} />
      </div>
    </header>
  );
}
