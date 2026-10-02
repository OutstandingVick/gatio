import { Fragment } from "react";

/**
 * Render a CMS headline, turning `*words*` into `<em>` (the accent italic).
 * Unpaired asterisks are left as typed.
 */
export function Emphasis({ text }: { text: string | null | undefined }) {
  if (!text) return null;
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        /^\*[^*]+\*$/.test(part) ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** Plain-text version of a CMS headline, for metadata. */
export function stripEmphasis(text: string | null | undefined): string {
  return (text ?? "").replace(/\*([^*]+)\*/g, "$1");
}
