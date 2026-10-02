import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { author } from "./author";
import { chart } from "./objects/chart";
import { richText, simpleText } from "./objects/portableText";
import { pullQuote } from "./objects/pullQuote";
import { seo } from "./objects/seo";
import { report } from "./report";
import { aboutPage, contactPage, homePage } from "./pages";
import { service } from "./service";
import { siteSettings } from "./siteSettings";
import { topic } from "./topic";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  homePage,
  aboutPage,
  contactPage,
  siteSettings,
  // Documents
  report,
  article,
  service,
  author,
  topic,
  // Objects
  seo,
  pullQuote,
  chart,
  richText,
  simpleText,
];
