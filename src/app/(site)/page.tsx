import type { Metadata } from "next";
import { CapabilityCta } from "@/components/sections/home/CapabilityCta";
import { Commitments } from "@/components/sections/home/Commitments";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { FounderNote } from "@/components/sections/home/FounderNote";
import { Hero } from "@/components/sections/home/Hero";
import { HowWeWork } from "@/components/sections/home/HowWeWork";
import { LatestInsights } from "@/components/sections/home/LatestInsights";
import { Marquee } from "@/components/sections/home/Marquee";
import { Numbers } from "@/components/sections/home/Numbers";
import { ServicesGrid } from "@/components/sections/home/ServicesGrid";
import { StatementBand } from "@/components/sections/home/StatementBand";
import { WhoWeAre } from "@/components/sections/home/WhoWeAre";
import { stripEmphasis } from "@/components/ui/Emphasis";
import { sanityFetch } from "@/sanity/client";
import { featuredWorkQuery, homePageQuery, latestArticlesQuery, latestReportsQuery, servicesQuery } from "@/sanity/queries";
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
  const [home, settings, reports, work, articles, services] = await Promise.all([
    getHome(),
    getSettings(),
    sanityFetch({ query: latestReportsQuery, params: { limit: 6 }, tags: ["report", "topic"] }),
    sanityFetch({ query: featuredWorkQuery, params: { limit: 3 }, tags: ["report", "topic", "author"] }),
    sanityFetch({ query: latestArticlesQuery, params: { limit: 3 }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: servicesQuery, tags: ["service"] }),
  ]);

  return (
    <>
      <Hero reports={reports ?? []} content={home} />
      <Marquee items={home?.marquee ?? []} />
      <WhoWeAre heading={home?.whoHeading} body={home?.whoBody} quote={home?.whoQuote} attribution={home?.whoQuoteAttribution} />
      <ServicesGrid services={services ?? []} heading={home?.servicesHeading} footer={<CapabilityCta pdfUrl={settings?.capabilityPdfUrl} />} />
      <FounderNote quote={home?.founderQuote} name={home?.founderName} role={home?.founderRole} />
      <FeaturedWork reports={work ?? []} />
      <Numbers heading={home?.numbersHeading} numbers={home?.numbers ?? []} />
      <Commitments heading={home?.commitmentsHeading} items={home?.commitments ?? []} />
      <StatementBand heading={home?.statementHeading} text={home?.statementText} />
      <HowWeWork heading={home?.stepsHeading} steps={home?.steps ?? []} />
      <LatestInsights articles={articles ?? []} heading={home?.insightsHeading} />
      <FinalCta heading={home?.ctaHeading} text={home?.ctaText} ctaLabel={settings?.ctaLabel} />
    </>
  );
}
