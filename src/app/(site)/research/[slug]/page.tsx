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
          <section aria-labelledby="abstract-title" className="rounded-[var(--radius-panel)] bg-paper p-8 md:p-12">
            <h2 id="abstract-title" className="w-fit rounded-full bg-sky px-3.5 py-1.5 text-[13px] font-bold tracking-normal text-accent">
              Abstract
            </h2>
            <p className="mt-5 max-w-[62ch] text-xl leading-[1.6] font-semibold tracking-[-0.015em] md:text-2xl">{report.abstract}</p>
          </section>
        )}

        {report.keyFindings && report.keyFindings.length > 0 && (
          <section aria-labelledby="findings-title" className="mt-16">
            <h2 id="findings-title" className="mb-8 text-3xl md:text-[44px]">
              Key <em>findings</em>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {report.keyFindings.map((f, i) => (
                <StatBlock key={f._key} value={f.value ?? ""} label={f.label ?? ""} color={findingColors[i % findingColors.length]} boxed className="min-h-[170px] justify-between" />
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">{toc.length > 0 && <TableOfContents items={toc} />}</aside>

          <div className="min-w-0">
            <RichText value={report.body} color={color} />

            {report.methodology && report.methodology.length > 0 && (
              <details className="group mt-16 max-w-[680px] rounded-[var(--radius-card)] bg-paper">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-xl font-extrabold tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
                  Methodology
                  <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-sky text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-6">
                  <RichText value={report.methodology} className="text-[16px] leading-[1.7] text-ink-muted" />
                </div>
              </details>
            )}

            {report.sources && report.sources.length > 0 && (
              <section aria-labelledby="sources-title" className="mt-14 max-w-[680px]">
                <h2 id="sources-title" className="mb-5 text-2xl md:text-3xl">Sources</h2>
                <ol className="flex flex-col gap-2 text-[15px]">
                  {report.sources.map((src, i) => (
                    <li key={src._key} className="flex items-start gap-3 rounded-2xl bg-paper px-4 py-3">
                      <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-bold">
                        {i + 1}
                      </span>
                      {src.url ? (
                        <a href={src.url} rel="noopener noreferrer" target="_blank" className="font-semibold hover:text-accent hover:underline">
                          {src.title}
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="font-semibold">{src.title}</span>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {report.pdfUrl && (
              <section aria-labelledby="download-title" className="mt-14 flex max-w-[680px] flex-col gap-5 rounded-[var(--radius-panel)] bg-accent p-8 text-white sm:flex-row sm:items-center sm:justify-between">
                <h2 id="download-title" className="text-2xl">Take it with you</h2>
                <Button href={`${report.pdfUrl}?dl=`} variant="light" prefetch={false}>
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
        title="Related *research*"
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
