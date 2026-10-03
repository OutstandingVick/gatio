import { ArrowLink } from "@/components/ui/ArrowLink";
import { Blossom } from "@/components/ui/Blossom";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { COLOR_CLASSES, COLOR_HEX, topicColor } from "@/lib/topics";
import type { ServicesQueryResult } from "@/sanity/types";
import type { ReactNode } from "react";

type Service = ServicesQueryResult[number];

/** Product-card style service tile with a mock "app screen" listing what's included. */
export function ServiceTile({ service, index }: { service: Service; index: number }) {
  const key = topicColor(null, service.colorKey);
  const color = COLOR_CLASSES[key];
  const deliverables = (service.deliverables ?? []).filter(Boolean).slice(0, 3);

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-[var(--radius-panel)] bg-sand px-7 pt-8 md:px-9 md:pt-10">
      <div className="flex items-center gap-3">
        <span className="relative flex size-11 items-center justify-center">
          <Blossom color={COLOR_HEX[key]} className="absolute inset-0 size-11" />
          <span className={cn("relative text-sm font-extrabold", key === "mustard" ? "text-ink" : "text-white")}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </span>
      </div>
      <h3 className="mt-6 text-2xl md:text-[28px]">{service.title}</h3>
      {service.summary && <p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-ink-muted">{service.summary}</p>}
      <ArrowLink href={`/services/${service.slug}`} className="mt-5 after:absolute after:inset-0">
        Learn more<span className="sr-only"> about {service.title}</span>
      </ArrowLink>

      {/* Mock app screen peeking from the bottom edge */}
      <div aria-hidden="true" className="mx-auto mt-8 w-full max-w-[320px] translate-y-3 rounded-t-[28px] border-[6px] border-b-0 border-ink bg-paper px-4 pt-4 pb-6 transition-transform duration-300 group-hover:translate-y-0">
        <p className="text-center text-sm font-bold">{service.title}</p>
        <div className={cn("mt-4 rounded-2xl p-4", color.bg, color.fg)}>
          <p className="w-fit rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold text-white">What&rsquo;s included</p>
          <ul className="mt-3 flex flex-col gap-1.5 text-[13px] font-semibold">
            {(deliverables.length ? deliverables : ["[DELIVERABLE]", "[DELIVERABLE]"]).map((d, i) => (
              <li key={i} className="truncate">
                ✓ {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function ServicesGrid({
  services,
  heading,
  footer,
}: {
  services: ServicesQueryResult;
  heading?: string | null;
  footer?: ReactNode;
}) {
  if (!services.length) return null;
  return (
    <Section tone="paper" rounded labelledBy="services-title">
      <SectionHeading
        id="services-title"
        align="center"
        eyebrow="Services"
        title={heading || "Everything you need to *understand a market*"}
        intro="[SERVICES INTRO: one line on how engagements are scoped and led.]"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <ServiceTile key={s._id} service={s} index={i} />
        ))}
      </div>
      {footer && <div className="mt-12 flex justify-center">{footer}</div>}
    </Section>
  );
}
