import { cn } from "@/lib/cn";
import { COLOR_CLASSES, COLOR_SOFT, type ColorKey } from "@/lib/topics";

type StatBlockProps = {
  value: string;
  label: string;
  color?: ColorKey;
  size?: "md" | "lg";
  /** Put the figure on its pastel tile instead of a plain rule. */
  boxed?: boolean;
  className?: string;
};

/** Large extra-bold figure with a short caption. */
export function StatBlock({ value, label, color = "ink", size = "lg", boxed = false, className }: StatBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        boxed ? cn("rounded-[var(--radius-card)] p-6", COLOR_SOFT[color]) : "border-t-2 border-line pt-4",
        className,
      )}
    >
      <p
        className={cn(
          "font-display leading-none font-extrabold tracking-[-0.04em] tabular-nums",
          size === "lg" ? "text-5xl md:text-6xl" : "text-4xl",
          COLOR_CLASSES[color].text,
        )}
      >
        {value}
      </p>
      <p className="max-w-[26ch] text-sm leading-snug font-medium text-ink-muted">{label}</p>
    </div>
  );
}
