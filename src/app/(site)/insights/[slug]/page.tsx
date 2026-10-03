import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/sections/home/Newsletter";
import { RichText } from "@/components/portable-text/RichText";
import { AuthorBox } from "@/components/sections/detail/AuthorBox";
import { DetailHeader } from "@/components/sections/detail/DetailHeader";
import { RelatedList } from "@/components/sections/detail/RelatedList";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/metadata";
import { articleHref } from "@/lib/routes";
import { topicColor } from "@/lib/topics";
import { sanityFetch } from "@/sanity/client";
import { articleBySlugQuery, articleSlugsQuery, relatedArticlesQuery } from "@/sanity/queries";

const TAGS = ["article", "topic", "author"] as const;

export async function generateStaticParams() {
  const slugs = await sanityFetch({ query: articleSlugsQuery, tags: ["article"] });
  return (slugs ?? []).map((slug) => ({ slug }));
}

async function getArticle(slug: string) {
  return sanityFetch({ query: articleBySlugQuery, params: { slug }, tags: [...TAGS] });
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Insight not found" };
  return buildMetadata({ title: article.title, seo: article.seo, fallbackDescription: article.excerpt }, articleHref(slug));
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related =
    (await sanityFetch({
      query: relatedArticlesQuery,
      params: { id: article._id, topicId: article.topicId ?? "" },
      tags: [...TAGS],
    })) ?? [];

  return (
    <article>
      <DetailHeader
        title={article.title ?? "Untitled"}
        subtitle={article.excerpt}
        topic={article.topic}
        authors={article.author ? [article.author] : []}
        publishedAt={article.publishedAt}
        readTime={article.readTime}
        coverStyle={article.coverStyle}
        back={{ href: "/insights", label: "Insights" }}
        isSample={article.isSample}
      />
      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-[680px]">
          <RichText value={article.body} color={topicColor(article.topic?.slug, article.topic?.colorKey)} />
          <div className="mt-16">
            <AuthorBox authors={article.author ? [article.author] : []} />
          </div>
        </div>
      </Container>
      <Newsletter heading="Get new insights *first.*" text="[NEWSLETTER DESCRIPTION]" />
      <RelatedList
        title="More *insights*"
        items={related.map((a) => ({
          id: a._id,
          title: a.title ?? "Untitled",
          href: articleHref(a.slug),
          coverStyle: a.coverStyle,
          topic: a.topic,
          publishedAt: a.publishedAt,
          readTime: a.readTime,
        }))}
      />
    </article>
  );
}
