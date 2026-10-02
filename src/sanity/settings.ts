import { sanityFetch } from "./client";
import { siteSettingsQuery } from "./queries";

/** Site-wide settings (cached, refreshed with the "siteSettings" tag). */
export function getSettings() {
  return sanityFetch({ query: siteSettingsQuery, tags: ["siteSettings"] });
}
