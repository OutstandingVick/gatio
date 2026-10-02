import { cn } from "@/lib/cn";
import { COLOR_HEX, topicColor, type ColorKey } from "@/lib/topics";

import { COVER_STYLES, type CoverStyle } from "@/lib/covers";

type CoverArtProps = {
  coverStyle?: string | null;
  topicSlug?: string | null;
  colorKey?: string | null;
  className?: string;
};

const PASTEL: Record<ColorKey, string> = {
  accent: "#DFE7FF",
  teal: "#DCF7EA",
  plum: "#FFE2EC",
  mustard: "#FFF1C4",
  ink: "#E8E4FF",
};

/** Contrasting accent for each topic colour, used for the highlight shape and blossom. */
const ALT: Record<ColorKey, string> = {
  accent: COLOR_HEX.plum,
  teal: COLOR_HEX.accent,
  plum: COLOR_HEX.mustard,
  mustard: COLOR_HEX.plum,
  ink: COLOR_HEX.accent,
};

/** Pastel ground, topic-colour shapes, contrasting highlight. */
function palette(color: ColorKey) {
  return { bg: PASTEL[color], fg: color === "mustard" ? "#E0A800" : COLOR_HEX[color], alt: ALT[color] };
}

function Petals({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  return (
    <g fill={fill}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <circle key={i} cx={cx + Math.cos(a) * r * 0.55} cy={cy + Math.sin(a) * r * 0.55} r={r * 0.38} />;
      })}
      <circle cx={cx} cy={cy} r={r * 0.6} />
    </g>
  );
}

function Shapes({ style, fg, alt }: { style: CoverStyle; fg: string; alt: string }) {
  switch (style) {
    case "bars":
      return (
        <g fill={fg}>
          {[90, 140, 110, 190, 160].map((h, i) => (
            <rect key={i} x={70 + i * 56} y={260 - h} width={36} height={h} rx={4} opacity={i === 3 ? 1 : 0.35} />
          ))}
          <circle cx={256} cy={50} r={10} fill={alt} />
        </g>
      );
    case "circles":
      return (
        <g>
          <circle cx={150} cy={150} r={90} fill={fg} opacity={0.25} />
          <circle cx={250} cy={150} r={90} fill={fg} opacity={0.25} />
          <circle cx={200} cy={150} r={42} fill={alt} />
        </g>
      );
    case "squares":
      return (
        <g fill={fg}>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={110 + c * 64}
                y={60 + r * 64}
                width={52}
                height={52}
                rx={6}
                opacity={r === 1 && c === 2 ? 1 : 0.28}
                fill={r === 1 && c === 2 ? alt : fg}
              />
            )),
          )}
        </g>
      );
    case "triangle":
      return (
        <g>
          <path d="M200 50 L320 250 L80 250 Z" fill={fg} opacity={0.28} />
          <path d="M200 130 L260 250 L140 250 Z" fill={alt} />
        </g>
      );
    case "line":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 220 L110 180 L170 200 L240 110 L300 140 L360 70" stroke={fg} strokeWidth={6} />
          <path d="M40 250 H360" stroke={fg} strokeWidth={2} opacity={0.35} />
          <circle cx={360} cy={70} r={12} fill={alt} />
        </g>
      );
    case "rings":
      return (
        <g fill="none">
          {[110, 80, 50].map((r, i) => (
            <circle key={r} cx={200} cy={150} r={r} stroke={fg} strokeWidth={10} opacity={0.3 + i * 0.25} />
          ))}
          <circle cx={200} cy={150} r={18} fill={alt} />
        </g>
      );
  }
}

/** Decorative geometric cover art on a pastel ground, driven by `coverStyle` and the topic colour. */
export function CoverArt({ coverStyle, topicSlug, colorKey, className }: CoverArtProps) {
  const style: CoverStyle = (COVER_STYLES as readonly string[]).includes(coverStyle ?? "")
    ? (coverStyle as CoverStyle)
    : "bars";
  const { bg, fg, alt } = palette(topicColor(topicSlug, colorKey));

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("block h-full w-full", className)}
    >
      <rect width={400} height={300} fill={bg} />
      <Shapes style={style} fg={fg} alt={alt} />
      <Petals cx={352} cy={48} r={26} fill={alt} />
    </svg>
  );
}
