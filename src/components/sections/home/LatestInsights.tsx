import { ArrowLink } from "@/components/ui/ArrowLink";
import { ReportCard } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleHref } from "@/lib/routes";
import type { ArticleCardData } from "@/sanity/types";

export function LatestInsights({ articles, heading }: { articles: ArticleCardData[]; heading?: string | null }) {
  return (
    <Section tone="sand" rounded labelledBy="insights-title">
      <SectionHeading
        id="insights-title"
        eyebrow="Insights from the field"
        eyebrowTone="lavender"
        title={heading || "What we're *thinking about*"}
        intro="[INSIGHTS INTRO: what the team writes about.]"
        action={<ArrowLink href="/insights">Read all insights</ArrowLink>}
      />
      {articles.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
