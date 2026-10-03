import type { PullQuote as PullQuoteData } from "@/sanity/types";

/** Large italic serif quote between hairlines, with gold quotation marks. */
export function PullQuote({ value }: { value: PullQuoteData }) {
  if (!value.quote) return null;
  return (
    <figure className="my-16 border-y border-rule py-12 text-center">
      <blockquote className="font-serif text-3xl leading-snug font-medium italic md:text-[40px]">
        <p>
          <span aria-hidden="true" className="text-gold">
            &ldquo;
          </span>
          {value.quote}
          <span aria-hidden="true" className="text-gold">
            &rdquo;
          </span>
        </p>
      </blockquote>
      {value.attribution && <figcaption className="label mt-6 text-gold">{value.attribution}</figcaption>}
    </figure>
  );
}
