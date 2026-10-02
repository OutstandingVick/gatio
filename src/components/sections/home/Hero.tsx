import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Emphasis } from "@/components/ui/Emphasis";
import type { HomePageQueryResult, ReportCardData } from "@/sanity/types";
import { ReportFan } from "./ReportFan";

type HeroContent = Pick<NonNullable<HomePageQueryResult>, "eyebrow" | "headline" | "intro" | "primaryCta" | "secondaryCta">;

export function Hero({ reports, content }: { reports: ReportCardData[]; content: HeroContent | null }) {
  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-12 md:pt-24">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow tone="teal">{content?.eyebrow || "Research & market intelligence"}</Eyebrow>
        <h1 id="hero-title" className="mt-6 max-w-[16ch] text-5xl sm:text-6xl lg:text-[88px] lg:leading-[1.02]">
          <Emphasis text={content?.headline || "Research that turns *complex markets* into clear decisions."} />
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-ink-muted">{content?.intro || "[AGENCY POSITIONING]"}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/research">{content?.primaryCta || "Explore research"}</Button>
          <Button href="/contact" variant="outline">
            {content?.secondaryCta || "Work with us"}
          </Button>
        </div>
      </Container>

      {reports.length > 0 && (
        <Container className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-[var(--radius-panel)] bg-sand px-5 pt-6 xl:px-10 xl:pt-10">
            <ReportFan reports={reports} />
          </div>
        </Container>
      )}
    </section>
  );
}
