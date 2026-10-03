import { Blossom } from "@/components/ui/Blossom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Emphasis } from "@/components/ui/Emphasis";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function StatementBand({ heading, text }: { heading?: string | null; text?: string | null }) {
  return (
    <section aria-labelledby="statement-title" className="relative mx-2 overflow-hidden rounded-[32px] bg-ink py-20 text-white md:mx-3 md:rounded-[48px] md:py-32">
      <Blossom color="var(--plum)" className="absolute -top-10 -left-10 size-40 opacity-90 md:size-56" />
      <Blossom color="var(--accent)" petals={6} className="absolute -right-12 -bottom-12 size-44 md:size-64" />
      <Container className="relative flex flex-col items-center text-center">
        <Eyebrow tone="dark">The measure of the work</Eyebrow>
        <h2 id="statement-title" className="mt-6 max-w-[16ch] text-[40px] md:text-7xl [&_em]:text-lime">
          <Emphasis text={heading || "We don't sell reports. We sell *decisions.*"} blossomColor="var(--lime)" />
        </h2>
        {text && <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-white/75">{text}</p>}
        <Button href="/research" variant="light" size="lg" className="mt-10">
          See the research
        </Button>
      </Container>
    </section>
  );
}
