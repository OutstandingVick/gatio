import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  accent: "text-accent",
  teal: "text-teal",
  muted: "text-ink-muted",
  mustard: "text-mustard",
} as const;

/** Small uppercase kicker above headings. */
export function Eyebrow({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.14em]", tones[tone], className)}>{children}</p>
  );
}
