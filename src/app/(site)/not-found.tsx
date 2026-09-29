import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverArt } from "@/components/ui/CoverArt";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
      <div>
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 text-5xl md:text-7xl">
          This page is <em>off the map.</em>
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg text-ink-muted">
          The link may be old, or the report may have moved. Try the research library instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/research">Browse research</Button>
          <Button href="/" variant="outline">
            Back to home
          </Button>
        </div>
      </div>
      <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)]">
        <CoverArt coverStyle="rings" topicSlug="payments" />
      </div>
    </Container>
  );
}
