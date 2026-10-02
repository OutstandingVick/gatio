/** Deep link that opens a document in the Sanity editor. */
export const studioEditHref = (id: string, type: string) =>
  `/studio/intent/edit/id=${encodeURIComponent(id.replace(/^drafts\./, ""))};type=${type}/`;

/** Deep link that opens a new, empty document of a type in the Sanity editor. */
export const studioCreateHref = (type: string) => `/studio/intent/create/template=${type};type=${type}/`;

export const TYPE_LABEL: Record<string, string> = {
  report: "Report",
  article: "Article",
  service: "Service",
  author: "Author",
  topic: "Topic",
  homePage: "Home page",
  aboutPage: "About page",
  contactPage: "Contact page",
  siteSettings: "Settings",
  "sanity.imageAsset": "Image",
};

/** Where a document appears on the public site, if anywhere. */
export function publicHref(type: string, slug: string | null | undefined): string | null {
  if (type === "report" && slug) return `/research/${slug}`;
  if (type === "article" && slug) return `/insights/${slug}`;
  if (type === "service" && slug) return `/services/${slug}`;
  if (type === "topic" && slug) return `/research?topic=${slug}`;
  if (type === "homePage") return "/";
  if (type === "aboutPage") return "/about";
  if (type === "contactPage") return "/contact";
  return null;
}

export type AdminRow = {
  _id: string;
  _type: string;
  _updatedAt: string;
  title: string | null;
  slug?: string | null;
  featured?: boolean | null;
  isSample?: boolean | null;
  publishedAt?: string | null;
  topic?: { title: string | null; colorKey: string | null } | null;
  people?: Array<string | null> | null;
  count?: number;
};

const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "5 minutes ago", "yesterday", or "12 Sep" for older dates. */
export function updatedLabel(iso: string, now = Date.now()): string {
  const mins = Math.round((Date.parse(iso) - now) / 60000);
  if (Math.abs(mins) < 60) return relative.format(mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return relative.format(hours, "hour");
  const days = Math.round(hours / 24);
  if (Math.abs(days) < 7) return relative.format(days, "day");
  return shortDate.format(new Date(iso));
}

/** Percentage change, or null when there's no baseline. */
export function percentChange(recent: number, previous: number): number | null {
  if (previous === 0) return recent === 0 ? 0 : null;
  return ((recent - previous) / previous) * 100;
}
