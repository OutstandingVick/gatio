import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/portable-text/RichText";
import { ServiceCard } from "@/components/sections/services/ServiceCard";
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
        <Container className="grid gap-10 pt-12 pb-14 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <Eyebrow>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </Eyebrow>
              {service.isSample && <SampleBadge />}
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl">{service.title}</h1>
            {service.summary && <p className="mt-6 max-w-[52ch] text-xl text-ink-muted">{service.summary}</p>}
            <Button href="/contact" variant="accent" className="mt-10">
              Discuss this service
            </Button>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
            <CoverArt coverStyle={service.coverStyle} colorKey={service.colorKey} />
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 border-t border-line py-14 md:py-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
        {service.deliverables && service.deliverables.length > 0 ? (
          <aside aria-labelledby="included-title">
            <h2 id="included-title" className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              What&rsquo;s included
            </h2>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {service.deliverables.map((d) => (
                <li key={d} className="flex gap-3 py-3 text-[15px]">
                  <span aria-hidden="true" className="text-accent">
                    ✓
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
        <Section tone="sand" labelledBy="other-services">
          <h2 id="other-services" className="mb-10 text-4xl md:text-5xl">
            Other services
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.slice(0, 3).map((s, i) => (
              <li key={s._id}>
                <ServiceCard service={s} index={(all ?? []).indexOf(s) >= 0 ? (all ?? []).indexOf(s) : i} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}
