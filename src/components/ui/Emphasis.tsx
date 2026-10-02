import { Fragment } from "react";
import { Blossom } from "./Blossom";

/**
 * Render a CMS headline: `*words*` become `<em>` (the brand emphasis colour) and
 * `{blossom}` drops in the decorative blossom ornament. Anything else is left as typed.
 */
export function Emphasis({ text, blossomColor }: { text: string | null | undefined; blossomColor?: string }) {
  if (!text) return null;
  return (
    <>
      {text.split(/(\*[^*]+\*|\{blossom\})/g).map((part, i) => {
        if (part === "{blossom}") return <Blossom key={i} color={blossomColor} className="mx-[0.12em]" />;
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
