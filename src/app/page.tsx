import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Section labelledBy="home-title" className="md:py-32">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Placeholder · Phase 2
          </p>
          <h1 id="home-title" className="max-w-[18ch] text-5xl md:text-7xl">
            Research on Nigerian fintech, <em>coming soon</em>.
          </h1>
          <p className="mt-6 max-w-[56ch] text-lg text-ink-muted">[AGENCY POSITIONING]</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/styleguide">View the styleguide</Button>
            <Button href="/studio" variant="outline">
              Open the Studio
            </Button>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
