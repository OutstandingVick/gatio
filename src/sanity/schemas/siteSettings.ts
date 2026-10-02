import { CogIcon } from "@sanity/icons/Cog";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Singleton: site-wide details used by the navbar, footer and contact page. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "contact", title: "Contact" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string", group: "general", initialValue: "Gatio", validation: (rule) => rule.required() }),
    defineField({
      name: "positioning",
      title: "Positioning line",
      description: "One sentence on what the agency does. Shown in the footer and as the default meta description.",
      type: "text",
      rows: 2,
      group: "general",
      initialValue: "[AGENCY POSITIONING]",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "ctaLabel",
      title: "Navbar button label",
      type: "string",
      group: "general",
      initialValue: "Work with us",
      validation: (rule) => rule.max(24),
    }),
    defineField({ name: "email", type: "string", group: "contact", validation: (rule) => rule.email() }),
    defineField({ name: "phone", type: "string", group: "contact" }),
    defineField({ name: "address", type: "text", rows: 3, group: "contact" }),
    defineField({ name: "officeHours", title: "Office hours", type: "string", group: "contact" }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "url", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "copyright", title: "Copyright holder", type: "string", group: "footer", initialValue: "Gatio" }),
  ],
  preview: { prepare: () => ({ title: "Settings" }) },
});
