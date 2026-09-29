import { cn } from "@/lib/cn";

/** Honest marker for demo content on detail pages. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center rounded-full border border-line px-3 py-1 text-xs text-ink-muted",
        className,
      )}
    >
      Sample content for demonstration
    </p>
  );
}
