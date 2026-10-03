/** Slow gold ticker of capabilities; the duplicate copy is hidden from screen readers. */
export function Ticker({ items }: { items: string[] }) {
  const list = items.filter(Boolean);
  if (!list.length) return null;
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {list.map((item, i) => (
        <li key={`${item}-${i}`} className="label flex items-center gap-8 pr-8 whitespace-nowrap text-fg-muted">
          <span className={i % 3 === 1 ? "font-medium text-gold" : ""}>{item}</span>
          <span aria-hidden="true" className="text-gold">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="What we cover" className="marquee overflow-hidden border-b border-rule py-5">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
