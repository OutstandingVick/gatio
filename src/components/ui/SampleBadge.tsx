import { Info } from "lucide-react";
import { cn } from "@/lib/cn";

/** Honest marker for demo content on detail pages. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full bg-butter px-3 py-1 text-[13px] font-semibold text-mustard-text",
        className,
      )}
    >
      <Info className="size-3.5" aria-hidden="true" />
      Sample content for demonstration
    </p>
  );
}
