import { cn } from "@/lib/cn";

/** Honest marker for demo content on detail pages. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <p className={cn("label inline-flex w-fit items-center gap-2 border border-fg/25 px-3 py-1.5 text-fg-muted", className)}>
      Sample content for demonstration
    </p>
  );
}
