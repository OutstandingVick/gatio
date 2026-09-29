import type { ReactNode } from "react";
import { Container } from "./Container";

/** Listing page header: large Fraunces title and a one-line description. */
export function PageHeader({ title, description, children }: { title: ReactNode; description: ReactNode; children?: ReactNode }) {
  return (
    <header className="border-b border-line">
      <Container className="py-14 md:py-20">
        <h1 className="text-6xl md:text-8xl">{title}</h1>
        <p className="mt-5 max-w-[60ch] text-lg text-ink-muted">{description}</p>
        {children}
      </Container>
    </header>
  );
}
