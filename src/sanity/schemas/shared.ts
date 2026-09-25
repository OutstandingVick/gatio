import { defineField } from "sanity";
import { COLOR_KEYS } from "../../lib/topics";
import { COVER_STYLES } from "../../components/ui/Cover";

export const colorKeyOptions = COLOR_KEYS.map((key) => ({ title: key, value: key }));

export const coverStyleField = defineField({
  name: "coverStyle",
  title: "Cover style",
  type: "string",
  description: "Preset geometric cover, coloured by the topic.",
  options: {
    list: COVER_STYLES.map((s) => ({ title: s[0].toUpperCase() + s.slice(1), value: s })),
    layout: "radio",
    direction: "horizontal",
  },
  initialValue: "bars",
  validation: (rule) => rule.required(),
});

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  // Sanity's default isUnique checks the slug across documents of the same type.
  validation: (rule) => rule.required(),
});

export const seoField = defineField({ name: "seo", title: "SEO", type: "seo" });

export const isSampleField = defineField({
  name: "isSample",
  title: "Sample content",
  type: "boolean",
  description: "Marks demo content so it can be filtered out before launch.",
  initialValue: true,
});

export const featuredField = defineField({
  name: "featured",
  title: "Featured",
  type: "boolean",
  initialValue: false,
});

export const publishedAtField = defineField({
  name: "publishedAt",
  title: "Published at",
  type: "datetime",
  initialValue: () => new Date().toISOString(),
  validation: (rule) => rule.required(),
});
