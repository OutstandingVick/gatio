import type { Metadata } from "next";
import { Hero } from "@/components/editorial/Hero";
import { Statement } from "@/components/editorial/Statement";
import { StatsRow } from "@/components/editorial/StatsRow";
import { Ticker } from "@/components/editorial/Ticker";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { researchTopicHref } from "@/lib/routes";
import { sanityFetch } from "@/sanity/client";
import { allTopicsQuery, homePageQuery } from "@/sanity/queries";

// ISR fallback; publishing in the Studio refreshes sooner via the /api/revalidate webhook.
export const revalidate = 60;

function getHome() {
  return sanityFetch({ query: homePageQuery, tags: ["homePage"] });
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  return {
    title: { absolute: home?.seo?.title || "Gatio — Research & Insights" },
    description: home?.seo?.description || stripEmphasis(home?.headline) || undefined,
  };
}

export default async function HomePage() {
  const [home, topics] = await Promise.all([getHome(), sanityFetch({ query: allTopicsQuery, tags: ["topic"] })]);

  return (
    <>
      <Hero
        headline={home?.headline}
        intro={home?.intro}
        primaryCta={home?.primaryCta}
        secondaryCta={home?.secondaryCta}
        note={home?.availability}
        facts={(home?.trustFacts ?? []).filter(Boolean) as string[]}
        areas={(topics ?? []).map((t) => ({ title: t.title ?? "", href: researchTopicHref(t.slug) }))}
      />
      <StatsRow stats={(home?.numbers ?? []).map((n) => ({ _key: n._key, value: n.value, label: n.label }))} />
      <Ticker items={home?.marquee ?? []} />
      <Statement label="The standard" text={home?.statementHeading || "We don't sell reports. We sell *decisions.*"} />
    </>
  );
}
