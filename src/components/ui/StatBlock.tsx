import { cn } from "@/lib/cn";
import { COLOR_CLASSES, type ColorKey } from "@/lib/topics";

type StatBlockProps = {
  value: string;
  label: string;
  color?: ColorKey;
  className?: string;
};

/** Large Fraunces figure with a small caption. */
export function StatBlock({ value, label, color = "ink", className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-2 border-t border-line pt-4", className)}>
      <p
        className={cn(
          "font-display text-6xl leading-none tracking-[-0.03em] md:text-7xl",
          COLOR_CLASSES[color].text,
        )}
      >
        {value}
      </p>
      <p className="max-w-[24ch] text-sm leading-snug text-ink-muted">{label}</p>
    </div>
  );
}
