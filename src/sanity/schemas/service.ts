import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";
import { colorKeyOptions, coverStyleField, isSampleField, seoField, slugField } from "./shared";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(60) }),
    slugField,
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Shown on service cards.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "colorKey",
      title: "Colour",
      type: "string",
      options: { list: colorKeyOptions, layout: "radio", direction: "horizontal" },
      initialValue: "accent",
      validation: (rule) => rule.required(),
    }),
    coverStyleField,
    defineField({
      name: "deliverables",
      title: "What's included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(8),
    }),
    defineField({ name: "body", title: "Details", type: "richText" }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 10,
    }),
    seoField,
    isSampleField,
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "summary" } },
});
