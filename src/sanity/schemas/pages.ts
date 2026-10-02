import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";
import { seoField } from "./shared";

const headline = (name: string, title: string, initialValue: string) =>
  defineField({
    name,
    title,
    type: "string",
    description: "Wrap words in *asterisks* to set them in the accent italic.",
    initialValue,
    validation: (rule) => rule.required().max(120),
  });

const intro = (initialValue: string) =>
  defineField({ name: "intro", type: "text", rows: 3, initialValue, validation: (rule) => rule.max(320) });

export const homePage = defineType({
  name: "homePage",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", type: "string", group: "hero", initialValue: "Research & market intelligence" }),
    { ...headline("headline", "Headline", "Research that turns *complex markets* into clear decisions."), group: "hero" },
    { ...intro("[AGENCY POSITIONING]"), group: "hero" },
    defineField({ name: "primaryCta", title: "Primary button", type: "string", group: "hero", initialValue: "Explore research" }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "string", group: "hero", initialValue: "Work with us" }),
    { ...headline("insightsHeading", "Insights heading", "What we're *thinking about*"), group: "sections" },
    { ...headline("servicesHeading", "Services heading", "How we *help*"), group: "sections" },
    { ...headline("areasHeading", "Research areas heading", "Where we dig *deepest*"), group: "sections" },
    { ...headline("newsletterHeading", "Newsletter heading", "Research worth *opening.*"), group: "sections" },
    defineField({ name: "newsletterText", title: "Newsletter text", type: "text", rows: 2, group: "sections", initialValue: "[NEWSLETTER DESCRIPTION]" }),
    { ...seoField, group: "seo" },
  ],
  preview: { prepare: () => ({ title: "Home" }) },
});

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About",
  type: "document",
  icon: UsersIcon,
  fields: [
    headline("headline", "Headline", "We study markets *up close.*"),
    intro("[AGENCY STORY: one or two sentences]"),
    defineField({ name: "story", type: "simpleText" }),
    defineField({
      name: "values",
      title: "How we work",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(40) }),
            defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.max(240) }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "stats",
      title: "Figures",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", type: "string", validation: (rule) => rule.required().max(12) }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required().max(80) }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    headline("teamHeading", "Team heading", "The *people* behind the work"),
    defineField({
      name: "team",
      type: "array",
      description: "Pick authors to show on the About page.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "author" }] })],
      validation: (rule) => rule.unique(),
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "About" }) },
});

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    headline("headline", "Headline", "Let's talk about *your market.*"),
    intro("[CONTACT INTRO: what to get in touch about]"),
    defineField({
      name: "topics",
      title: "Enquiry types",
      description: "Options in the form's \"What's this about?\" menu.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      initialValue: ["Commission research", "Media enquiry", "Partnership", "Something else"],
    }),
    defineField({
      name: "successMessage",
      title: "Message after sending",
      type: "string",
      initialValue: "Thanks, we'll be in touch soon.",
    }),
    seoField,
  ],
  preview: { prepare: () => ({ title: "Contact" }) },
});
