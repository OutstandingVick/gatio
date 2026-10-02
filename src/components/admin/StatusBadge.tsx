import { cn } from "@/lib/cn";

const STYLES = {
  Featured: "border-admin-amber/40 bg-admin-amber/10 text-admin-amber",
  Sample: "border-admin-blue/40 bg-admin-blue/10 text-admin-sky",
  Published: "border-admin-green/40 bg-admin-green/10 text-admin-green",
  Page: "border-admin-lilac/40 bg-admin-lilac/10 text-admin-lilac",
} as const;

export type Status = keyof typeof STYLES;

export function statusOf(row: { _type: string; featured?: boolean | null; isSample?: boolean | null }): Status {
  if (row.featured) return "Featured";
  if (row.isSample) return "Sample";
  return "Published";
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-md border px-2 text-[13px] font-medium", STYLES[status])}>{status}</span>
  );
}
