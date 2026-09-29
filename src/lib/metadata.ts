import type { Metadata } from "next";

type SeoSource = {
  title: string | null;
  seo: { title?: string; description?: string } | null;
  fallbackDescription: string | null;
};

/** Page metadata from the `seo` field, falling back to title and abstract/excerpt. */
export function buildMetadata({ title, seo, fallbackDescription }: SeoSource, path: string): Metadata {
  const metaTitle = seo?.title || title || "Gatio";
  const description = seo?.description || fallbackDescription || undefined;
  return {
    title: metaTitle,
    description,
    alternates: { canonical: path },
    openGraph: { title: metaTitle, description, type: "article", url: path },
  };
}
