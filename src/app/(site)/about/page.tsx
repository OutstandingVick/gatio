import type { Metadata } from "next";
import Image from "next/image";
import { RichText } from "@/components/portable-text/RichText";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Emphasis, stripEmphasis } from "@/components/ui/Emphasis";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import type { ColorKey } from "@/lib/topics";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { aboutPageQuery } from "@/sanity/queries";

const STAT_COLORS: ColorKey[] = ["accent", "teal", "plum", "mustard"];

function getAbout() {
  return sanityFetch({ query: aboutPageQuery, tags: ["aboutPage", "author"] });
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return {
    title: about?.seo?.title || "About",
    description: about?.seo?.description || about?.intro || stripEmphasis(about?.headline) || undefined,
  };
}

function initials(name: string | null) {
  return (name ?? "?")
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function AboutPage() {
  const about = await getAbout();
  const team = about?.team ?? [];

  return (
    <>
      <header>
        <Container className="grid gap-12 pt-14 pb-16 md:pt-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>About Gatio</Eyebrow>
            <h1 className="mt-6 text-5xl md:text-7xl lg:text-[88px] lg:leading-[1.02]">
              <Emphasis text={about?.headline || "We study markets *up close.*"} />
            </h1>
            <p className="mt-8 max-w-[52ch] text-xl text-ink-muted">{about?.intro || "[AGENCY STORY]"}</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
            <CoverArt coverStyle="rings" colorKey="teal" />
          </div>
        </Container>
      </header>

      {about?.story && about.story.length > 0 && (
        <Section tone="paper" labelledBy="story-title">
          <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            <h2 id="story-title" className="text-3xl md:text-4xl">
              Our story
            </h2>
            <RichText value={about.story} />
          </div>
        </Section>
      )}

      {about?.stats && about.stats.length > 0 && (
        <Section labelledBy="figures-title">
          <h2 id="figures-title" className="sr-only">
            Gatio in figures
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {about.stats.map((s, i) => (
              <StatBlock key={s._key} value={s.value ?? ""} label={s.label ?? ""} color={STAT_COLORS[i % STAT_COLORS.length]} />
            ))}
          </div>
        </Section>
      )}

      {about?.values && about.values.length > 0 && (
        <Section tone="ink" labelledBy="values-title">
          <h2 id="values-title" className="mb-12 text-4xl md:text-6xl [&_em]:text-mustard">
            How we <em>work</em>
          </h2>
          <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <li key={v._key} className="border-t border-cream/25 pt-6">
                <span className="font-display text-lg text-mustard tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl">{v.title}</h3>
                {v.text && <p className="mt-3 leading-relaxed text-cream/80">{v.text}</p>}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {team.length > 0 && (
        <Section labelledBy="team-title">
          <h2 id="team-title" className="mb-12 text-4xl md:text-6xl">
            <Emphasis text={about?.teamHeading || "The *people* behind the work"} />
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <li key={p._id} className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-6">
                {p.photo?.asset ? (
                  <Image
                    src={urlFor(p.photo).width(192).height(192).fit("crop").url()}
                    alt=""
                    width={96}
                    height={96}
                    className="size-24 rounded-full bg-sand object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className="flex size-24 items-center justify-center rounded-full bg-ink font-display text-3xl text-cream">
                    {initials(p.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-2xl">{p.name}</h3>
                  {p.role && <p className="text-sm text-ink-muted">{p.role}</p>}
                </div>
                {p.bio && <p className="text-[15px] leading-relaxed text-ink-muted">{p.bio}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section tone="sand" labelledBy="about-cta" className="text-center">
        <h2 id="about-cta" className="mx-auto max-w-[18ch] text-4xl md:text-6xl">
          Have a question about <em>your market?</em>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/contact" variant="accent">
            Get in touch
          </Button>
          <Button href="/services" variant="outline">
            See our services
          </Button>
        </div>
      </Section>
    </>
  );
}
