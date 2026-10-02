import "server-only";
import type { ClientReturn, QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured, readToken } from "./env";

/**
 * Uncached fetch for the admin, so the dashboard always shows the current state.
 * Returns null when Sanity isn't configured.
 */
export async function adminFetch<const Q extends string>(query: Q, params: QueryParams = {}): Promise<ClientReturn<Q> | null> {
  if (!isSanityConfigured) return null;
  return client.withConfig(readToken ? { token: readToken } : {}).fetch(query, params, { cache: "no-store" });
}
