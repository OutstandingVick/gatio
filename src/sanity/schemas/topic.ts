import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { colorKeyOptions, slugField } from "./shared";

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    slugField,
    defineField({
      name: "colorKey",
      title: "Colour",
      type: "string",
      description: "payments → accent, banking → teal, consumer → plum, digital-economy → mustard, fintech/markets → ink",
      options: { list: colorKeyOptions, layout: "radio", direction: "horizontal" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(280),
    }),
  ],
  preview: { select: { title: "title", subtitle: "colorKey" } },
});
