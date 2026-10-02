import Link from "next/link";
import { ReportCard } from "@/components/ui/ReportCard";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";
import { articleHref } from "@/lib/routes";
import type { ArticleCardData } from "@/sanity/types";

export function LatestInsights({ articles, heading }: { articles: ArticleCardData[]; heading?: string | null }) {
  return (
    <Section labelledBy="insights-title">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="insights-title" className="text-4xl md:text-6xl [&_em]:text-teal">
          <Emphasis text={heading || "What we're *thinking about*"} />
        </h2>
        <Link
          href="/insights"
          className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          All insights <span aria-hidden="true">→</span>
        </Link>
      </div>
      {articles.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ReportCard
              key={a._id}
              title={a.title ?? "Untitled"}
              href={articleHref(a.slug)}
              coverStyle={a.coverStyle}
              topic={a.topic}
              publishedAt={a.publishedAt}
              readTime={a.readTime}
            />
          ))}
        </div>
      ) : (
        <p className="text-ink-muted">No insights published yet.</p>
      )}
    </Section>
  );
}
