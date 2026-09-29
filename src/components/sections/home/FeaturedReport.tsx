import { Button } from "@/components/ui/Button";
import { CoverArt } from "@/components/ui/CoverArt";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { TopicTag } from "@/components/ui/TopicTag";
import { reportHref } from "@/lib/routes";
import type { ColorKey } from "@/lib/topics";
import type { FeaturedReportQueryResult } from "@/sanity/types";

const STAT_COLORS: ColorKey[] = ["accent", "teal", "plum"];

export function FeaturedReport({ report }: { report: NonNullable<FeaturedReportQueryResult> }) {
  const findings = (report.keyFindings ?? []).slice(0, 3);

  return (
    <Section labelledBy="featured-title" className="pt-8 md:pt-12">
      <div className="grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-paper lg:grid-cols-[5fr_7fr]">
        <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
          <CoverArt coverStyle={report.coverStyle} topicSlug={report.topic?.slug} colorKey={report.topic?.colorKey} />
        </div>
        <div className="flex flex-col gap-6 p-6 sm:p-10 lg:p-14">
          <div className="flex flex-wrap items-center gap-4">
            <Eyebrow>Featured report</Eyebrow>
            <TopicTag slug={report.topic?.slug} colorKey={report.topic?.colorKey} label={report.topic?.title} />
          </div>
          <h2 id="featured-title" className="text-4xl md:text-5xl">
            {report.title}
          </h2>
          {report.abstract && <p className="max-w-[60ch] text-lg text-ink-muted">{report.abstract}</p>}
          {findings.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-3">
              {findings.map((f, i) => (
                <StatBlock
                  key={f._key}
                  value={f.value ?? ""}
                  label={f.label ?? ""}
                  color={STAT_COLORS[i]}
                  className="[&>p:first-child]:text-5xl"
                />
              ))}
            </div>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-6 pt-2">
            <Button href={reportHref(report.slug)}>Read the report</Button>
            {report.pdfUrl && (
              <a
                href={`${report.pdfUrl}?dl=`}
                className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
