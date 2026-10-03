import { ArrowLink } from "@/components/ui/ArrowLink";
import { ReportCard } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { articleHref } from "@/lib/routes";
import type { ArticleCardData } from "@/sanity/types";

export function InsightsRow({ articles, heading }: { articles: ArticleCardData[]; heading?: string | null }) {
  if (!articles.length) return null;
  return (
    <Section labelledBy="insights-title">
      <SectionHeading
        id="insights-title"
        eyebrow="Insights from the field"
        title={heading || "What we're *thinking about*"}
        action={<ArrowLink href="/insights">Read all insights</ArrowLink>}
      />
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {articles.map((a) => (
          <ReportCard key={a._id} title={a.title ?? "Untitled"} href={articleHref(a.slug)} coverStyle={a.coverStyle} topic={a.topic} publishedAt={a.publishedAt} readTime={a.readTime} />
        ))}
      </div>
    </Section>
  );
}
