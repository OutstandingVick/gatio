import type { ReactNode } from "react";
import { Container } from "./Container";
import { Emphasis } from "./Emphasis";
import { Eyebrow, type EyebrowTone } from "./Eyebrow";

/** Centred page header: optional pill, heavy title (supports *emphasis* and {blossom}) and a short intro. */
export function PageHeader({
  title,
  description,
  eyebrow,
  eyebrowTone = "accent",
  children,
}: {
  title: string;
  description: ReactNode;
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  children?: ReactNode;
}) {
  return (
    <header>
      <Container className="flex flex-col items-center pt-16 pb-12 text-center md:pt-24 md:pb-16">
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 max-w-[16ch] text-5xl md:text-7xl">
          <Emphasis text={title} />
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-muted">{description}</p>
        {children}
      </Container>
    </header>
  );
}
