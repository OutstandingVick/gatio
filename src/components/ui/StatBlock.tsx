import { cn } from "@/lib/cn";
import { COLOR_CLASSES, type ColorKey } from "@/lib/topics";

type StatBlockProps = {
  value: string;
  label: string;
  color?: ColorKey;
  size?: "md" | "lg";
  /** Hairline cell instead of a top rule. */
  boxed?: boolean;
  className?: string;
};

/** Large serif figure with a tracked caption. */
export function StatBlock({ value, label, color = "accent", size = "lg", boxed = false, className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-3", boxed ? "border border-rule p-7" : "border-t border-rule pt-5", className)}>
      <p className={cn("font-serif leading-none font-semibold", size === "lg" ? "text-6xl md:text-7xl" : "text-5xl", COLOR_CLASSES[color].text)}>{value}</p>
      <p className="label max-w-[28ch] leading-relaxed text-fg-muted">{label}</p>
    </div>
  );
}
