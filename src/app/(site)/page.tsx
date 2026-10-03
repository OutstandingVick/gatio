import type { Metadata } from "next";
import { BigStatement } from "@/components/editorial/BigStatement";
import { Commitments } from "@/components/editorial/Commitments";
import { Divisions } from "@/components/editorial/Divisions";
import { FeaturedBand } from "@/components/editorial/FeaturedBand";
import { FounderNote } from "@/components/editorial/FounderNote";
import { Hero } from "@/components/editorial/Hero";
import { InsightsRow } from "@/components/editorial/InsightsRow";
import { Process } from "@/components/editorial/Process";
import { ResearchRows } from "@/components/editorial/ResearchRows";
import { Statement } from "@/components/editorial/Statement";
import { StatsRow } from "@/components/editorial/StatsRow";
import { Ticker } from "@/components/editorial/Ticker";
import { WhoWeAre } from "@/components/editorial/WhoWeAre";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { researchTopicHref } from "@/lib/routes";
import { sanityFetch } from "@/sanity/client";
import {
  allTopicsQuery,
  featuredReportQuery,
  featuredWorkQuery,
  homePageQuery,
  latestArticlesQuery,
  servicesQuery,
} from "@/sanity/queries";
import { getSettings } from "@/sanity/settings";

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
  const [home, settings, topics, featured, work, articles, services] = await Promise.all([
    getHome(),
    getSettings(),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
    sanityFetch({ query: featuredReportQuery, tags: ["report", "topic"] }),
    sanityFetch({ query: featuredWorkQuery, params: { limit: 3 }, tags: ["report", "topic", "author"] }),
    sanityFetch({ query: latestArticlesQuery, params: { limit: 3 }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: servicesQuery, tags: ["service"] }),
  ]);
  const topicList = topics ?? [];

  return (
    <>
      <Hero
        headline={home?.headline}
        intro={home?.intro}
        primaryCta={home?.primaryCta}
        secondaryCta={home?.secondaryCta}
        note={home?.availability}
        facts={(home?.trustFacts ?? []).filter(Boolean) as string[]}
        areas={topicList.map((t) => ({ title: t.title ?? "", href: researchTopicHref(t.slug) }))}
      />
      <StatsRow stats={(home?.numbers ?? []).map((n) => ({ _key: n._key, value: n.value, label: n.label }))} />
      <Ticker items={home?.marquee ?? []} />
      {featured && <FeaturedBand report={featured} />}
      <Statement label="The standard" text={home?.statementHeading || "We don't sell reports. We sell *decisions.*"} />
      <BigStatement first="One question." second="Every angle." items={topicList.map((t) => t.title ?? "").filter(Boolean)} />
      <Divisions services={services ?? []} ctaLabel={settings?.ctaLabel} />
      <WhoWeAre heading={home?.whoHeading} body={home?.whoBody} quote={home?.whoQuote} attribution={home?.whoQuoteAttribution} />
      <ResearchRows reports={work ?? []} />
      <FounderNote quote={home?.founderQuote} name={home?.founderName} role={home?.founderRole} />
      <Commitments heading={home?.commitmentsHeading} items={home?.commitments ?? []} />
      <Process heading={home?.stepsHeading} steps={home?.steps ?? []} />
      <InsightsRow articles={articles ?? []} heading={home?.insightsHeading} />
    </>
  );
}
