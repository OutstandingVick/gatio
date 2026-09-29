import type { PullQuote as PullQuoteData } from "@/sanity/types";

/** Large italic quote with a short accent rule above. */
export function PullQuote({ value }: { value: PullQuoteData }) {
  if (!value.quote) return null;
  return (
    <figure className="my-14">
      <div aria-hidden="true" className="mb-6 h-[3px] w-16 bg-accent" />
      <blockquote className="font-display text-3xl leading-[1.2] tracking-[-0.02em] italic md:text-4xl">
        <p>&ldquo;{value.quote}&rdquo;</p>
      </blockquote>
      {value.attribution && <figcaption className="mt-5 text-sm text-ink-muted">— {value.attribution}</figcaption>}
    </figure>
  );
}
