import { cn } from "@/lib/cn";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";

type TopicTagProps = {
  /** Topic slug, e.g. "payments". Drives the colour. */
  slug?: string | null;
  /** Optional explicit colour key from the CMS, overrides the slug mapping. */
  colorKey?: string | null;
  /** Visible label; defaults to the slug with dashes replaced. */
  label?: string | null;
  /** `text`: tracked label with a short coloured rule. `solid`: filled tag. */
  variant?: "text" | "solid";
  className?: string;
};

export function TopicTag({ slug, colorKey, label, variant = "text", className }: TopicTagProps) {
  const color = COLOR_CLASSES[topicColor(slug, colorKey)];
  const text = label ?? slug?.replace(/-/g, " ") ?? "Topic";

  if (variant === "solid") {
    return <span className={cn("label inline-flex w-fit px-2.5 py-1 font-medium", color.bg, color.fg, className)}>{text}</span>;
  }
  return (
    <span className={cn("label inline-flex w-fit items-center gap-2.5", color.text, className)}>
      <span aria-hidden="true" className={cn("h-px w-5", color.bg)} />
      {text}
    </span>
  );
}
