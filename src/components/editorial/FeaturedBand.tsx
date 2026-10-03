import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { reportHref } from "@/lib/routes";
import type { FeaturedReportQueryResult } from "@/sanity/types";

/** "In season now" style band: the featured report with two stacked actions. */
export function FeaturedBand({ report }: { report: NonNullable<FeaturedReportQueryResult> }) {
  const meta = [report.topic?.title, formatDate(report.publishedAt), report.readTime ? `${report.readTime} min read` : null].filter(Boolean);
  return (
    <section aria-labelledby="featured-title" className="border-t border-rule bg-surface">
      <Container className="grid gap-10 py-16 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-16 md:py-20">
        <div>
          <p className="label text-gold">Featured research</p>
          <h2 id="featured-title" className="mt-4 max-w-[22ch] text-4xl md:text-5xl">
            {report.title}
          </h2>
          {report.abstract && <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-fg-muted">{report.abstract}</p>}
          {meta.length > 0 && <p className="label mt-5 text-fg-faint">{meta.join(" · ")}</p>}
        </div>
        <div className="flex flex-col items-start gap-3 md:items-stretch">
          <Button href={reportHref(report.slug)} size="lg">
            Read the report
          </Button>
          <Button href="/research" variant="outline" size="lg">
            All research
          </Button>
        </div>
      </Container>
    </section>
  );
}
