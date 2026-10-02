import { defineQuery } from "next-sanity";

/** Document types shown in the admin. */
export const CONTENT_TYPES = ["report", "article", "service", "author", "topic", "homePage", "aboutPage", "contactPage", "siteSettings"];

export const adminStatsQuery = defineQuery(`{
  "reports": {
    "total": count(*[_type == "report"]),
    "recent": count(*[_type == "report" && _createdAt > $since]),
    "previous": count(*[_type == "report" && _createdAt > $prevSince && _createdAt <= $since])
  },
  "articles": {
    "total": count(*[_type == "article"]),
    "recent": count(*[_type == "article" && _createdAt > $since]),
    "previous": count(*[_type == "article" && _createdAt > $prevSince && _createdAt <= $since])
  },
  "services": {
    "total": count(*[_type == "service"]),
    "recent": count(*[_type == "service" && _createdAt > $since]),
    "previous": count(*[_type == "service" && _createdAt > $prevSince && _createdAt <= $since])
  },
  "images": {
    "total": count(*[_type == "sanity.imageAsset"]),
    "recent": count(*[_type == "sanity.imageAsset" && _createdAt > $since]),
    "previous": count(*[_type == "sanity.imageAsset" && _createdAt > $prevSince && _createdAt <= $since])
  }
}`);

/** Every create/update in the window, bucketed by day on the client. */
export const adminActivityQuery = defineQuery(`
  *[_type in ["report", "article", "service", "author", "topic", "homePage", "aboutPage", "contactPage", "siteSettings", "sanity.imageAsset"] && _updatedAt > $since]{ _type, _updatedAt }
`);

export const adminTopicBreakdownQuery = defineQuery(`
  *[_type == "topic"]{
    _id, title, colorKey,
    "reports": count(*[_type == "report" && references(^._id)]),
    "articles": count(*[_type == "article" && references(^._id)])
  } | order((reports + articles) desc, title asc)
`);

const rowFields = /* groq */ `
  _id, _type, _updatedAt, _createdAt,
  "title": coalesce(title, name),
  "slug": slug.current,
  featured, isSample, publishedAt,
  "topic": topic->{ title, colorKey },
  "people": coalesce(authors[]->name, [author->name])
`;

export const adminRecentQuery = defineQuery(`
  *[_type in ["report", "article", "service", "author", "topic"]] | order(_updatedAt desc)[0...$limit]{ ${rowFields} }
`);

export const adminListQuery = defineQuery(`
  *[_type == $type] | order(_updatedAt desc){ ${rowFields}, "count": count(*[references(^._id)]) }
`);

export const adminMediaQuery = defineQuery(`
  *[_type == "sanity.imageAsset"] | order(_createdAt desc){
    _id, url, originalFilename, size, extension, _createdAt,
    "width": metadata.dimensions.width, "height": metadata.dimensions.height,
    "usedBy": count(*[references(^._id)])
  }
`);

export const adminPagesQuery = defineQuery(`
  *[_id in ["homePage", "aboutPage", "contactPage", "siteSettings"]]{ _id, _type, _updatedAt }
`);

export const adminSearchQuery = defineQuery(`
  *[_type in ["report", "article", "service", "author", "topic"] && [coalesce(title, name), pt::text(body), summary, excerpt, abstract] match $q]
    | order(_updatedAt desc)[0...30]{ ${rowFields} }
`);
