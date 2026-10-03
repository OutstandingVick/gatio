import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/portable-text/RichText";
import { ServiceTile } from "@/components/sections/home/ServicesGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Check, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { topicColor } from "@/lib/topics";
import { sanityFetch } from "@/sanity/client";
import { serviceBySlugQuery, serviceSlugsQuery, servicesQuery } from "@/sanity/queries";

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: serviceSlugsQuery, tags: ["service"] });
  return (slugs ?? []).map((slug) => ({ slug }));
}

function getService(slug: string) {
  return sanityFetch({ query: serviceBySlugQuery, params: { slug }, tags: ["service"] });
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return buildMetadata({ title: service.title, seo: service.seo, fallbackDescription: service.summary }, `/services/${slug}`);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, all] = await Promise.all([
    getService(slug),
    sanityFetch({ query: servicesQuery, tags: ["service"] }),
  ]);
  if (!service) notFound();

  const others = (all ?? []).filter((s) => s._id !== service._id);
  const color = topicColor(null, service.colorKey);

  return (
    <article>
      <header>
        <Container className="grid gap-10 pt-10 pb-14 md:pt-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-ink-muted hover:text-ink">
              <ChevronLeft className="size-4" aria-hidden="true" />
              Services
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Eyebrow tone="teal">Service</Eyebrow>
              {service.isSample && <SampleBadge />}
            </div>
            <h1 className="mt-6 text-[44px] md:text-7xl md:leading-[1]">{service.title}</h1>
            {service.summary && <p className="mt-6 max-w-[48ch] text-xl leading-relaxed text-ink-muted">{service.summary}</p>}
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact" variant="accent" size="lg">
                Discuss this service
              </Button>
              <Button href="/research" variant="soft" size="lg">
                See our research
              </Button>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[32px] md:rounded-[48px]">
            <CoverArt coverStyle={service.coverStyle} colorKey={service.colorKey} />
          </div>
        </Container>
      </header>

      <Container className="grid gap-10 pb-16 md:pb-24 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-16">
        {service.deliverables && service.deliverables.length > 0 ? (
          <aside aria-labelledby="included-title" className="h-fit rounded-[var(--radius-card)] bg-paper p-6 lg:sticky lg:top-28">
            <h2 id="included-title" className="text-xl">
              What&rsquo;s included
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] font-medium">
                  <span aria-hidden="true" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-mint text-teal">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </aside>
        ) : (
          <div />
        )}
        <RichText value={service.body} color={color} />
      </Container>

      {others.length > 0 && (
        <Section tone="sand" rounded labelledBy="other-services" className="mb-3">
          <SectionHeading id="other-services" eyebrow="Keep exploring" eyebrowTone="lavender" title="Other *services*" />
          <ul className="grid gap-5 md:grid-cols-2">
            {others.slice(0, 2).map((s) => (
              <li key={s._id} className="flex">
                <ServiceTile service={s} index={(all ?? []).indexOf(s)} surface="paper" />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}
