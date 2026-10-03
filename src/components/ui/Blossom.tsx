import { cn } from "@/lib/cn";

type BlossomProps = {
  /** Fill colour (CSS colour or var). Defaults to the brand pink. */
  color?: string;
  /** Petal count, 5–10 looks best. */
  petals?: number;
  className?: string;
};

/**
 * Decorative scalloped "blossom" used inline in headlines and as a badge
 * backdrop. Purely decorative, hidden from assistive tech.
 */
export function Blossom({ color = "var(--plum)", petals = 8, className }: BlossomProps) {
  const r = 26; // petal centre distance
  const pr = 17; // petal radius
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      // Default to text-relative size unless the caller sets one.
      className={cn("inline-block shrink-0 align-[-0.08em]", !/(^|\s)size-/.test(className ?? "") && "size-[0.8em]", className)}
    >
      <g fill={color}>
        {Array.from({ length: petals }, (_, i) => {
          const a = (i / petals) * Math.PI * 2;
          return <circle key={i} cx={50 + Math.cos(a) * r} cy={50 + Math.sin(a) * r} r={pr} />;
        })}
        <circle cx={50} cy={50} r={r + 2} />
      </g>
    </svg>
  );
}
