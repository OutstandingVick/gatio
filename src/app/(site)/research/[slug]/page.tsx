import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@/components/portable-text/RichText";
import { AuthorBox } from "@/components/sections/detail/AuthorBox";
import { DetailHeader } from "@/components/sections/detail/DetailHeader";
import { RelatedList } from "@/components/sections/detail/RelatedList";
import { TableOfContents } from "@/components/sections/detail/TableOfContents";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { StatBlock } from "@/components/ui/StatBlock";
import { buildMetadata } from "@/lib/metadata";
import { extractHeadings } from "@/lib/portableText";
import { reportHref } from "@/lib/routes";
import { topicColor, type ColorKey } from "@/lib/topics";
import { sanityFetch } from "@/sanity/client";
import {
  latestReportsQuery,
  relatedReportsQuery,
  reportBySlugQuery,
  reportSlugsQuery,
} from "@/sanity/queries";

const TAGS = ["report", "topic", "author"] as const;

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: reportSlugsQuery, tags: ["report"] });
  return (slugs ?? []).map((slug) => ({ slug }));
}

async function getReport(slug: string) {
  return sanityFetch({ query: reportBySlugQuery, params: { slug }, tags: [...TAGS] });
}

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) return { title: "Report not found" };
  return buildMetadata({ title: report.title, seo: report.seo, fallbackDescription: report.abstract }, reportHref(slug));
}

export default async function ReportPage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const report = await getReport(slug);
  if (!report) notFound();

  const color = topicColor(report.topic?.slug, report.topic?.colorKey);
  // Vary finding colours, starting with the topic's own colour.
  const findingColors: ColorKey[] = [color, ...(["accent", "teal", "plum", "mustard", "ink"] as ColorKey[]).filter((c) => c !== color)];
  const toc = extractHeadings(report.body);

  let related = report.topicId
    ? ((await sanityFetch({ query: relatedReportsQuery, params: { id: report._id, topicId: report.topicId }, tags: [...TAGS] })) ?? [])
    : [];
  if (related.length === 0) {
    const latest = (await sanityFetch({ query: latestReportsQuery, params: { limit: 4 }, tags: [...TAGS] })) ?? [];
    related = latest.filter((r) => r._id !== report._id).slice(0, 3);
  }

  return (
    <article>
      <DetailHeader
        title={report.title ?? "Untitled"}
        subtitle={report.subtitle}
        topic={report.topic}
        authors={report.authors ?? []}
        publishedAt={report.publishedAt}
        readTime={report.readTime}
        coverStyle={report.coverStyle}
        back={{ href: "/research", label: "Research" }}
        isSample={report.isSample}
      />

      <Container className="py-14 md:py-20">
        {report.abstract && (
          <section aria-labelledby="abstract-title" className="rounded-[var(--radius-panel)] border border-line bg-paper p-8 md:p-12">
            <h2 id="abstract-title" className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Abstract
            </h2>
            <p className="max-w-[62ch] font-display text-2xl leading-[1.45] tracking-[-0.01em] md:text-[26px]">{report.abstract}</p>
          </section>
        )}

        {report.keyFindings && report.keyFindings.length > 0 && (
          <section aria-labelledby="findings-title" className="mt-16">
            <h2 id="findings-title" className="mb-8 text-3xl md:text-4xl">
              Key <em>findings</em>
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {report.keyFindings.map((f, i) => (
                <StatBlock key={f._key} value={f.value ?? ""} label={f.label ?? ""} color={findingColors[i % findingColors.length]} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">{toc.length > 0 && <TableOfContents items={toc} />}</aside>

          <div className="min-w-0">
            <RichText value={report.body} color={color} />

            {report.methodology && report.methodology.length > 0 && (
              <details className="group mt-16 max-w-[680px] rounded-[var(--radius-card)] border border-line bg-paper">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-2xl tracking-[-0.02em] [&::-webkit-details-marker]:hidden">
                  Methodology
                  <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <RichText value={report.methodology} className="text-[16px] leading-[1.7] text-ink-muted" />
                </div>
              </details>
            )}

            {report.sources && report.sources.length > 0 && (
              <section aria-labelledby="sources-title" className="mt-14 max-w-[680px]">
                <h2 id="sources-title" className="mb-5 text-3xl">Sources</h2>
                <ol className="list-decimal space-y-3 pl-6 text-[15px] marker:text-ink-muted">
                  {report.sources.map((s) => (
                    <li key={s._key}>
                      {s.url ? (
                        <a href={s.url} rel="noopener noreferrer" target="_blank" className="underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent">
                          {s.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        s.title
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {report.pdfUrl && (
              <section aria-labelledby="download-title" className="mt-14 flex max-w-[680px] flex-col gap-5 rounded-[var(--radius-panel)] border border-line bg-paper p-8 sm:flex-row sm:items-center sm:justify-between">
                <h2 id="download-title" className="text-2xl">Take it with you</h2>
                <Button href={`${report.pdfUrl}?dl=`} variant="accent" prefetch={false}>
                  Download the full report (PDF)
                </Button>
              </section>
            )}

            <div className="mt-16">
              <AuthorBox authors={report.authors ?? []} />
            </div>
          </div>
        </div>
      </Container>

      <RelatedList
        title="Related research"
        items={related.map((r) => ({
          id: r._id,
          title: r.title ?? "Untitled",
          href: reportHref(r.slug),
          coverStyle: r.coverStyle,
          topic: r.topic,
          publishedAt: r.publishedAt,
          readTime: r.readTime,
        }))}
      />
    </article>
  );
}
