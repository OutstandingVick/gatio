type Span = { _type: string; text?: string };
type Block = { _type: string; _key: string; style?: string; children?: Span[] };

export type TocItem = { id: string; text: string; level: 2 | 3 };

export function blockText(block: { children?: Span[] }): string {
  return (block.children ?? []).map((c) => c.text ?? "").join("");
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/-+/g, "-") || "section"
  );
}

/**
 * Collect h2/h3 headings from a Portable Text body, with stable, unique ids.
 * The body renderer uses the same ids (looked up by block `_key`).
 */
export function extractHeadings(body: ReadonlyArray<{ _type: string; _key: string }> | null | undefined): TocItem[] {
  const seen = new Map<string, number>();
  const items: TocItem[] = [];
  for (const raw of body ?? []) {
    const block = raw as Block;
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const text = blockText(block).trim();
    if (!text) continue;
    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    items.push({ id: count ? `${base}-${count + 1}` : base, text, level: block.style === "h2" ? 2 : 3 });
  }
  return items;
}

/** Map block `_key` → heading id, for the renderer. */
export function headingIdMap(body: Parameters<typeof extractHeadings>[0]): Map<string, string> {
  const ids = extractHeadings(body);
  const map = new Map<string, string>();
  let i = 0;
  for (const raw of body ?? []) {
    const block = raw as Block;
    if (block._type === "block" && (block.style === "h2" || block.style === "h3") && blockText(block).trim()) {
      map.set(block._key, ids[i++].id);
    }
  }
  return map;
}
