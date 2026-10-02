import { cn } from "@/lib/cn";

const ROWS = 14;
const LEVELS = [
  { name: "Low", className: "bg-admin-sky" },
  { name: "Medium", className: "bg-admin-blue" },
  { name: "High", className: "bg-admin-violet" },
  { name: "Peak", className: "bg-admin-lilac" },
] as const;

export type DayCount = { date: string; count: number };

const dayLabel = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });

/** Round up to a tidy axis maximum. */
function niceMax(n: number) {
  if (n <= 4) return 4;
  const mag = 10 ** Math.floor(Math.log10(n));
  return [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= n) ?? n;
}

export function ActivityLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-3 text-[13px] text-admin-muted" aria-label="Intensity levels">
      {LEVELS.map((l) => (
        <li key={l.name} className="flex items-center gap-1.5">
          <span aria-hidden="true" className={cn("size-2.5 rounded-sm", l.className)} />
          {l.name}
        </li>
      ))}
    </ul>
  );
}

/** Pixel-column chart of daily edits. Each column is a day; filled cells show volume. */
export function ActivityChart({ days }: { days: DayCount[] }) {
  const max = niceMax(Math.max(1, ...days.map((d) => d.count)));
  const ticks = [max, Math.round(max * 0.75), Math.round(max / 2), Math.round(max / 4), 0];
  const labelEvery = Math.max(1, Math.ceil(days.length / 8));

  return (
    <figure>
      <div className="flex gap-3" aria-hidden="true">
        <div className="flex shrink-0 flex-col justify-between pb-6 text-right text-[13px] text-admin-muted tabular-nums">
          {ticks.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <div className="grid h-[260px] gap-[3px]" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
            {days.map((d) => {
              const filled = d.count === 0 ? 0 : Math.max(1, Math.round((d.count / max) * ROWS));
              return (
                <div key={d.date} className="grid gap-[3px]" style={{ gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))` }}>
                  {Array.from({ length: ROWS }, (_, r) => {
                    const fromBottom = ROWS - 1 - r;
                    const on = fromBottom < filled;
                    const level = Math.min(3, Math.floor((fromBottom / ROWS) * 4));
                    return <span key={r} className={cn("rounded-[2px]", on ? LEVELS[level].className : "bg-[#222]")} />;
                  })}
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid text-[13px] text-admin-muted" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
            {days.map((d, i) => (
              <span key={d.date} className="overflow-visible whitespace-nowrap">
                {i % labelEvery === 0 ? dayLabel.format(new Date(d.date)) : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
      <table className="sr-only">
        <caption>Edits per day</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Edits</th>
          </tr>
        </thead>
        <tbody>
          {days.map((d) => (
            <tr key={d.date}>
              <th scope="row">{dayLabel.format(new Date(d.date))}</th>
              <td>{d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
