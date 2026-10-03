import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Emphasis } from "./Emphasis";
import { Eyebrow, type EyebrowTone } from "./Eyebrow";

type SectionHeadingProps = {
  id: string;
  /** Headline; supports `*emphasis*` (gold italic). */
  title: string;
  eyebrow?: string | null;
  eyebrowTone?: EyebrowTone;
  intro?: ReactNode;
  align?: "left" | "center";
  /** Kept for API compatibility; every section is dark. */
  dark?: boolean;
  as?: "h1" | "h2";
  action?: ReactNode;
  className?: string;
};

/** Gold tracked label, large serif title with gold italic emphasis, light intro. */
export function SectionHeading({ id, title, eyebrow, eyebrowTone = "accent", intro, align = "left", as: Tag = "h2", action, className }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("mb-12 flex gap-8 md:mb-16", centered ? "flex-col items-center text-center" : "flex-col md:flex-row md:items-end md:justify-between", className)}>
      <div className={cn("flex flex-col gap-5", centered && "items-center")}>
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        <Tag id={id} className="max-w-[18ch] text-[40px] md:text-6xl">
          <Emphasis text={title} blossomColor="none" />
        </Tag>
        {intro && <p className="max-w-[56ch] text-lg leading-relaxed text-fg-muted">{intro}</p>}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
