import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  coverStyleField,
  featuredField,
  isSampleField,
  publishedAtField,
  seoField,
  slugField,
} from "./shared";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(120) }),
    slugField,
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(40).max(240),
    }),
    defineField({
      name: "topic",
      type: "reference",
      to: [{ type: "topic" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    coverStyleField,
    publishedAtField,
    defineField({
      name: "readTime",
      title: "Read time (minutes)",
      type: "number",
      validation: (rule) => rule.required().integer().min(1).max(120),
    }),
    featuredField,
    defineField({ name: "body", type: "richText" }),
    seoField,
    isSampleField,
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", topic: "topic.title", author: "author.name" },
    prepare: ({ title, topic, author }) => ({ title, subtitle: [topic, author].filter(Boolean).join(" · ") }),
  },
});
