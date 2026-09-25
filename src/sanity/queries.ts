import { defineQuery } from "next-sanity";

const topicFields = /* groq */ `_id, title, "slug": slug.current, colorKey`;

const reportCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  abstract,
  coverStyle,
  publishedAt,
  featured,
  // Estimated from body length at ~220 words per minute.
  "readTime": round(length(pt::text(body)) / 5 / 220) + 1,
  topic->{ ${topicFields} }
`;

const articleCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverStyle,
  publishedAt,
  readTime,
  featured,
  topic->{ ${topicFields} },
  author->{ name, "slug": slug.current }
`;

export const featuredReportQuery = defineQuery(`
  *[_type == "report" && featured == true && defined(slug.current)]
    | order(publishedAt desc)[0]{ ${reportCardFields}, keyFindings }
`);

export const latestReportsQuery = defineQuery(`
  *[_type == "report" && defined(slug.current)]
    | order(publishedAt desc)[0...$limit]{ ${reportCardFields} }
`);

export const reportBySlugQuery = defineQuery(`
  *[_type == "report" && slug.current == $slug][0]{
    ${reportCardFields},
    authors[]->{ _id, name, "slug": slug.current, role, photo, bio },
    keyFindings,
    body,
    methodology,
    sources,
    "pdfUrl": pdf.asset->url,
    seo,
    isSample
  }
`);

export const reportsByTopicQuery = defineQuery(`
  *[_type == "report" && topic->slug.current == $topic && defined(slug.current)]
    | order(publishedAt desc){ ${reportCardFields} }
`);

export const latestArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)]
    | order(publishedAt desc)[0...$limit]{ ${articleCardFields} }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    ${articleCardFields},
    author->{ _id, name, "slug": slug.current, role, photo, bio },
    body,
    seo,
    isSample
  }
`);

export const allTopicsQuery = defineQuery(`
  *[_type == "topic"] | order(title asc){ ${topicFields}, description }
`);
