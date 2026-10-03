import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/portable-text/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/metadata";
import { sceneForService } from "@/lib/scenes";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
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

  const index = Math.max(0, (all ?? []).findIndex((x) => x._id === service._id));
  const img = service.image?.asset
    ? { src: urlFor(service.image).width(2400).height(1200).fit("crop").url(), alt: service.image.alt ?? "" }
    : sceneForService(service.slug, index);
  const n = String(index + 1).padStart(2, "0");

  return (
    <article>
      <header className="relative isolate overflow-hidden border-b border-rule">
        <Image src={img.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <Container className="flex min-h-[72vh] flex-col justify-end pt-32 pb-14 md:pb-20">
          <Link href="/services" className="label inline-flex w-fit items-center gap-2 text-fg-muted transition-colors hover:text-gold">
            <span aria-hidden="true">←</span> Services
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className={`label ${COLOR_CLASSES[topicColor(null, service.colorKey)].text}`}>Service {n}</p>
            {service.isSample && <SampleBadge />}
          </div>
          <h1 className="mt-5 max-w-[16ch] text-5xl md:text-8xl">{service.title}</h1>
          {service.summary && <p className="mt-6 max-w-[52ch] text-xl leading-relaxed text-fg/80">{service.summary}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Discuss this service
            </Button>
            <Button href="/research" variant="outline" size="lg">
              See our research
            </Button>
          </div>
        </Container>
      </header>

      <Container className="grid gap-12 py-16 md:py-24 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-20">
        {service.deliverables && service.deliverables.length > 0 ? (
          <aside aria-labelledby="included-title" className="h-fit lg:sticky lg:top-28">
            <h2 id="included-title" className="label font-sans text-gold">
              What&rsquo;s included
            </h2>
            <ul className="mt-5 border-t border-rule">
              {service.deliverables.map((d) => (
                <li key={d} className="border-b border-rule py-4 font-serif text-xl font-medium">
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
        <Section tone="paper" labelledBy="other-services">
          <SectionHeading id="other-services" eyebrow="Keep exploring" title="Other *services*" />
          <ol className="border-t border-rule">
            {others.map((o) => {
              const k = (all ?? []).findIndex((x) => x._id === o._id);
              return (
                <li key={o._id} className="border-b border-rule">
                  <Link href={`/services/${o.slug}`} className="group flex items-baseline gap-6 py-7">
                    <span className="label text-gold">{String(k + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-3xl font-semibold transition-colors group-hover:text-gold md:text-5xl">{o.title}</span>
                    <span aria-hidden="true" className="ml-auto text-2xl text-fg-muted transition-transform group-hover:translate-x-1 group-hover:text-gold">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Section>
      )}
    </article>
  );
}
