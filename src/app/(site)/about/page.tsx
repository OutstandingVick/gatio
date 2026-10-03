import type { Metadata } from "next";
import Image from "next/image";
import { RichText } from "@/components/portable-text/RichText";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Blossom } from "@/components/ui/Blossom";
import { CoverArt } from "@/components/ui/CoverArt";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import type { ColorKey } from "@/lib/topics";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { aboutPageQuery } from "@/sanity/queries";
import { getSettings } from "@/sanity/settings";

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

const AVATAR = ["bg-sky text-accent", "bg-mint text-teal", "bg-blush text-plum", "bg-butter text-mustard-text", "bg-lavender text-ink"];

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  const team = about?.team ?? [];

  return (
    <>
      <PageHeader
        eyebrow="About Gatio"
        eyebrowTone="plum"
        title={about?.headline || "We study markets *up close.*"}
        description={about?.intro || "[AGENCY STORY]"}
      />
      <div className="mx-2 aspect-[16/9] overflow-hidden rounded-[32px] md:mx-3 md:aspect-[21/7] md:rounded-[48px]">
        <CoverArt coverStyle="rings" colorKey="teal" />
      </div>

      {about?.story && about.story.length > 0 && (
        <Section labelledBy="story-title">
          <div className="grid gap-8 rounded-[var(--radius-panel)] bg-paper p-8 md:p-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16">
            <div className="flex flex-col gap-4">
              <Eyebrow tone="teal">Our story</Eyebrow>
              <h2 id="story-title" className="text-3xl md:text-4xl">
                How we <em>started</em>
              </h2>
            </div>
            <RichText value={about.story} />
          </div>
        </Section>
      )}

      {about?.stats && about.stats.length > 0 && (
        <Section labelledBy="figures-title" className="pt-0 md:pt-0">
          <h2 id="figures-title" className="sr-only">
            Gatio in figures
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.stats.map((st, i) => (
              <StatBlock key={st._key} value={st.value ?? ""} label={st.label ?? ""} color={STAT_COLORS[i % STAT_COLORS.length]} boxed className="min-h-[170px] justify-between" />
            ))}
          </div>
        </Section>
      )}

      {about?.values && about.values.length > 0 && (
        <Section tone="ink" rounded labelledBy="values-title">
          <SectionHeading id="values-title" dark align="center" eyebrow="How we work" title="Principles we *work by*" />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <li key={v._key} className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-white/[0.06] p-7">
                <span className="relative flex size-12 items-center justify-center">
                  <Blossom color="var(--lime)" className="absolute inset-0 size-12" />
                  <span className="relative text-sm font-extrabold text-ink">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="text-2xl text-white">{v.title}</h3>
                {v.text && <p className="leading-relaxed text-white/75">{v.text}</p>}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {team.length > 0 && (
        <Section labelledBy="team-title">
          <SectionHeading id="team-title" eyebrow="The team" eyebrowTone="lavender" title={about?.teamHeading || "The *people* behind the work"} />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p, i) => (
              <li key={p._id} className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper p-6">
                {p.photo?.asset ? (
                  <Image
                    src={urlFor(p.photo).width(192).height(192).fit("crop").url()}
                    alt=""
                    width={80}
                    height={80}
                    className="size-20 rounded-full bg-sand object-cover"
                  />
                ) : (
                  <span aria-hidden="true" className={`flex size-20 items-center justify-center rounded-full text-2xl font-extrabold ${AVATAR[i % AVATAR.length]}`}>
                    {initials(p.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-xl">{p.name}</h3>
                  {p.role && <p className="text-sm font-medium text-ink-muted">{p.role}</p>}
                </div>
                {p.bio && <p className="text-[15px] leading-relaxed text-ink-muted">{p.bio}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      <FinalCta heading="Have a question about *your market?*" text="[CTA TEXT]" ctaLabel={settings?.ctaLabel} />
    </>
  );
}
