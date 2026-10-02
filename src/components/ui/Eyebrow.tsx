import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Pastel pill styles. Text colours keep 4.5:1 contrast on their pastel. */
const tones = {
  accent: "bg-sky text-accent",
  teal: "bg-mint text-teal",
  plum: "bg-blush text-plum",
  mustard: "bg-butter text-mustard-text",
  lavender: "bg-lavender text-ink",
  muted: "bg-sand text-ink-muted",
  /** For navy sections. */
  dark: "bg-white/10 text-white",
} as const;

export type EyebrowTone = keyof typeof tones;

/** Small pill badge above headings. */
export function Eyebrow({
  children,
  tone = "accent",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </p>
  );
}
