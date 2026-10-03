/** Code-painted scenes in /public/images (see scripts/art). */
export const SCENES = {
  hero: { src: "/images/hero-lagos-dusk.webp", alt: "Painted dusk view of a city skyline across a lagoon, with a lit bridge" },
  harbour: { src: "/images/scene-harbour.webp", alt: "Painted port at dusk with gantry cranes over stacked containers" },
  lightTrails: { src: "/images/scene-light-trails.webp", alt: "Painted long-exposure light trails on a curving expressway at night" },
  nightMarket: { src: "/images/scene-night-market.webp", alt: "Painted night market with lantern lights above stall awnings" },
  aerialGrid: { src: "/images/scene-aerial-grid.webp", alt: "Painted aerial view of a city grid at night beside a lagoon" },
} as const;

export type SceneKey = keyof typeof SCENES;

const BY_SLUG: Record<string, SceneKey> = {
  "market-research": "nightMarket",
  "data-analytics": "lightTrails",
  "strategy-advisory": "aerialGrid",
  briefings: "harbour",
};

const ROTATION: SceneKey[] = ["nightMarket", "lightTrails", "aerialGrid", "harbour"];

/** Painted fallback image for a service: by slug if known, otherwise by position. */
export function sceneForService(slug: string | null | undefined, index: number) {
  return SCENES[(slug && BY_SLUG[slug]) || ROTATION[index % ROTATION.length]];
}
