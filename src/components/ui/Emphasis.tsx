import { Fragment } from "react";

/**
 * Render a CMS headline: `*words*` become `<em>` (gold italic). The legacy
 * `{blossom}` token from an earlier design is ignored.
 */
export function Emphasis({ text }: { text: string | null | undefined; blossomColor?: string }) {
  if (!text) return null;
  return (
    <>
      {text.split(/(\*[^*]+\*|\s*\{blossom\}\s*)/g).map((part, i) => {
        if (/^\s*\{blossom\}\s*$/.test(part)) return <Fragment key={i}> </Fragment>;
        if (/^\*[^*]+\*$/.test(part)) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Plain-text version of a CMS headline, for metadata. */
export function stripEmphasis(text: string | null | undefined): string {
  return (text ?? "").replace(/\*([^*]+)\*/g, "$1").replace(/\s*\{blossom\}\s*/g, " ").trim();
}
