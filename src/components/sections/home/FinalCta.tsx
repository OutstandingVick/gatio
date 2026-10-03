import { Blossom } from "@/components/ui/Blossom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";

export function FinalCta({ heading, text, ctaLabel }: { heading?: string | null; text?: string | null; ctaLabel?: string | null }) {
  return (
    <section aria-labelledby="cta-title" className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-accent px-6 py-16 text-center text-white md:px-16 md:py-24">
          <Blossom color="var(--lime)" className="absolute top-8 left-8 size-12 md:size-16" />
          <Blossom color="var(--blush)" petals={6} className="absolute right-10 bottom-10 size-10 md:size-14" />
          <p className="text-sm font-bold text-white/80">Let&rsquo;s work together</p>
          <h2 id="cta-title" className="mx-auto mt-4 max-w-[16ch] text-[40px] md:text-[64px] [&_em]:text-lime">
            <Emphasis text={heading || "Have a question about *your market?*"} blossomColor="var(--lime)" />
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-lg text-white/85">{text || "[CTA TEXT]"}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="light" size="lg">
              {ctaLabel || "Work with us"}
            </Button>
            <Button href="/research" size="lg">
              Browse research
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
