import { createClient, type ClientReturn, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, readToken } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // The CDN is skipped because Next's data cache + tag revalidation handles caching.
  useCdn: false,
  perspective: "published",
});

/** Tags attached to cached fetches; the /api/revalidate webhook invalidates them by document type. */
export type SanityTag = "report" | "article" | "author" | "topic";

type FetchOptions<Q extends string> = {
  query: Q;
  params?: QueryParams;
  tags: SanityTag[];
  /** Time-based fallback in seconds, in case a webhook is missed. */
  revalidate?: number;
};

/**
 * Typed, cached fetch. Results are cached with Next's data cache, tagged by
 * document type, and refreshed either by the webhook or after `revalidate` seconds.
 * Result types come from Sanity TypeGen via the query string.
 * Returns null when Sanity isn't configured so pages still render.
 */
export async function sanityFetch<const Q extends string>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOptions<Q>): Promise<ClientReturn<Q> | null> {
  if (!isSanityConfigured) return null;
  return client
    .withConfig(readToken ? { token: readToken } : {})
    .fetch(query, params, { next: { revalidate, tags } });
}
