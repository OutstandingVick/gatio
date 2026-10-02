import Link from "next/link";
import { cn } from "@/lib/cn";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import { CoverArt } from "@/components/ui/CoverArt";
import type { ServiceCardData } from "@/sanity/types";

/** Service tile: small cover, number, title and summary. */
export function ServiceCard({
  service,
  index,
  headingLevel: Heading = "h3",
}: {
  service: ServiceCardData;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const color = topicColor(null, service.colorKey);
  return (
    <article className="group relative flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-paper p-6 hover:border-ink">
      <div className="flex items-start justify-between gap-4">
        <span className={cn("font-display text-lg tabular-nums", COLOR_CLASSES[color].text)}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="block aspect-[4/3] w-20 overflow-hidden rounded-lg">
          <CoverArt coverStyle={service.coverStyle} colorKey={service.colorKey} />
        </span>
      </div>
      <Heading className="font-display text-2xl leading-tight tracking-[-0.02em]">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:rounded-[var(--radius-card)] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent group-hover:underline decoration-1 underline-offset-4"
        >
          {service.title}
        </Link>
      </Heading>
      {service.summary && <p className="text-[15px] leading-relaxed text-ink-muted">{service.summary}</p>}
      <span aria-hidden="true" className="mt-auto text-accent">
        →
      </span>
    </article>
  );
}
