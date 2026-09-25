import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";
import {
  coverStyleField,
  featuredField,
  isSampleField,
  publishedAtField,
  seoField,
  slugField,
} from "./shared";

export const report = defineType({
  name: "report",
  title: "Report",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Meta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (rule) => rule.required().max(120) }),
    { ...slugField, group: "content" },
    defineField({ name: "subtitle", type: "string", group: "content", validation: (rule) => rule.max(160) }),
    defineField({
      name: "abstract",
      type: "text",
      rows: 5,
      group: "content",
      validation: (rule) => rule.required().min(80).max(600),
    }),
    { ...coverStyleField, group: "meta" },
    defineField({
      name: "topic",
      type: "reference",
      to: [{ type: "topic" }],
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      type: "array",
      group: "meta",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    { ...publishedAtField, group: "meta" },
    { ...featuredField, group: "meta" },
    defineField({
      name: "keyFindings",
      title: "Key findings",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "finding",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 62%", validation: (rule) => rule.required().max(12) }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required().max(120) }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({ name: "body", type: "richText", group: "content" }),
    defineField({ name: "methodology", type: "simpleText", group: "content" }),
    defineField({
      name: "sources",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "source",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "pdf", title: "PDF", type: "file", group: "meta", options: { accept: "application/pdf" } }),
    { ...seoField, group: "seo" },
    { ...isSampleField, group: "meta" },
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", topic: "topic.title", featured: "featured" },
    prepare: ({ title, topic, featured }) => ({
      title,
      subtitle: [featured ? "★ Featured" : null, topic].filter(Boolean).join(" · "),
    }),
  },
});
