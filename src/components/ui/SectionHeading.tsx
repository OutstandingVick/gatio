import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Emphasis } from "./Emphasis";
import { Eyebrow, type EyebrowTone } from "./Eyebrow";

type SectionHeadingProps = {
  id: string;
  /** Headline; supports `*emphasis*` and `{blossom}`. */
  title: string;
  eyebrow?: string | null;
  eyebrowTone?: EyebrowTone;
  intro?: ReactNode;
  align?: "left" | "center";
  /** On navy sections, text turns white and emphasis lime. */
  dark?: boolean;
  as?: "h1" | "h2";
  /** Optional link or button shown beside a left-aligned heading. */
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  eyebrowTone = "accent",
  intro,
  align = "left",
  dark = false,
  as: Tag = "h2",
  action,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-10 flex gap-6 md:mb-14",
        centered ? "flex-col items-center text-center" : "flex-col md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-4", centered && "items-center")}>
        {eyebrow && <Eyebrow tone={dark ? "dark" : eyebrowTone}>{eyebrow}</Eyebrow>}
        <Tag
          id={id}
          className={cn(
            "max-w-[20ch] text-4xl md:text-[56px]",
            dark && "text-white [&_em]:text-lime",
          )}
        >
          <Emphasis text={title} blossomColor={dark ? "var(--lime)" : undefined} />
        </Tag>
        {intro && (
          <p className={cn("max-w-[56ch] text-lg leading-relaxed", dark ? "text-white/75" : "text-ink-muted")}>{intro}</p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
