import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "paper" | "sand" | "ink";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Accessible label; required when the section has no visible heading. */
  label?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/** Full-bleed vertical band with a toned background and a Container inside. */
export function Section({
  id,
  tone = "cream",
  label,
  labelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
