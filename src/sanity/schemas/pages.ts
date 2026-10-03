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
    { name: "about", title: "Who we are" },
    { name: "proof", title: "Proof" },
    { name: "sections", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", type: "string", group: "hero", initialValue: "Research & market intelligence" }),
    { ...headline("headline", "Headline", "Research that turns *complex markets* into clear decisions."), group: "hero" },
    { ...intro("[AGENCY POSITIONING]"), group: "hero" },
    defineField({ name: "primaryCta", title: "Primary button", type: "string", group: "hero", initialValue: "Explore research" }),
    defineField({ name: "secondaryCta", title: "Secondary button", type: "string", group: "hero", initialValue: "Work with us" }),
    defineField({
      name: "availability",
      title: "Availability line",
      description: "Short status under the buttons, e.g. \"Taking on new projects for Q1\".",
      type: "string",
      group: "hero",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "trustFacts",
      title: "Trust facts",
      description: "Two to four short facts shown in a row (registration, founding year, locations).",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "marquee",
      title: "Capabilities strip",
      description: "Short words that scroll across the page under the hero.",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.max(12),
    }),
    { ...headline("whoHeading", "Heading", "We turn {blossom} *messy markets* into clear answers."), group: "about" },
    defineField({ name: "whoBody", title: "Text", type: "text", rows: 6, group: "about", initialValue: "[WHO WE ARE: two or three short paragraphs.]" }),
    defineField({ name: "whoQuote", title: "Quote card", type: "text", rows: 3, group: "about", validation: (rule) => rule.max(200) }),
    defineField({ name: "whoQuoteAttribution", title: "Quote attribution", type: "string", group: "about" }),
    defineField({ name: "founderQuote", title: "Founder's note", type: "text", rows: 4, group: "proof", validation: (rule) => rule.max(320) }),
    defineField({ name: "founderName", title: "Founder name", type: "string", group: "proof" }),
    defineField({ name: "founderRole", title: "Founder role", type: "string", group: "proof" }),
    { ...headline("numbersHeading", "Numbers heading", "The *numbers* so far"), group: "proof" },
    defineField({
      name: "numbers",
      type: "array",
      group: "proof",
      of: [
        defineArrayMember({
          type: "object",
          name: "number",
          fields: [
            defineField({ name: "value", type: "string", validation: (rule) => rule.required().max(10) }),
            defineField({ name: "label", type: "string", validation: (rule) => rule.required().max(60) }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    { ...headline("commitmentsHeading", "Commitments heading", "Six things we *never* compromise on"), group: "proof" },
    defineField({
      name: "commitments",
      type: "array",
      group: "proof",
      of: [
        defineArrayMember({
          type: "object",
          name: "commitment",
          fields: [
            defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(40) }),
            defineField({ name: "text", type: "string", validation: (rule) => rule.max(140) }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      validation: (rule) => rule.max(6),
    }),
    { ...headline("statementHeading", "Statement band heading", "We don't sell reports. We sell *decisions.*"), group: "sections" },
    defineField({ name: "statementText", title: "Statement band text", type: "text", rows: 3, group: "sections" }),
    { ...headline("stepsHeading", "How we work heading", "From question {blossom} to *answer*"), group: "sections" },
    defineField({
      name: "steps",
      title: "How we work",
      type: "array",
      group: "sections",
      of: [
        defineArrayMember({
          type: "object",
          name: "step",
          fields: [
            defineField({ name: "label", type: "string", description: "One word, e.g. Scope", validation: (rule) => rule.required().max(20) }),
            defineField({ name: "title", type: "string", validation: (rule) => rule.required().max(60) }),
            defineField({ name: "text", type: "text", rows: 3, validation: (rule) => rule.max(240) }),
          ],
          preview: { select: { title: "label", subtitle: "title" } },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    { ...headline("ctaHeading", "Closing call to action", "Have a question about *your market?*"), group: "sections" },
    defineField({ name: "ctaText", title: "Closing text", type: "text", rows: 2, group: "sections" }),
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
