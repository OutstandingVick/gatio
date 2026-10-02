import Link from "next/link";
import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";
import type { ServiceCardData } from "@/sanity/types";

export function ServicesStrip({ services, heading }: { services: ServiceCardData[]; heading?: string | null }) {
  if (!services.length) return null;
  return (
    <Section tone="paper" labelledBy="services-title">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="services-title" className="text-4xl md:text-6xl [&_em]:text-plum">
          <Emphasis text={heading || "How we *help*"} />
        </h2>
        <Link
          href="/services"
          className="font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
        >
          All services <span aria-hidden="true">→</span>
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.slice(0, 4).map((s, i) => (
          <li key={s._id}>
            <ServiceCard service={s} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
