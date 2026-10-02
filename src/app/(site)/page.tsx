import type { Metadata } from "next";
import { FeaturedReport } from "@/components/sections/home/FeaturedReport";
import { Hero } from "@/components/sections/home/Hero";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { Newsletter } from "@/components/sections/home/Newsletter";
import { ResearchAreas } from "@/components/sections/home/ResearchAreas";
import { ServicesStrip } from "@/components/sections/home/ServicesStrip";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { sanityFetch } from "@/sanity/client";
import {
  allTopicsQuery,
  featuredReportQuery,
  homePageQuery,
  latestArticlesQuery,
  latestReportsQuery,
  servicesQuery,
} from "@/sanity/queries";

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
  const [home, reports, featured, articles, services, topics] = await Promise.all([
    getHome(),
    sanityFetch({ query: latestReportsQuery, params: { limit: 6 }, tags: ["report", "topic"] }),
    sanityFetch({ query: featuredReportQuery, tags: ["report", "topic"] }),
    sanityFetch({ query: latestArticlesQuery, params: { limit: 3 }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: servicesQuery, tags: ["service"] }),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
  ]);

  return (
    <>
      <Hero reports={reports ?? []} content={home} />
      {featured && <FeaturedReport report={featured} />}
      <ServicesStrip services={services ?? []} heading={home?.servicesHeading} />
      <LatestInsights articles={articles ?? []} heading={home?.insightsHeading} />
      <ResearchAreas topics={topics ?? []} heading={home?.areasHeading} />
      <Newsletter heading={home?.newsletterHeading} text={home?.newsletterText} />
    </>
  );
}
