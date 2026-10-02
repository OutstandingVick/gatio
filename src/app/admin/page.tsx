import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Clock, FileText, Filter, Globe, Images, Briefcase, Newspaper } from "lucide-react";
import { ActivityChart, ActivityLegend, type DayCount } from "@/components/admin/ActivityChart";
import { ContentTable } from "@/components/admin/ContentTable";
import { CreateMenu } from "@/components/admin/CreateMenu";
import { Panel } from "@/components/admin/Panel";
import { RangeMenu, parseRange } from "@/components/admin/RangeMenu";
import { StatCard } from "@/components/admin/StatCard";
import { TopicFunnel } from "@/components/admin/TopicFunnel";
import { percentChange } from "@/lib/admin";
import { cn } from "@/lib/cn";
import { adminFetch } from "@/sanity/adminClient";
import { adminActivityQuery, adminRecentQuery, adminStatsQuery, adminTopicBreakdownQuery } from "@/sanity/adminQueries";

export const metadata: Metadata = { title: "Overview" };

const DAY = 86_400_000;

function bucket(rows: { _updatedAt: string }[], days: number, end: number): DayCount[] {
  const start = end - days * DAY;
  const counts = new Array<number>(days).fill(0);
  for (const r of rows) {
    const t = Date.parse(r._updatedAt);
    if (t <= start || t > end) continue;
    counts[Math.min(days - 1, Math.floor((t - start) / DAY))]++;
  }
  return counts.map((count, i) => ({ date: new Date(start + (i + 1) * DAY).toISOString().slice(0, 10), count }));
}

async function getOverview(range: number) {
  const now = Date.now();
  const since = new Date(now - 30 * DAY).toISOString();
  const prevSince = new Date(now - 60 * DAY).toISOString();

  const [stats, activity, topics, recent] = await Promise.all([
    adminFetch(adminStatsQuery, { since, prevSince }),
    adminFetch(adminActivityQuery, { since: new Date(now - range * 2 * DAY).toISOString() }),
    adminFetch(adminTopicBreakdownQuery),
    adminFetch(adminRecentQuery, { limit: 8 }),
  ]);

  const days = bucket(activity ?? [], range, now);
  const total = days.reduce((n, d) => n + d.count, 0);
  const previousTotal = bucket(activity ?? [], range, now - range * DAY).reduce((n, d) => n + d.count, 0);
  return { stats, topics, recent, days, total, change: percentChange(total, previousTotal) };
}

export default async function AdminOverview({ searchParams }: PageProps<"/admin">) {
  const range = parseRange((await searchParams).range);
  const { stats, topics, recent, days, total, change } = await getOverview(range);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <RangeMenu range={range} />
        <Link
          href="/"
          target="_blank"
          className="flex h-9 items-center gap-2 rounded-lg border border-admin-line bg-admin-raised px-3 text-sm hover:bg-[#2c2c2c]"
        >
          <Globe className="size-4 text-admin-muted" aria-hidden="true" />
          View website<span className="sr-only"> (opens in a new tab)</span>
        </Link>
        <div className="ml-auto">
          <CreateMenu />
        </div>
      </div>

      <h1 className="sr-only">Overview</h1>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Reports" icon={FileText} href="/admin/reports" hint="Published research reports" {...(stats?.reports ?? { total: 0, recent: 0, previous: 0 })} />
        <StatCard label="Articles" icon={Newspaper} href="/admin/articles" hint="Published insight articles" {...(stats?.articles ?? { total: 0, recent: 0, previous: 0 })} />
        <StatCard label="Services" icon={Briefcase} href="/admin/services" hint="Services listed on the website" {...(stats?.services ?? { total: 0, recent: 0, previous: 0 })} />
        <StatCard label="Images" icon={Images} href="/admin/media" hint="Images in the media library" {...(stats?.images ?? { total: 0, recent: 0, previous: 0 })} />
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel title="Publishing activity" icon={BarChart3} action={<ActivityLegend />} insetClassName="p-4 sm:p-5">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[26px] leading-none font-semibold tabular-nums">
                {total} <span className="text-base font-normal text-admin-muted">edits</span>
              </p>
              <p className={cn("mt-2 text-sm font-medium tabular-nums", change === null || change >= 0 ? "text-admin-green" : "text-admin-red")}>
                {change === null ? "New this period" : `${change >= 0 ? "+" : ""}${change.toFixed(1)}% vs previous ${range} days`}
              </p>
            </div>
            <RangeMenu range={range} />
          </div>
          <ActivityChart days={days} />
        </Panel>

        <Panel title="Content by topic" icon={Filter} insetClassName="flex flex-col pt-4">
          <TopicFunnel
            items={(topics ?? []).map((t) => ({ id: t._id, title: t.title ?? "Untitled", count: t.reports + t.articles }))}
          />
        </Panel>
      </div>

      <Panel
        title="Recently edited"
        icon={Clock}
        action={
          <Link href="/admin/search" className="flex h-9 items-center rounded-lg border border-admin-line bg-admin-raised px-3 text-sm hover:bg-[#2c2c2c]">
            Search all
          </Link>
        }
      >
        <ContentTable rows={recent ?? []} caption="Recently edited content" />
      </Panel>
    </div>
  );
}
