export const reportHref = (slug: string | null | undefined) => `/research/${slug ?? ""}`;
export const articleHref = (slug: string | null | undefined) => `/insights/${slug ?? ""}`;
export const researchTopicHref = (slug: string | null | undefined) =>
  slug ? `/research?topic=${encodeURIComponent(slug)}` : "/research";
