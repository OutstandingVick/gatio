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

/** The featured report, falling back to the latest report. */
export const featuredReportQuery = defineQuery(`
  coalesce(
    *[_type == "report" && featured == true && defined(slug.current)] | order(publishedAt desc)[0],
    *[_type == "report" && defined(slug.current)] | order(publishedAt desc)[0]
  ){ ${reportCardFields}, keyFindings, "pdfUrl": pdf.asset->url }
`);

export const latestReportsQuery = defineQuery(`
  *[_type == "report" && defined(slug.current)]
    | order(publishedAt desc)[0...$limit]{ ${reportCardFields} }
`);

export const reportBySlugQuery = defineQuery(`
  *[_type == "report" && slug.current == $slug][0]{
    ${reportCardFields},
    "topicId": topic._ref,
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
    "topicId": topic._ref,
    author->{ _id, name, "slug": slug.current, role, photo, bio },
    body,
    seo,
    isSample
  }
`);

export const allTopicsQuery = defineQuery(`
  *[_type == "topic"] | order(title asc){ ${topicFields}, description }
`);

/** All reports, newest first, optionally filtered by topic slug (pass null for all). */
export const reportsListQuery = defineQuery(`
  *[_type == "report" && defined(slug.current) && (!defined($topic) || topic->slug.current == $topic)]
    | order(publishedAt desc){ ${reportCardFields} }
`);

/** Other reports on the same topic. */
export const relatedReportsQuery = defineQuery(`
  *[_type == "report" && defined(slug.current) && _id != $id && topic._ref == $topicId]
    | order(publishedAt desc)[0...3]{ ${reportCardFields} }
`);

export const reportSlugsQuery = defineQuery(`
  *[_type == "report" && defined(slug.current)].slug.current
`);

/** All articles, newest first, optionally filtered by topic slug (pass null for all). */
export const articlesListQuery = defineQuery(`
  *[_type == "article" && defined(slug.current) && (!defined($topic) || topic->slug.current == $topic)]
    | order(publishedAt desc){ ${articleCardFields} }
`);

/** Other articles, same topic first, then newest. */
export const relatedArticlesQuery = defineQuery(`
  *[_type == "article" && defined(slug.current) && _id != $id]
    | order(select(topic._ref == $topicId => 1, 0) desc, publishedAt desc)[0...3]{ ${articleCardFields} }
`);

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)].slug.current
`);

const serviceCardFields = /* groq */ `_id, title, "slug": slug.current, summary, colorKey, coverStyle, order, image`;

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName, positioning, ctaLabel, email, phone, address, officeHours, socials[]{ _key, label, url }, copyright,
    "capabilityPdfUrl": capabilityPdf.asset->url
  }
`);

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    eyebrow, headline, intro, primaryCta, secondaryCta, availability, trustFacts, marquee,
    whoHeading, whoBody, whoQuote, whoQuoteAttribution,
    founderQuote, founderName, founderRole,
    numbersHeading, numbers[]{ _key, value, label },
    commitmentsHeading, commitments[]{ _key, title, text },
    statementHeading, statementText,
    stepsHeading, steps[]{ _key, label, title, text },
    ctaHeading, ctaText,
    insightsHeading, servicesHeading, areasHeading, newsletterHeading, newsletterText, seo
  }
`);

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    headline, intro, story, values[]{ _key, title, text }, stats[]{ _key, value, label }, teamHeading,
    team[]->{ _id, name, "slug": slug.current, role, photo, bio },
    seo
  }
`);

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0]{ headline, intro, topics, successMessage, seo }
`);

export const servicesQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc, title asc){ ${serviceCardFields}, deliverables }
`);

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    ${serviceCardFields}, deliverables, body, seo, isSample
  }
`);

export const serviceSlugsQuery = defineQuery(`
  *[_type == "service" && defined(slug.current)].slug.current
`);

/** Latest reports with enough detail for case-study style rows on Home. */
export const featuredWorkQuery = defineQuery(`
  *[_type == "report" && defined(slug.current)] | order(featured desc, publishedAt desc)[0...$limit]{
    ${reportCardFields},
    "authors": authors[]->name,
    "findings": keyFindings[0...2]{ _key, value, label }
  }
`);
