import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomePageQueryResult, ReportCardData } from "@/sanity/types";
import { HeroShowcase } from "./HeroShowcase";

type HeroContent = Pick<
  NonNullable<HomePageQueryResult>,
  "eyebrow" | "headline" | "intro" | "primaryCta" | "secondaryCta" | "availability" | "trustFacts"
>;

export function Hero({ reports, content }: { reports: ReportCardData[]; content: HeroContent | null }) {
  const facts = (content?.trustFacts ?? []).filter(Boolean);

  return (
    <section aria-labelledby="hero-title" className="pt-14 pb-10 md:pt-20">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow tone="lavender">{content?.eyebrow || "Research & market intelligence"}</Eyebrow>
        <h1 id="hero-title" className="mt-6 max-w-[15ch] text-[44px] sm:text-6xl lg:text-[80px] lg:leading-[1]">
          <Emphasis text={content?.headline || "Research that turns {blossom} *complex markets* into clear decisions."} />
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-muted">{content?.intro || "[AGENCY POSITIONING]"}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/research" variant="accent" size="lg">
            {content?.primaryCta || "Explore research"}
          </Button>
          <Button href="/contact" variant="soft" size="lg">
            {content?.secondaryCta || "Work with us"}
          </Button>
        </div>

        {content?.availability && (
          <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink-muted">
            <span aria-hidden="true" className="size-2 rounded-full bg-teal ring-4 ring-mint" />
            {content.availability}
          </p>
        )}
        {facts.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[13px] text-ink-muted" aria-label="About Gatio">
            {facts.map((f, i) => (
              <li key={`${f}-${i}`} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                {f}
              </li>
            ))}
          </ul>
        )}
      </Container>

      {reports.length > 0 && <HeroShowcase reports={reports} />}
    </section>
  );
}
