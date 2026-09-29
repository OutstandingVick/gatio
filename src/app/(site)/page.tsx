import { FeaturedReport } from "@/components/sections/home/FeaturedReport";
import { Hero } from "@/components/sections/home/Hero";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { Newsletter } from "@/components/sections/home/Newsletter";
import { ResearchAreas } from "@/components/sections/home/ResearchAreas";
import { sanityFetch } from "@/sanity/client";
import { allTopicsQuery, featuredReportQuery, latestArticlesQuery, latestReportsQuery } from "@/sanity/queries";

export default async function HomePage() {
  const [reports, featured, articles, topics] = await Promise.all([
    sanityFetch({ query: latestReportsQuery, params: { limit: 6 }, tags: ["report", "topic"] }),
    sanityFetch({ query: featuredReportQuery, tags: ["report", "topic"] }),
    sanityFetch({ query: latestArticlesQuery, params: { limit: 3 }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
  ]);

  return (
    <>
      <Hero reports={reports ?? []} />
      {featured && <FeaturedReport report={featured} />}
      <LatestInsights articles={articles ?? []} />
      <ResearchAreas topics={topics ?? []} />
      <Newsletter />
    </>
  );
}
