import { defineField, defineType } from "sanity";

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({ name: "quote", type: "text", rows: 3, validation: (rule) => rule.required().max(280) }),
    defineField({ name: "attribution", type: "string" }),
  ],
  preview: {
    select: { title: "quote", subtitle: "attribution" },
    prepare: ({ title, subtitle }) => ({ title: `“${title ?? ""}”`, subtitle }),
  },
});
