import { cn } from "@/lib/cn";
import { COLOR_CLASSES, type ColorKey } from "@/lib/topics";

type StatBlockProps = {
  value: string;
  label: string;
  color?: ColorKey;
  size?: "md" | "lg";
  className?: string;
};

/** Large Fraunces figure with a small caption. */
export function StatBlock({ value, label, color = "ink", size = "lg", className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-2 border-t border-line pt-4", className)}>
      <p
        className={cn(
          "font-display leading-none tracking-[-0.03em]",
          size === "lg" ? "text-6xl md:text-7xl" : "text-5xl",
          COLOR_CLASSES[color].text,
        )}
      >
        {value}
      </p>
      <p className="max-w-[24ch] text-sm leading-snug text-ink-muted">{label}</p>
    </div>
  );
}
