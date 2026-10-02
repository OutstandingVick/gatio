import Link from "next/link";
import { ArrowUpRight, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { percentChange } from "@/lib/admin";

type StatCardProps = {
  label: string;
  icon: LucideIcon;
  total: number;
  recent: number;
  previous: number;
  href: string;
  /** Plain-language explanation, shown as a tooltip and to screen readers. */
  hint: string;
};

const nf = new Intl.NumberFormat("en-GB");

export function StatCard({ label, icon: Icon, total, recent, previous, href, hint }: StatCardProps) {
  const change = percentChange(recent, previous);
  const up = change === null || change >= 0;

  return (
    <section className="rounded-2xl border border-admin-line bg-admin-panel p-1.5">
      <div className="flex h-11 items-center justify-between px-2.5">
        <h2 className="flex items-center gap-2 text-[15px]">
          <Icon className="size-4" aria-hidden="true" />
          {label}
        </h2>
        <Link href={href} className="flex size-7 items-center justify-center rounded-md text-admin-muted hover:bg-admin-raised hover:text-admin-text" aria-label={`Open ${label}`}>
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
      <div className="rounded-xl border border-admin-line bg-admin-inset p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[28px] leading-none font-medium tabular-nums">{nf.format(total)}</p>
          <span title={hint} className="text-admin-faint">
            <Info className="size-4" aria-hidden="true" />
            <span className="sr-only">{hint}</span>
          </span>
        </div>
        <div className="mt-6 flex items-center justify-between gap-2 text-xs">
          <span className={cn("font-medium tabular-nums", up ? "text-admin-green" : "text-admin-red")}>
            {change === null ? `+${recent} new` : `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`}
          </span>
          <span className="text-admin-muted">{recent} added · last 30 days</span>
        </div>
      </div>
    </section>
  );
}
