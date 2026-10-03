# Gatio

A spec demo of a research agency website with a CMS. Gatio publishes research reports and insight articles, using Nigerian fintech as the sample subject.

**Stack:** Next.js (App Router, TypeScript) · Tailwind CSS v4 · Sanity Studio embedded at `/studio` · `next-sanity` · Vercel · pnpm

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: hero and report showcase, capabilities strip, who we are, services, founder's note, recent research, numbers, commitments, statement band, how we work, insights, closing call to action. Every section's copy is in **Pages → Home**. |
| `/research` | Research listing, filterable by `?topic=slug` |
| `/research/[slug]` | Research detail: findings, charts, pull quotes, contents rail, methodology, sources, related |
| `/insights` | Insights listing, filterable by `?topic=slug` |
| `/insights/[slug]` | Insight detail |
| `/about` | About: story, figures, values and team |
| `/services` | Services listing |
| `/services/[slug]` | Service detail with what's included |
| `/contact` | Contact details and a demo form (validates, sends nothing) |
| `/styleguide` | Temporary: every token and component, plus a live Sanity content test section |
| `/admin` | Admin dashboard (overview, pages, posts, media, services, settings, users) |
| `/studio` | Embedded Sanity Studio, where content is edited |
| `/api/revalidate` | Sanity webhook target for tag-based revalidation |

## Environment setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create a Sanity project (skip this if you already have one):

   ```bash
   pnpm dlx sanity@latest init --bare
   ```

   Note the project ID and dataset it prints. You can also create a project at [sanity.io/manage](https://www.sanity.io/manage).

3. Copy the example env file and fill it in:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Notes |
   | --- | --- |
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | From sanity.io/manage |
   | `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | A date, e.g. `2025-09-01` |
   | `SANITY_API_READ_TOKEN` | Viewer token (API → Tokens). Server-only; needed for private datasets |
   | `SANITY_REVALIDATE_SECRET` | Any random string, shared with the webhook below |

4. In sanity.io/manage → **API → CORS origins**, add `http://localhost:3000` (and your Vercel URL) with **Allow credentials** ticked. Without this the Studio can't log in.

## Running

```bash
pnpm dev        # http://localhost:3000
pnpm build      # production build + type check
pnpm lint
pnpm typegen    # regenerate query types after changing schemas or queries
```

## The admin dashboard (`/admin`)

A dark dashboard showing live Sanity content. It doesn't cache, so it always shows the current state.

| Screen | What it shows |
| --- | --- |
| **Overview** | Counts for reports, articles, services and images (with 30-day change), publishing activity per day (7/30/90 days), content by topic, recently edited items |
| **Pages** | Home, About and Contact, each with Edit and View |
| **Reports / Articles / Services** | Tables with topic, status (Featured, Sample, Published), author and last update |
| **Media** | Every uploaded image with size and usage |
| **Authors / Topics** | Library tables with how often each is used |
| **Settings** | Site-wide details at a glance |
| **Users** | Roles, with a link to manage people in Sanity |
| **Search** | Search across all content from the top bar |

**Edit** and **Create new** open the document in the Studio (below), where content is actually written and published.

The dashboard only reads published content, which is public anyway. Editing still requires signing in to Sanity. If the dashboard itself should be private, add a login (e.g. Vercel password protection or middleware) before sharing the URL.

## The editor (Sanity Studio, `/studio`)

Open `/studio` and sign in with your Sanity account. It has:

| Section | What it holds |
| --- | --- |
| **Dashboard** | Content counts, recently edited documents, quick "new" buttons, links to the website and to user management |
| **Content → Pages** | Home, About and Contact page copy (one document each) |
| **Content → Posts** | Reports, Articles, Authors, Topics |
| **Content → Services** | Services, ordered by "Display order" |
| **Content → Settings** | Site name, positioning line, navbar button, contact details, social links, copyright |
| **Media** | Library of every uploaded image, with search and tagging |
| **Users** | Managed in Sanity at sanity.io/manage (linked from the Dashboard) |

In page headlines, wrap words in `*asterisks*` to set them in the brand emphasis colour, and type `{blossom}` to drop in the flower ornament, e.g. `Research that turns {blossom} *complex markets* into clear decisions.`

Reports and articles reference topics and authors, so create those first. All demo documents have **Sample content** ticked, which shows a note on their detail pages.

## Content updates without a redeploy

Queries go through `sanityFetch` (`src/sanity/client.ts`), which caches each result in Next's data cache under tags named after the document type (`report`, `article`, `author`, `topic`).

- **Time-based fallback:** cached data refreshes at most every 60 seconds.
- **On publish (recommended):** in sanity.io/manage → **API → Webhooks**, add a webhook:
  - URL: `https://<your-domain>/api/revalidate`
  - Trigger on: Create, Update, Delete
  - Projection: `{_type}`
  - Secret: the same value as `SANITY_REVALIDATE_SECRET`

## Writing reports

The report body supports headings (H2/H3 feed the contents rail), lists, links, images with captions, **pull quotes** and **charts** (bar or line, from a list of label/value pairs). Charts are drawn as SVG in the topic colour and include a hidden data table for screen readers.

Documents with **Sample content** ticked show a "Sample content for demonstration" note on their detail page.

## Types

Query result types are generated by Sanity TypeGen into `src/sanity/types.generated.ts`. Import them from `src/sanity/types.ts`. Run `pnpm typegen` after editing schemas or queries.

## Project structure

```
src/
  app/                 routes (/, /styleguide, /studio, /api/revalidate)
  components/ui/       Navbar, Footer, Button, TopicTag, ReportCard, StatBlock, CoverArt, SampleBadge, …
  components/sections/ home, listing and detail page sections
  components/portable-text/ body renderers: RichText, Chart, PullQuote
  sanity/              env, client, queries, image helper, schemas, desk structure, generated types
  lib/                 utilities (cn, dates, topic colours, cover styles)
sanity.config.ts       Studio config
sanity.cli.ts          CLI + TypeGen config
```

## Design

The look follows PiggyVest's style: Plus Jakarta Sans at 800 for headlines, a cool grey page with white cards, navy bands with large rounded corners, a royal-blue main action and pastel accents (lime, lavender, mint, blush, butter, sky). Section order follows the A&A Tech site structure.

Load the placeholder Home content into a fresh dataset with the seed in `scripts/seed/`.

## Design notes

- Tokens live as CSS variables in `src/app/globals.css` and are mapped into the Tailwind theme (`bg-cream`, `text-ink`, `bg-topic-payments`, …).
- Covers are geometric SVGs (`CoverArt.tsx`) driven by `coverStyle` and topic colour. No stock photography.
- Agency copy uses bracketed placeholders such as `[AGENCY POSITIONING]` until real copy is supplied.
