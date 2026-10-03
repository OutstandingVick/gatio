import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "paper" | "sand" | "ink";

/** All tones are dark; they differ by a step of lightness. `ink` is the deepest. */
const toneClasses: Record<Tone, string> = {
  cream: "bg-bg",
  paper: "bg-surface",
  sand: "bg-surface-2",
  ink: "bg-black",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Kept for API compatibility; editorial bands are separated by hairlines, not rounded. */
  rounded?: boolean;
  /** Draw a hairline above the section. */
  rule?: boolean;
  label?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/** Full-bleed band with a Container inside. */
export function Section({ id, tone = "cream", rule = true, label, labelledBy, className, containerClassName, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn("py-20 text-fg md:py-32", toneClasses[tone], rule && "border-t border-rule", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
