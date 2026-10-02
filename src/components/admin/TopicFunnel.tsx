import Link from "next/link";
import { cn } from "@/lib/cn";

export type FunnelItem = { id: string; title: string; count: number; slug?: string | null };

const TIERS = [
  { fill: "#5aa9ff", top: "#6fb5ff", swatch: "bg-admin-sky" },
  { fill: "#6a6cf3", top: "#7b7df6", swatch: "bg-admin-blue" },
  { fill: "#9a7cf6", top: "#ab92f8", swatch: "bg-admin-lilac" },
];

/** Three-tier funnel of the topics with the most content. */
export function TopicFunnel({ items }: { items: FunnelItem[] }) {
  const top = items.slice(0, 3);
  if (!top.length) return <p className="p-8 text-center text-sm text-admin-muted">No topics yet.</p>;

  // Each tier narrows; heights fixed so the shape reads as a funnel.
  const geometry = [
    { y: 30, h: 92, wTop: 340, wBottom: 290 },
    { y: 132, h: 82, wTop: 270, wBottom: 210 },
    { y: 224, h: 80, wTop: 194, wBottom: 120 },
  ];

  return (
    <div className="flex h-full flex-col">
      <svg viewBox="0 0 400 320" className="mx-auto h-auto w-full max-w-[380px]" role="img" aria-label="Content per topic">
        {top.map((item, i) => {
          const g = geometry[i];
          const t = TIERS[i];
          const cx = 200;
          const l1 = cx - g.wTop / 2, r1 = cx + g.wTop / 2;
          const l2 = cx - g.wBottom / 2, r2 = cx + g.wBottom / 2;
          const ry = 14;
          const body = `M${l1},${g.y} L${l2},${g.y + g.h} A${g.wBottom / 2},${ry} 0 0 0 ${r2},${g.y + g.h} L${r1},${g.y} Z`;
          return (
            <g key={item.id}>
              <path d={body} fill={t.fill} />
              {i === 0 && <ellipse cx={cx} cy={g.y} rx={g.wTop / 2} ry={ry} fill={t.top} />}
              <text x={cx} y={g.y + g.h / 2 + 10} textAnchor="middle" fill="#fff" fontSize="20" fontWeight="600">
                {item.count}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="mt-auto divide-y divide-admin-line px-4 pb-2">
        {top.map((item, i) => (
          <li key={item.id} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
            <Link href={item.slug ? `/admin/topics#${item.slug}` : "/admin/topics"} className="flex items-center gap-2 text-admin-muted hover:text-admin-text">
              <span aria-hidden="true" className={cn("size-3 rounded-sm", TIERS[i].swatch)} />
              {item.title}
            </Link>
            <span className="tabular-nums">
              {item.count} <span className="text-admin-muted">{item.count === 1 ? "item" : "items"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
