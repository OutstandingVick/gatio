import type { Metadata } from "next";
import { Newsletter } from "@/components/sections/home/Newsletter";
import { ListingGrid } from "@/components/sections/listing/ListingGrid";
import { TopicFilter } from "@/components/sections/listing/TopicFilter";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { articleHref } from "@/lib/routes";
import { firstParam } from "@/lib/searchParams";
import { sanityFetch } from "@/sanity/client";
import { allTopicsQuery, articlesListQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Insights",
  description: "[DESCRIPTION]",
};

export default async function InsightsPage({ searchParams }: PageProps<"/insights">) {
  const topic = firstParam((await searchParams).topic);
  const [articles, topics] = await Promise.all([
    sanityFetch({ query: articlesListQuery, params: { topic }, tags: ["article", "topic", "author"] }),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
  ]);
  const activeTopic = topics?.find((t) => t.slug === topic) ?? null;

  return (
    <>
      <PageHeader eyebrow="Insights" eyebrowTone="lavender" title="Notes from {blossom} *the field.*" description="[INSIGHTS DESCRIPTION: shorter pieces on what the team is seeing.]" />
      <Container className="flex flex-col gap-10 pb-10 md:pb-14">
        <TopicFilter topics={topics ?? []} active={activeTopic?.slug ?? null} basePath="/insights" />
        <ListingGrid
          noun="insights"
          basePath="/insights"
          emptyTopic={activeTopic?.title ?? topic}
          items={(articles ?? []).map((a) => ({
            id: a._id,
            title: a.title ?? "Untitled",
            href: articleHref(a.slug),
            coverStyle: a.coverStyle,
            topic: a.topic,
            publishedAt: a.publishedAt,
            readTime: a.readTime,
          }))}
        />
      </Container>
      <Newsletter heading="Get new insights *first.*" text="[NEWSLETTER DESCRIPTION]" />
    </>
  );
}
