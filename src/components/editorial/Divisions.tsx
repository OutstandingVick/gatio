import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { sceneForService } from "@/lib/scenes";
import { COLOR_CLASSES, COLOR_HEX, topicColor } from "@/lib/topics";
import type { CSSProperties } from "react";
import { urlFor } from "@/sanity/image";
import type { ServicesQueryResult } from "@/sanity/types";

type Service = ServicesQueryResult[number];

function imageFor(s: Service, i: number) {
  if (s.image?.asset) return { src: urlFor(s.image).width(1400).height(1750).fit("crop").url(), alt: s.image.alt ?? "" };
  return sceneForService(s.slug, i);
}

/**
 * The reference site's "divisions": each service is a tall row with a sticky image
 * (outlined numeral, title, position ticks) beside text that scrolls past it.
 */
export function Divisions({ services, ctaLabel }: { services: ServicesQueryResult; ctaLabel?: string | null }) {
  if (!services.length) return null;
  const total = String(services.length).padStart(2, "0");

  return (
    <section aria-labelledby="divisions-title" className="border-t border-rule">
      <Container className="flex flex-col gap-6 pt-20 pb-10 md:flex-row md:items-end md:justify-between md:pt-28">
        <div>
          <p className="label text-gold">01 — {total}</p>
          <h2 id="divisions-title" className="mt-4 text-5xl md:text-7xl">
            The <em>services</em>
          </h2>
        </div>
        <Link href="/contact" className="label inline-flex min-h-12 w-fit items-center bg-steel px-7 font-medium text-white transition-colors hover:bg-white hover:text-deep">
          {ctaLabel || "Discuss a project"}
        </Link>
      </Container>

      <ol>
        {services.map((s, i) => {
          const color = COLOR_CLASSES[topicColor(null, s.colorKey)];
          const img = imageFor(s, i);
          const n = String(i + 1).padStart(2, "0");
          const deliverables = (s.deliverables ?? []).filter(Boolean).slice(0, 4);
          return (
            <li key={s._id}>
              <Container className="grid gap-8 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 md:py-0">
                {/* Sticky image column */}
                <div className="md:min-h-[175vh]">
                  <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-20 md:aspect-auto md:h-[calc(100vh-7rem)]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b2533]/90 via-[#0f3142]/15 to-transparent" />
                    <ol aria-hidden="true" className="absolute top-1/2 right-5 flex -translate-y-1/2 flex-col gap-2">
                      {services.map((_, k) => (
                        <li key={k} className={cn("h-6 w-px", k === i ? "bg-gold" : "bg-fg/30")} />
                      ))}
                    </ol>
                    <div aria-hidden="true" className="absolute bottom-8 left-8 right-16">
                      <p className="outline-numeral text-[110px] leading-none md:text-[150px]" style={{ "--numeral": COLOR_HEX[topicColor(null, s.colorKey)] } as CSSProperties}>
                        {n}
                      </p>
                      <p className="mt-3 font-serif text-2xl font-semibold text-fg md:text-3xl">{s.title}</p>
                    </div>
                  </div>
                </div>

                {/* Scrolling text column */}
                <div className="flex flex-col justify-center md:min-h-[175vh]">
                  <p className={cn("label", color.text)}>Service {n}</p>
                  <h3 className="mt-4 text-4xl md:text-5xl">{s.title}</h3>
                  {s.summary && <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-fg-muted">{s.summary}</p>}
                  {deliverables.length > 0 && (
                    <ul className="mt-8 max-w-[46ch] border-t border-rule">
                      {deliverables.map((d) => (
                        <li key={d} className="flex items-baseline gap-4 border-b border-rule py-3.5 text-[15px] text-fg/85">
                          <span aria-hidden="true" className={cn("h-px w-4 shrink-0 translate-y-[-3px]", color.bg)} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ArrowLink href={`/services/${s.slug}`} className="mt-10">
                    Explore {s.title}
                  </ArrowLink>
                </div>
              </Container>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
