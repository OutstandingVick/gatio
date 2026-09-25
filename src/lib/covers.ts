export const COVER_STYLES = ["bars", "circles", "squares", "triangle", "line", "rings"] as const;
export type CoverStyle = (typeof COVER_STYLES)[number];
