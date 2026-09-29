import type { Metadata } from "next";
import { ListingGrid } from "@/components/sections/listing/ListingGrid";
import { TopicFilter } from "@/components/sections/listing/TopicFilter";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { reportHref } from "@/lib/routes";
import { firstParam } from "@/lib/searchParams";
import { sanityFetch } from "@/sanity/client";
import { allTopicsQuery, reportsListQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Research",
  description: "[DESCRIPTION]",
};

export default async function ResearchPage({ searchParams }: PageProps<"/research">) {
  const topic = firstParam((await searchParams).topic);
  const [reports, topics] = await Promise.all([
    sanityFetch({ query: reportsListQuery, params: { topic }, tags: ["report", "topic"] }),
    sanityFetch({ query: allTopicsQuery, tags: ["topic"] }),
  ]);
  const activeTopic = topics?.find((t) => t.slug === topic) ?? null;

  return (
    <>
      <PageHeader title="Research" description="[DESCRIPTION]" />
      <Container className="flex flex-col gap-10 py-10 md:py-14">
        <TopicFilter topics={topics ?? []} active={activeTopic?.slug ?? null} basePath="/research" />
        <ListingGrid
          noun="reports"
          basePath="/research"
          emptyTopic={activeTopic?.title ?? topic}
          items={(reports ?? []).map((r) => ({
            id: r._id,
            title: r.title ?? "Untitled",
            href: reportHref(r.slug),
            coverStyle: r.coverStyle,
            topic: r.topic,
            publishedAt: r.publishedAt,
            readTime: r.readTime,
          }))}
        />
      </Container>
    </>
  );
}
