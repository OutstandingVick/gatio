export const TOPIC_COLORS = {
  payments: "accent",
  banking: "teal",
  consumer: "plum",
  "digital-economy": "mustard",
  fintech: "ink",
  markets: "ink",
} as const;

export type TopicSlug = keyof typeof TOPIC_COLORS;
export type ColorKey = "accent" | "teal" | "plum" | "mustard" | "ink";

/** Colour keys an editor may pick for a topic in the Studio. */
export const COLOR_KEYS: ColorKey[] = ["accent", "teal", "plum", "mustard", "ink"];

/** Background + readable foreground classes for each colour key. */
export const COLOR_CLASSES: Record<ColorKey, { bg: string; fg: string; text: string }> = {
  accent: { bg: "bg-accent", fg: "text-bg", text: "text-accent" },
  teal: { bg: "bg-teal", fg: "text-bg", text: "text-teal" },
  plum: { bg: "bg-plum", fg: "text-bg", text: "text-plum" },
  mustard: { bg: "bg-mustard", fg: "text-bg", text: "text-mustard-text" },
  ink: { bg: "bg-ink", fg: "text-bg", text: "text-ink" },
};

/** Raw hex values, for SVG fills. */
export const COLOR_HEX: Record<ColorKey, string> = {
  accent: "#C8A96E",
  teal: "#6FB5A4",
  plum: "#CF8AA1",
  mustard: "#D9B25A",
  ink: "#E8E2D6",
};

/** Soft pastel companion for each colour key, for card backgrounds. */
export const COLOR_SOFT: Record<ColorKey, string> = {
  accent: "bg-sky",
  teal: "bg-mint",
  plum: "bg-blush",
  mustard: "bg-butter",
  ink: "bg-lavender",
};

function isTopicSlug(slug: string): slug is TopicSlug {
  return slug in TOPIC_COLORS;
}

/**
 * Resolve a colour key for a topic. An explicit colour key (set in the
 * Studio) wins; otherwise fall back to the slug mapping, then ink.
 */
export function topicColor(slug?: string | null, colorKey?: string | null): ColorKey {
  if (colorKey && (COLOR_KEYS as string[]).includes(colorKey)) return colorKey as ColorKey;
  if (slug && isTopicSlug(slug)) return TOPIC_COLORS[slug];
  return "ink";
}
