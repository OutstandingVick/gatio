import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { reportHref } from "@/lib/routes";
import { COLOR_CLASSES, COLOR_SOFT, topicColor } from "@/lib/topics";
import { cn } from "@/lib/cn";
import type { ReportCardData } from "@/sanity/types";
import { ReportFan } from "./ReportFan";

/** Floating white card, like PiggyVest's transaction chips over the hero image. */
function FloatingCard({ report, className }: { report: ReportCardData; className?: string }) {
  const key = topicColor(report.topic?.slug, report.topic?.colorKey);
  return (
    <Link
      href={reportHref(report.slug)}
      className={cn(
        "absolute z-20 hidden w-[260px] items-center gap-3 rounded-2xl bg-paper p-3 pr-4 shadow-[0_12px_32px_rgb(13_20_33/0.12)] hover:-translate-y-0.5 xl:flex",
        className,
      )}
    >
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", COLOR_SOFT[key])}>
        <span aria-hidden="true" className={cn("size-3 rounded-full", COLOR_CLASSES[key].bg)} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-bold">{report.title}</span>
        <span className="block text-xs text-ink-muted">
          {report.topic?.title} · {formatDate(report.publishedAt)}
        </span>
      </span>
      <span className="text-xs font-bold text-teal">New</span>
    </Link>
  );
}

/** Wide pastel panel under the hero: fanned report covers with floating preview cards. */
export function HeroShowcase({ reports }: { reports: ReportCardData[] }) {
  return (
    <Container className="mt-14 md:mt-16">
      <div className="relative">
        <div className="overflow-hidden rounded-[32px] bg-sky px-5 pt-8 md:rounded-[48px] xl:px-10 xl:pt-12">
          <ReportFan reports={reports} />
        </div>
        {reports[0] && <FloatingCard report={reports[0]} className="top-16 -left-8" />}
        {reports[1] && <FloatingCard report={reports[1]} className="top-40 -right-8" />}
      </div>
    </Container>
  );
}
