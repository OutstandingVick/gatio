import type { Metadata } from "next";
import Image from "next/image";
import { Commitments } from "@/components/editorial/Commitments";
import { StatsRow } from "@/components/editorial/StatsRow";
import { RichText } from "@/components/portable-text/RichText";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { aboutPageQuery } from "@/sanity/queries";


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
      <PageHeader eyebrow="About Gatio" title={about?.headline || "We study markets *up close.*"} description={about?.intro || "[AGENCY STORY]"} />

      {about?.story && about.story.length > 0 && (
        <Section labelledBy="story-title" rule={false}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
            <div>
              <p className="label text-gold">Our story</p>
              <h2 id="story-title" className="mt-5 text-5xl md:text-6xl">
                How we <em>started</em>
              </h2>
            </div>
            <RichText value={about.story} />
          </div>
        </Section>
      )}

      {about?.stats && about.stats.length > 0 && <StatsRow stats={about.stats.map((st) => ({ _key: st._key, value: st.value, label: st.label }))} />}

      {about?.values && about.values.length > 0 && (
        <Commitments heading="Principles we *work by*" items={about.values.map((v) => ({ _key: v._key, title: v.title, text: v.text }))} />
      )}

      {team.length > 0 && (
        <Section tone="paper" labelledBy="team-title">
          <SectionHeading id="team-title" eyebrow="The team" title={about?.teamHeading || "The *people* behind the work"} />
          <ul className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-3">
            {team.map((p) => (
              <li key={p._id} className="flex flex-col gap-4 border-b border-rule py-10 sm:pr-10">
                {p.photo?.asset ? (
                  <Image
                    src={urlFor(p.photo).width(192).height(192).fit("crop").url()}
                    alt=""
                    width={80}
                    height={80}
                    className="size-20 rounded-full bg-surface-2 object-cover grayscale"
                  />
                ) : (
                  <span aria-hidden="true" className="flex size-20 items-center justify-center rounded-full border border-gold/70 font-serif text-2xl font-semibold text-gold">
                    {initials(p.name)}
                  </span>
                )}
                <div>
                  <h3 className="text-3xl">{p.name}</h3>
                  {p.role && <p className="label mt-2 text-fg-faint">{p.role}</p>}
                </div>
                {p.bio && <p className="leading-relaxed text-fg-muted">{p.bio}</p>}
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
