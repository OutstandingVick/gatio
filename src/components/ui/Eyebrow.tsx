import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Tones map to text colours; all are 4.5:1 or better on the dark page. */
const tones = {
  accent: "text-gold",
  teal: "text-teal",
  plum: "text-plum",
  mustard: "text-mustard",
  lavender: "text-fg-muted",
  muted: "text-fg-faint",
  dark: "text-gold",
} as const;

export type EyebrowTone = keyof typeof tones;

/** Tiny uppercase label with wide tracking (the editorial kicker above headings). */
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
    <p className={cn("label inline-flex w-fit items-center gap-2", tones[tone], className)}>
      {icon}
      {children}
    </p>
  );
}
