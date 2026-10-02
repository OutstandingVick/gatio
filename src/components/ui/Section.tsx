import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "cream" | "paper" | "sand" | "ink";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-white",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Inset band with large rounded corners (PiggyVest-style). */
  rounded?: boolean;
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
  rounded = false,
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
      className={cn(
        "py-16 md:py-28",
        toneClasses[tone],
        rounded && "mx-2 rounded-[32px] md:mx-3 md:rounded-[48px]",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
