import { defineArrayMember, defineField, defineType } from "sanity";

const block = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "Heading 2", value: "h2" },
    { title: "Heading 3", value: "h3" },
    { title: "Quote", value: "blockquote" },
  ],
  marks: {
    annotations: [
      {
        name: "link",
        type: "object",
        title: "Link",
        fields: [defineField({ name: "href", type: "url", validation: (rule) => rule.required() })],
      },
    ],
  },
});

const image = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      validation: (rule) => rule.required().warning("Alt text is needed for accessibility."),
    }),
    defineField({ name: "caption", type: "string" }),
  ],
});

/** Rich body: text, images, pull quotes and charts. */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [block, image, defineArrayMember({ type: "pullQuote" }), defineArrayMember({ type: "chart" })],
});

/** Plain prose: text only. */
export const simpleText = defineType({
  name: "simpleText",
  title: "Simple text",
  type: "array",
  of: [block],
});
