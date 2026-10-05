import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReportCard } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatBlock } from "@/components/ui/StatBlock";
import { TopicTag } from "@/components/ui/TopicTag";
import { COVER_STYLES } from "@/lib/covers";
import { SCENES } from "@/lib/scenes";
import { TOPIC_COLORS } from "@/lib/topics";
import { LiveContent } from "./LiveContent";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// ISR: re-render at most once a minute; webhook tags refresh the data sooner.
export const revalidate = 60;

const COLORS = [
  { name: "deep", hex: "#164258", note: "Brand deep blue-teal" },
  { name: "steel", hex: "#317EA6", note: "Brand steel blue: fills, white text 4.5:1" },
  { name: "fg", hex: "#FFFFFF", note: "Brand white: text, 12.4:1" },
  { name: "bg", hex: "#12384B", note: "Page" },
  { name: "surface", hex: "#164258", note: "Raised bands" },
  { name: "surface-2", hex: "#1B4C64", note: "Panels" },
  { name: "rule", hex: "#2C5D75", note: "Hairlines" },
  { name: "fg-muted", hex: "#C7D6DF", note: "Secondary text, 8.3:1" },
  { name: "fg-faint", hex: "#ADC3CF", note: "Labels, 6.8:1" },
  { name: "gold", hex: "#8CC3E0", note: "Light steel accent text, 6.5:1" },
  { name: "teal", hex: "#6FB5A4", note: "Topic" },
  { name: "plum", hex: "#CF8AA1", note: "Topic" },
] as const;

// Literal class names so Tailwind picks them up.
const SWATCH: Record<string, string> = {
  deep: "bg-deep",
  steel: "bg-steel",
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
  rule: "bg-rule",
  fg: "bg-fg",
  "fg-muted": "bg-fg-muted",
  "fg-faint": "bg-fg-faint",
  gold: "bg-gold",
  teal: "bg-teal",
  plum: "bg-plum",
  mustard: "bg-mustard",
};

export default function StyleguidePage() {
  const topics = Object.keys(TOPIC_COLORS);

  return (
    <>
      <Container className="pt-32 pb-16 md:pt-40">
        <Eyebrow tone="muted">Internal · not linked from the site</Eyebrow>
        <h1 className="mt-5 text-6xl md:text-8xl">
          Gatio <em>styleguide</em>
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-fg-muted">The editorial system in the brand palette: deep blue-teal, steel blue and white, with Cormorant Garamond for display and Jost for text.</p>
      </Container>

      <Section labelledBy="sg-colours">
        <SectionHeading id="sg-colours" eyebrow="Tokens" title="Colour" />
        <ul className="grid grid-cols-2 border-t border-l border-rule sm:grid-cols-3 lg:grid-cols-4">
          {COLORS.map((c) => (
            <li key={c.name} className="border-r border-b border-rule">
              <div className={`h-24 ${SWATCH[c.name]}`} />
              <div className="p-4">
                <p className="label text-gold">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-fg-muted">{c.hex}</p>
                <p className="mt-1 text-sm text-fg-muted">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper" labelledBy="sg-type">
        <SectionHeading id="sg-type" eyebrow="Tokens" title="Type" />
        <div className="flex flex-col gap-8">
          <p className="headline text-7xl md:text-9xl">
            One question. <em>Every angle.</em>
          </p>
          <p className="font-serif text-4xl font-semibold">Cormorant Garamond 600, headlines</p>
          <p className="font-serif text-4xl font-medium text-gold italic">Cormorant Garamond 500 italic, emphasis</p>
          <p className="text-xl font-light">Jost 300: body copy for reports and articles.</p>
          <p className="label text-fg-muted">Jost 400 · 11px · 0.32em tracking · uppercase label</p>
          <p className="outline-numeral text-[120px] leading-none">07</p>
        </div>
      </Section>

      <Section labelledBy="sg-controls">
        <SectionHeading id="sg-controls" eyebrow="Components" title="Controls &amp; labels" />
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="light">Light</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          {topics.map((slug) => (
            <TopicTag key={slug} slug={slug} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {topics.map((slug) => (
            <TopicTag key={slug} slug={slug} variant="solid" />
          ))}
        </div>
        <ArrowLink href="/styleguide#sg-controls" className="mt-10">
          Explore the research
        </ArrowLink>
      </Section>

      <Section tone="paper" labelledBy="sg-art">
        <SectionHeading id="sg-art" eyebrow="Assets" title="Painted scenes &amp; covers" intro="Every image is painted in code (scripts/art). Covers are fine-line SVG driven by cover style and topic colour." />
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Object.entries(SCENES).map(([key, s]) => (
            <li key={key}>
              <div className="relative aspect-[4/5] overflow-hidden border border-rule">
                <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
              </div>
              <p className="label mt-3 text-fg-muted">{key}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {COVER_STYLES.map((style, i) => (
            <li key={style}>
              <div className="aspect-[4/3] overflow-hidden border border-rule">
                <CoverArt coverStyle={style} topicSlug={topics[i % topics.length]} />
              </div>
              <p className="label mt-3 text-fg-muted">
                {style} · {topics[i % topics.length]}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="sg-cards">
        <SectionHeading id="sg-cards" eyebrow="Components" title="Cards &amp; figures" />
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
          <ReportCard title="[SAMPLE] The state of agent banking" href="#" coverStyle="bars" topic={{ slug: "banking", title: "Banking" }} publishedAt="2026-03-12" readTime={12} />
          <ReportCard title="[SAMPLE] Instant payments and the informal economy" href="#" coverStyle="line" topic={{ slug: "payments", title: "Payments" }} publishedAt="2026-02-02" readTime={8} />
          <ReportCard title="[SAMPLE] What young savers want" href="#" coverStyle="rings" topic={{ slug: "consumer", title: "Consumer" }} publishedAt="2026-01-20" readTime={6} />
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4">
          <StatBlock value="00%" label="[SAMPLE STAT] Placeholder" color="accent" boxed />
          <StatBlock value="0.0x" label="[SAMPLE STAT] Placeholder" color="teal" boxed />
          <StatBlock value="₦0bn" label="[SAMPLE STAT] Placeholder" color="plum" boxed />
          <StatBlock value="000" label="[SAMPLE STAT] Placeholder" color="mustard" boxed />
        </div>
      </Section>

      <LiveContent />
    </>
  );
}
