import { cn } from "@/lib/cn";
import { COLOR_CLASSES, COLOR_SOFT, topicColor } from "@/lib/topics";

type TopicTagProps = {
  /** Topic slug, e.g. "payments". Drives the colour. */
  slug?: string | null;
  /** Optional explicit colour key from the CMS, overrides the slug mapping. */
  colorKey?: string | null;
  /** Visible label; defaults to the slug with dashes replaced. */
  label?: string | null;
  /** `text`: pastel pill with a dot. `solid`: filled pill in the topic colour. */
  variant?: "text" | "solid";
  className?: string;
};

export function TopicTag({ slug, colorKey, label, variant = "text", className }: TopicTagProps) {
  const key = topicColor(slug, colorKey);
  const color = COLOR_CLASSES[key];
  const text = label ?? (slug ? slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()) : "Topic");

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold",
        variant === "solid" ? cn(color.bg, color.fg) : cn(COLOR_SOFT[key], color.text),
        className,
      )}
    >
      {variant === "text" && <span aria-hidden="true" className={cn("size-1.5 rounded-full", color.bg)} />}
      {text}
    </span>
  );
}
