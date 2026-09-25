import { defineArrayMember, defineField, defineType } from "sanity";

export const chart = defineType({
  name: "chart",
  title: "Chart",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: { list: ["bar", "line"], layout: "radio", direction: "horizontal" },
      initialValue: "bar",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "data",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "dataPoint",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "value", type: "number", validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: "label", value: "value" },
            prepare: ({ title, value }) => ({ title, subtitle: String(value ?? "") }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: { title: "title", type: "type" },
    prepare: ({ title, type }) => ({ title, subtitle: `${type ?? "bar"} chart` }),
  },
});
