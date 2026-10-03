import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CoverArt } from "@/components/ui/CoverArt";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TopicTag } from "@/components/ui/TopicTag";
import { formatDate } from "@/lib/format";
import { reportHref } from "@/lib/routes";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import type { FeaturedWorkQueryResult } from "@/sanity/types";

/** Case-study style rows for the latest research. */
export function FeaturedWork({ reports }: { reports: FeaturedWorkQueryResult }) {
  if (!reports.length) return null;

  return (
    <Section labelledBy="work-title">
      <SectionHeading
        id="work-title"
        eyebrow="Recent research"
        eyebrowTone="plum"
        title="Research we've published and *stand behind.*"
        intro="[RESEARCH INTRO: one line on how reports are produced.]"
        action={<ArrowLink href="/research">View all research</ArrowLink>}
      />
      <ol className="flex flex-col gap-5">
        {reports.map((r, i) => {
          const color = COLOR_CLASSES[topicColor(r.topic?.slug, r.topic?.colorKey)];
          const meta: [string, string | null | undefined][] = [
            ["Topic", r.topic?.title],
            ["Published", formatDate(r.publishedAt)],
            ["Read time", r.readTime ? `${r.readTime} min` : null],
            ["Authors", (r.authors ?? []).filter(Boolean).join(", ")],
          ];
          return (
            <li key={r._id}>
              <article className="group relative grid gap-6 rounded-[var(--radius-panel)] bg-paper p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 md:p-5">
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-auto md:min-h-[320px]">
                  <CoverArt coverStyle={r.coverStyle} topicSlug={r.topic?.slug} colorKey={r.topic?.colorKey} />
                </div>
                <div className="flex flex-col gap-5 px-2 pb-3 md:py-4 md:pr-6">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-ink-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <TopicTag slug={r.topic?.slug} colorKey={r.topic?.colorKey} label={r.topic?.title} />
                  </div>
                  <h3 className="text-2xl md:text-[32px]">
                    <Link href={reportHref(r.slug)} className="after:absolute after:inset-0 after:rounded-[var(--radius-panel)] group-hover:text-accent">
                      {r.title}
                    </Link>
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-y border-line py-4 sm:grid-cols-4">
                    {meta.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-semibold text-ink-muted">{k}</dt>
                        <dd className="mt-0.5 truncate text-sm font-semibold">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                  {r.abstract && <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-muted">{r.abstract}</p>}
                  {r.findings && r.findings.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {r.findings.map((f) => (
                        <li key={f._key} className="flex items-baseline gap-2 rounded-xl bg-sand px-3 py-2">
                          <span className={`text-lg font-extrabold tracking-[-0.03em] ${color.text}`}>{f.value}</span>
                          <span className="text-xs font-medium text-ink-muted">{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-auto inline-flex items-center gap-1 text-[15px] font-semibold group-hover:text-accent" aria-hidden="true">
                    Read the report ›
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
