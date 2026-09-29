import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { ReportCard } from "@/components/ui/ReportCard";
import { Section } from "@/components/ui/Section";
import { StatBlock } from "@/components/ui/StatBlock";
import { TopicTag } from "@/components/ui/TopicTag";
import { COVER_STYLES } from "@/lib/covers";
import { TOPIC_COLORS } from "@/lib/topics";
import { LiveContent } from "./LiveContent";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

// ISR: re-render at most once a minute; webhook tags refresh the data sooner.
export const revalidate = 60;

const COLORS = [
  { name: "cream", hex: "#F6F1E7", note: "Page background", dark: false },
  { name: "paper", hex: "#FFFDF8", note: "Raised surfaces", dark: false },
  { name: "sand", hex: "#EDE5D4", note: "Panels", dark: false },
  { name: "line", hex: "#DDD3C0", note: "Borders", dark: false },
  { name: "ink", hex: "#14213D", note: "Primary text, dark sections", dark: true },
  { name: "ink-muted", hex: "#3A4460", note: "Secondary text", dark: true },
  { name: "accent", hex: "#C2410C", note: "Primary accent", dark: true },
  { name: "teal", hex: "#0B6B6A", note: "Secondary", dark: true },
  { name: "plum", hex: "#6B2D5C", note: "Secondary", dark: true },
  { name: "mustard", hex: "#E9B949", note: "Dark text only; as text use #8A5A00", dark: false },
] as const;

// Literal class names so Tailwind picks them up.
const SWATCH_BG: Record<string, string> = {
  cream: "bg-cream",
  paper: "bg-paper",
  sand: "bg-sand",
  line: "bg-line",
  ink: "bg-ink",
  "ink-muted": "bg-ink-muted",
  accent: "bg-accent",
  teal: "bg-teal",
  plum: "bg-plum",
  mustard: "bg-mustard",
};

const TOPIC_BG: Record<string, string> = {
  payments: "bg-topic-payments",
  banking: "bg-topic-banking",
  consumer: "bg-topic-consumer",
  "digital-economy": "bg-topic-digital-economy",
  fintech: "bg-topic-fintech",
  markets: "bg-topic-markets",
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-10 border-b border-line pb-4 text-3xl md:text-4xl">
      {children}
    </h2>
  );
}

export default function StyleguidePage() {
  const topics = Object.keys(TOPIC_COLORS);

  return (
    <>
        <Container className="py-16 md:py-24">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Internal · temporary</p>
          <h1 className="text-5xl md:text-7xl">
            Gatio <em>styleguide</em>
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg text-ink-muted">
            Design tokens and shared components for checking the Phase 2 foundation.
          </p>
        </Container>

        <Section tone="paper" labelledBy="sg-colours">
          <SectionTitle id="sg-colours">Colours</SectionTitle>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {COLORS.map((c) => (
              <li key={c.name} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
                <div className={`flex h-28 items-end p-3 ${SWATCH_BG[c.name]} ${c.dark ? "text-paper" : "text-ink"}`}>
                  <span className="font-display text-2xl">Aa</span>
                </div>
                <div className="p-3 text-sm">
                  <p className="font-semibold">{c.name}</p>
                  <p className="font-mono text-xs text-ink-muted">{c.hex}</p>
                  <p className="mt-1 text-xs text-ink-muted">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-14 mb-6 text-2xl">Topic colours</h3>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {topics.map((slug) => (
              <li key={slug} className="flex flex-col gap-3">
                <div className={`h-16 rounded-[var(--radius-card)] ${TOPIC_BG[slug]}`} />
                <p className="text-sm">
                  <code className="text-xs">bg-topic-{slug}</code>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section labelledBy="sg-type">
          <SectionTitle id="sg-type">Typography</SectionTitle>
          <div className="flex flex-col gap-8">
            <p className="headline text-6xl md:text-8xl">
              Money moves <em>faster</em> now.
            </p>
            <p className="headline text-4xl md:text-5xl">Fraunces display, 400, tracking −0.025em</p>
            <p className="font-display text-3xl font-semibold tracking-[-0.02em]">Fraunces 600 for emphasis</p>
            <p className="font-display text-3xl italic">Fraunces italic</p>
            <div className="grid gap-4 md:grid-cols-3">
              <p className="text-lg">Instrument Sans 400. Body copy for reports and articles.</p>
              <p className="text-lg font-medium">Instrument Sans 500. Labels and navigation.</p>
              <p className="text-lg font-semibold">Instrument Sans 600. Strong emphasis.</p>
            </div>
            <p className="text-ink-muted">Secondary text in ink-muted.</p>
          </div>
        </Section>

        <Section tone="sand" labelledBy="sg-buttons" className="rounded-[var(--radius-panel)]">
          <SectionTitle id="sg-buttons">Buttons &amp; tags</SectionTitle>
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button href="/styleguide#sg-buttons" variant="primary">
              Link button
            </Button>
            <Button size="lg" variant="accent">
              Large
            </Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            {topics.map((slug) => (
              <TopicTag key={slug} slug={slug} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {topics.map((slug) => (
              <TopicTag key={slug} slug={slug} variant="solid" />
            ))}
          </div>
        </Section>

        <Section labelledBy="sg-covers">
          <SectionTitle id="sg-covers">Covers</SectionTitle>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {COVER_STYLES.map((style, i) => (
              <li key={style}>
                <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)]">
                  <CoverArt coverStyle={style} topicSlug={topics[i % topics.length]} />
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  {style} · {topics[i % topics.length]}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section tone="paper" labelledBy="sg-cards">
          <SectionTitle id="sg-cards">Report cards</SectionTitle>
          <div className="grid gap-6 md:grid-cols-3">
            <ReportCard
              title="[SAMPLE] The state of agent banking"
              href="#"
              coverStyle="bars"
              topic={{ slug: "banking", title: "Banking" }}
              publishedAt="2026-03-12"
              readTime={12}
            />
            <ReportCard
              title="[SAMPLE] Instant payments and the informal economy"
              href="#"
              coverStyle="line"
              topic={{ slug: "payments", title: "Payments" }}
              publishedAt="2026-02-02"
              readTime={8}
            />
            <ReportCard
              title="[SAMPLE] What young savers want"
              href="#"
              coverStyle="rings"
              topic={{ slug: "digital-economy", title: "Digital economy" }}
              publishedAt="2026-01-20"
              readTime={6}
            />
          </div>
        </Section>

        <Section tone="ink" labelledBy="sg-stats">
          <h2 id="sg-stats" className="mb-10 border-b border-cream/20 pb-4 text-3xl md:text-4xl">
            Stat blocks
          </h2>
          <div className="grid gap-8 rounded-[var(--radius-panel)] bg-cream p-8 text-ink sm:grid-cols-2 lg:grid-cols-4">
            <StatBlock value="00%" label="[SAMPLE STAT] Placeholder label" color="accent" />
            <StatBlock value="0.0x" label="[SAMPLE STAT] Placeholder label" color="teal" />
            <StatBlock value="₦0bn" label="[SAMPLE STAT] Placeholder label" color="plum" />
            <StatBlock value="000" label="[SAMPLE STAT] Placeholder label" color="mustard" />
          </div>
        </Section>

        <LiveContent />
    </>
  );
}
