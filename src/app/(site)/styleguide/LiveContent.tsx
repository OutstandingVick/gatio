import { ReportCard } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { TopicTag } from "@/components/ui/TopicTag";
import { sanityFetch } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import {
  allTopicsQuery,
  featuredReportQuery,
  latestArticlesQuery,
  latestReportsQuery,
} from "@/sanity/queries";
import { topicColor } from "@/lib/topics";

/** Test section: renders content fetched through the shared GROQ queries. */
export async function LiveContent() {
  if (!isSanityConfigured) {
    return (
      <Section tone="sand" labelledBy="sg-live">
        <h2 id="sg-live" className="mb-4 text-3xl md:text-4xl">
          Live content
        </h2>
        <p className="text-ink-muted">
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> to load content from Sanity.
        </p>
      </Section>
    );
  }

  const [featured, reports, articles, topics] = await Promise.all([
    sanityFetch({ query: featuredReportQuery, tags: ["report", "topic"] }),
    sanityFetch({ query: latestReportsQuery, params: { limit: 6 }, tags: ["report", "topic"] }),
    sanityFetch({ query: latestArticlesQuery, params: { limit: 6 }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
  ]);

  const empty = <p className="text-ink-muted">Nothing published yet. Create one in the Studio.</p>;

  return (
    <Section tone="sand" labelledBy="sg-live">
      <h2 id="sg-live" className="mb-10 border-b border-line pb-4 text-3xl md:text-4xl">
        Live content <span className="text-ink-muted">from Sanity</span>
      </h2>

      <h3 className="mb-4 text-2xl">Topics</h3>
      {topics?.length ? (
        <ul className="flex flex-wrap gap-3">
          {topics.map((t) => (
            <li key={t._id}>
              <TopicTag slug={t.slug} colorKey={t.colorKey} label={t.title} variant="solid" />
            </li>
          ))}
        </ul>
      ) : (
        empty
      )}

      <h3 className="mt-12 mb-4 text-2xl">Featured report</h3>
      {featured ? (
        <div className="grid gap-8 rounded-[var(--radius-panel)] bg-paper p-6 md:grid-cols-2 md:p-10">
          <ReportCard
            title={featured.title ?? "Untitled"}
            href={`/research/${featured.slug}`}
            coverStyle={featured.coverStyle}
            topic={featured.topic}
            publishedAt={featured.publishedAt}
            readTime={featured.readTime}
          />
          <div className="grid content-start gap-6 sm:grid-cols-2">
            {featured.keyFindings?.map((f) => (
              <StatBlock
                key={f._key}
                value={f.value ?? ""}
                label={f.label ?? ""}
                color={topicColor(featured.topic?.slug, featured.topic?.colorKey)}
              />
            ))}
          </div>
        </div>
      ) : (
        empty
      )}

      <h3 className="mt-12 mb-4 text-2xl">Latest reports</h3>
      {reports?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((r) => (
            <ReportCard
              key={r._id}
              title={r.title ?? "Untitled"}
              href={`/research/${r.slug}`}
              coverStyle={r.coverStyle}
              topic={r.topic}
              publishedAt={r.publishedAt}
              readTime={r.readTime}
              headingLevel="h4"
            />
          ))}
        </div>
      ) : (
        empty
      )}

      <h3 className="mt-12 mb-4 text-2xl">Latest articles</h3>
      {articles?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ReportCard
              key={a._id}
              title={a.title ?? "Untitled"}
              href={`/insights/${a.slug}`}
              coverStyle={a.coverStyle}
              topic={a.topic}
              publishedAt={a.publishedAt}
              readTime={a.readTime}
              headingLevel="h4"
            />
          ))}
        </div>
      ) : (
        empty
      )}
    </Section>
  );
}
