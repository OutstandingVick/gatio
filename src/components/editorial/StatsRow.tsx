/** Row of large serif figures in hairline cells, under the hero. */
export function StatsRow({ stats }: { stats: { _key: string; value: string | null; label: string | null }[] }) {
  if (!stats.length) return null;
  return (
    <section aria-label="Gatio in figures" className="border-y border-rule">
      <dl className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s._key}
            className={`flex flex-col-reverse items-center gap-3 px-4 py-10 text-center md:py-14 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""} border-rule`}
          >
            <dt className="label text-fg-muted">{s.label}</dt>
            <dd className="font-serif text-5xl font-semibold text-gold md:text-6xl">{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
