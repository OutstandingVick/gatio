import { ArrowLink } from "@/components/ui/ArrowLink";
import { Blossom } from "@/components/ui/Blossom";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center md:py-32">
      <Eyebrow tone="plum">Error 404</Eyebrow>
      <h1 className="mt-6 max-w-[14ch] text-5xl md:text-7xl">
        This page is <Blossom className="mx-[0.1em]" /> <em>off the map.</em>
      </h1>
      <p className="mt-6 max-w-[46ch] text-lg text-ink-muted">
        The link may be old, or the page may have moved. Try the research library instead.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/research" variant="accent">
          Browse research
        </Button>
        <Button href="/" variant="soft">
          Back to home
        </Button>
      </div>
      <ArrowLink href="/contact" className="mt-8">
        Tell us what you were looking for
      </ArrowLink>
    </Container>
  );
}
