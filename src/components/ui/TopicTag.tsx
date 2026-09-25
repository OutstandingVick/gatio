import { cn } from "@/lib/cn";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";

type TopicTagProps = {
  /** Topic slug, e.g. "payments". Drives the colour. */
  slug?: string | null;
  /** Optional explicit colour key from the CMS, overrides the slug mapping. */
  colorKey?: string | null;
  /** Visible label; defaults to the slug with dashes replaced. */
  label?: string | null;
  /** `text`: coloured label with a dot. `solid`: filled pill. */
  variant?: "text" | "solid";
  className?: string;
};

export function TopicTag({ slug, colorKey, label, variant = "text", className }: TopicTagProps) {
  const color = COLOR_CLASSES[topicColor(slug, colorKey)];
  const text = label ?? slug?.replace(/-/g, " ") ?? "Topic";

  if (variant === "solid") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
          color.bg,
          color.fg,
          className,
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]",
        color.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-2 rounded-full", color.bg)} />
      {text}
    </span>
  );
}
