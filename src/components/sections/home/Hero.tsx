import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReportCardData } from "@/sanity/types";
import { ReportFan } from "./ReportFan";

export function Hero({ reports }: { reports: ReportCardData[] }) {
  return (
    <section aria-labelledby="hero-title" className="pt-16 pb-12 md:pt-24">
      <Container className="flex flex-col items-center text-center">
        <Eyebrow tone="teal">Research &amp; market intelligence</Eyebrow>
        <h1 id="hero-title" className="mt-6 max-w-[16ch] text-5xl sm:text-6xl lg:text-[88px] lg:leading-[1.02]">
          Research that turns <em>complex markets</em> into clear decisions.
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg text-ink-muted">[AGENCY POSITIONING]</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/research">Explore research</Button>
          <Button href="/contact" variant="outline">
            Work with us
          </Button>
        </div>
      </Container>

      {reports.length > 0 && (
        <Container className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-[var(--radius-panel)] bg-sand px-5 pt-6 lg:px-10 lg:pt-10">
            <ReportFan reports={reports} />
          </div>
        </Container>
      )}
    </section>
  );
}
