import { ArrowLink } from "@/components/ui/ArrowLink";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center pt-28 pb-20 text-center">
      <p className="outline-numeral text-[140px] leading-none md:text-[220px]" aria-hidden="true">
        404
      </p>
      <p className="label mt-6 text-gold">Page not found</p>
      <h1 className="mt-4 max-w-[16ch] text-5xl md:text-7xl">
        This page is <em>off the map.</em>
      </h1>
      <p className="mt-6 max-w-[46ch] text-lg text-fg-muted">The link may be old, or the page may have moved. Try the research library instead.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button href="/research">Browse research</Button>
        <Button href="/" variant="outline">
          Back to home
        </Button>
      </div>
      <ArrowLink href="/contact" className="mt-10">
        Tell us what you were looking for
      </ArrowLink>
    </Container>
  );
}
