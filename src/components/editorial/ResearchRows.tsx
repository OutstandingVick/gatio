import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CoverArt } from "@/components/ui/CoverArt";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TopicTag } from "@/components/ui/TopicTag";
import { formatDate } from "@/lib/format";
import { reportHref } from "@/lib/routes";
import type { FeaturedWorkQueryResult } from "@/sanity/types";

/** Case-study rows for recent research: numeral, line-art cover, title, details, findings. */
export function ResearchRows({ reports }: { reports: FeaturedWorkQueryResult }) {
  if (!reports.length) return null;
  return (
    <Section labelledBy="research-title">
      <SectionHeading
        id="research-title"
        eyebrow="Recent research"
        title="Studies we've published and *stand behind.*"
        action={<ArrowLink href="/research">View all research</ArrowLink>}
      />
      <ol className="border-t border-rule">
        {reports.map((r, i) => {
          const meta: [string, string | null | undefined][] = [
            ["Topic", r.topic?.title],
            ["Published", formatDate(r.publishedAt)],
            ["Read time", r.readTime ? `${r.readTime} min` : null],
            ["Authors", (r.authors ?? []).filter(Boolean).join(", ")],
          ];
          return (
            <li key={r._id} className="border-b border-rule">
              <article className="group relative grid gap-6 py-10 md:grid-cols-[80px_minmax(0,4fr)_minmax(0,7fr)] md:gap-10 md:py-14">
                <p className="outline-numeral text-6xl leading-none md:text-7xl" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="aspect-[4/3] overflow-hidden border border-rule">
                  <CoverArt coverStyle={r.coverStyle} topicSlug={r.topic?.slug} colorKey={r.topic?.colorKey} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="flex flex-col gap-5">
                  <TopicTag slug={r.topic?.slug} colorKey={r.topic?.colorKey} label={r.topic?.title} />
                  <h3 className="text-3xl md:text-4xl">
                    <Link href={reportHref(r.slug)} className="after:absolute after:inset-0 group-hover:text-gold">
                      {r.title}
                    </Link>
                  </h3>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 xl:grid-cols-4">
                    {meta.map(([k, v]) => (
                      <div key={k}>
                        <dt className="label text-fg-faint">{k}</dt>
                        <dd className="mt-1 text-[15px] text-fg">{v || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                  {r.abstract && <p className="line-clamp-3 max-w-[64ch] leading-relaxed text-fg-muted">{r.abstract}</p>}
                  {r.findings && r.findings.length > 0 && (
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
                      {r.findings.map((f) => (
                        <li key={f._key} className="flex items-baseline gap-3">
                          <span className="font-serif text-3xl font-semibold text-gold">{f.value}</span>
                          <span className="max-w-[24ch] text-sm text-fg-muted">{f.label}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
