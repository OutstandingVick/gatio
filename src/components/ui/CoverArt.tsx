import { cn } from "@/lib/cn";
import { COVER_STYLES, type CoverStyle } from "@/lib/covers";
import { COLOR_HEX, topicColor } from "@/lib/topics";

type CoverArtProps = {
  coverStyle?: string | null;
  topicSlug?: string | null;
  colorKey?: string | null;
  className?: string;
};

/** Light steel focal mark (brand steel blue, lightened for contrast on the deep ground). */
const GOLD = "#8CC3E0";

/** Fine-line "engraved" compositions; `c` is the topic colour, gold marks the focal point. */
function Lines({ style, c }: { style: CoverStyle; c: string }) {
  const stroke = { fill: "none", stroke: c, strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" as const };
  switch (style) {
    case "bars":
      return (
        <g>
          {[70, 110, 90, 160, 130, 200, 150].map((h, i) => (
            <rect key={i} x={70 + i * 40} y={250 - h} width={22} height={h} {...stroke} opacity={i === 5 ? 1 : 0.55} />
          ))}
          <line x1={50} x2={350} y1={250} y2={250} {...stroke} />
          <circle cx={281} cy={38} r={6} fill={GOLD} />
        </g>
      );
    case "circles":
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={130 + i * 35} cy={150} r={80} {...stroke} opacity={0.35 + i * 0.13} />
          ))}
          <circle cx={200} cy={150} r={10} fill={GOLD} />
        </g>
      );
    case "squares":
      return (
        <g>
          {[0, 1, 2, 3].flatMap((r) =>
            [0, 1, 2, 3].map((col) => (
              <rect key={`${r}-${col}`} x={120 + col * 42} y={66 + r * 42} width={32} height={32} {...stroke} opacity={0.4 + ((r + col) % 3) * 0.2} />
            )),
          )}
          <rect x={246} y={108} width={32} height={32} fill={GOLD} />
        </g>
      );
    case "triangle":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M200 ${50 + i * 18} L${320 - i * 14} 250 L${80 + i * 14} 250 Z`} {...stroke} opacity={0.3 + i * 0.12} />
          ))}
          <circle cx={200} cy={50} r={6} fill={GOLD} />
        </g>
      );
    case "line":
      return (
        <g>
          {[40, 80, 120, 160, 200, 240].map((y) => (
            <line key={y} x1={40} x2={360} y1={y} y2={y} stroke={c} strokeWidth={0.6} opacity={0.25} vectorEffect="non-scaling-stroke" />
          ))}
          <path d="M40 220 L100 190 L150 205 L210 130 L260 150 L320 80 L360 70" {...stroke} strokeWidth={1.75} />
          <circle cx={320} cy={80} r={6} fill={GOLD} />
        </g>
      );
    case "rings":
      return (
        <g>
          {[120, 100, 80, 60, 40, 20].map((r, i) => (
            <circle key={r} cx={200} cy={150} r={r} {...stroke} opacity={0.3 + i * 0.12} />
          ))}
          <circle cx={200} cy={150} r={6} fill={GOLD} />
        </g>
      );
  }
}

/** Decorative cover: fine-line composition on deep blue-teal, driven by `coverStyle` and topic colour. */
export function CoverArt({ coverStyle, topicSlug, colorKey, className }: CoverArtProps) {
  const style: CoverStyle = (COVER_STYLES as readonly string[]).includes(coverStyle ?? "") ? (coverStyle as CoverStyle) : "bars";
  const c = COLOR_HEX[topicColor(topicSlug, colorKey)];
  const gid = `cover-${style}-${c.slice(1)}`;

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" className={cn("block h-full w-full", className)}>
      <defs>
        <radialGradient id={gid} cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#1d5068" />
          <stop offset="100%" stopColor="#0f3142" />
        </radialGradient>
      </defs>
      <rect width={400} height={300} fill={`url(#${gid})`} />
      <rect x={14} y={14} width={372} height={272} fill="none" stroke={c} strokeWidth={0.5} opacity={0.25} vectorEffect="non-scaling-stroke" />
      <Lines style={style} c={c} />
    </svg>
  );
}
