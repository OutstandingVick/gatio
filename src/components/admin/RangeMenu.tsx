import Link from "next/link";
import { CalendarDays, ChevronDown } from "lucide-react";

export const RANGES = [7, 30, 90] as const;
export type Range = (typeof RANGES)[number];

export function parseRange(v: string | string[] | undefined): Range {
  const n = Number(Array.isArray(v) ? v[0] : v);
  return (RANGES as readonly number[]).includes(n) ? (n as Range) : 30;
}

/** Disclosure menu of date ranges; each option is a link, so it works without JS. */
export function RangeMenu({ range, basePath = "/admin" }: { range: Range; basePath?: string }) {
  return (
    <details className="group relative">
      <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-lg border border-admin-line bg-admin-raised px-3 text-sm hover:bg-[#2c2c2c] [&::-webkit-details-marker]:hidden">
        <CalendarDays className="size-4 text-admin-muted" aria-hidden="true" />
        Last {range} days
        <ChevronDown className="size-4 text-admin-muted transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <ul className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-admin-line bg-admin-raised p-1 shadow-xl shadow-black/40">
        {RANGES.map((r) => (
          <li key={r}>
            <Link
              href={`${basePath}?range=${r}`}
              scroll={false}
              aria-current={r === range ? "true" : undefined}
              className="block rounded-md px-3 py-2 text-sm hover:bg-[#2f2f2f] aria-[current=true]:text-admin-blue"
            >
              Last {r} days
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
