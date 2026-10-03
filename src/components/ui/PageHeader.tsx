import Image from "next/image";
import type { ReactNode } from "react";
import { SCENES, type SceneKey } from "@/lib/scenes";
import { Container } from "./Container";
import { Emphasis } from "./Emphasis";
import type { EyebrowTone } from "./Eyebrow";

/** Full-bleed banner over a painted scene: gold label, serif title (supports *emphasis*), intro. */
export function PageHeader({
  title,
  description,
  eyebrow,
  scene = "hero",
  children,
}: {
  title: string;
  description: ReactNode;
  eyebrow?: string;
  /** Kept for API compatibility. */
  eyebrowTone?: EyebrowTone;
  scene?: SceneKey;
  children?: ReactNode;
}) {
  const img = SCENES[scene];
  return (
    <header className="relative isolate overflow-hidden border-b border-rule">
      <Image src={img.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[60%_center]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
      <Container className="flex min-h-[62vh] flex-col justify-end pt-32 pb-14 md:pb-20">
        {eyebrow && <p className="label text-gold">{eyebrow}</p>}
        <h1 className="mt-5 max-w-[16ch] text-5xl md:text-8xl">
          <Emphasis text={title} blossomColor="none" />
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-fg/80">{description}</p>
        {children}
      </Container>
    </header>
  );
}
