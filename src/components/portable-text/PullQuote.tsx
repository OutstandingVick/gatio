import { Blossom } from "@/components/ui/Blossom";
import type { PullQuote as PullQuoteData } from "@/sanity/types";

/** Bold pull quote on a pastel card, with a blossom marker. */
export function PullQuote({ value }: { value: PullQuoteData }) {
  if (!value.quote) return null;
  return (
    <figure className="my-12 rounded-[var(--radius-card)] bg-lavender p-8 md:p-10">
      <Blossom color="var(--accent)" className="mb-5 size-9" />
      <blockquote className="text-2xl leading-[1.25] font-extrabold tracking-[-0.03em] md:text-[30px]">
        <p>&ldquo;{value.quote}&rdquo;</p>
      </blockquote>
      {value.attribution && <figcaption className="mt-5 text-sm font-semibold text-ink-muted">{value.attribution}</figcaption>}
    </figure>
  );
}
