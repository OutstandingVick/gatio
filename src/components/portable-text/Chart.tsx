import { useId } from "react";
import { COLOR_HEX, type ColorKey } from "@/lib/topics";
import type { Chart as ChartData } from "@/sanity/types";

const W = 640;
const H = 340;
const PAD = { top: 20, right: 16, bottom: 48, left: 52 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

const LINE = "#2C5D75";
const MUTED = "#C7D6DF";

/** Round the axis max up to a tidy number and return 4 evenly spaced ticks. */
function niceTicks(max: number): number[] {
  if (max <= 0) return [0, 1];
  const rough = max / 4;
  const mag = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= rough) ?? rough;
  return Array.from({ length: Math.ceil(max / step) + 1 }, (_, i) => +(i * step).toFixed(6));
}

const fmt = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

/** Bar or line chart as plain SVG, with a visually hidden data table for screen readers. */
export function Chart({ value, color = "accent" }: { value: ChartData; color?: ColorKey }) {
  const id = useId();
  const data = (value.data ?? []).filter(
    (d): d is typeof d & { label: string; value: number } => typeof d.value === "number" && !!d.label,
  );
  if (data.length === 0) return null;

  const fill = COLOR_HEX[color];
  const min = Math.min(0, ...data.map((d) => d.value));
  const ticks = niceTicks(Math.max(...data.map((d) => d.value)));
  const max = ticks[ticks.length - 1];
  const y = (v: number) => PAD.top + INNER_H - ((v - min) / (max - min || 1)) * INNER_H;
  const band = INNER_W / data.length;
  const x = (i: number) => PAD.left + band * i + band / 2;
  const barW = Math.min(56, band * 0.6);
  const labelEvery = Math.ceil(data.length / 8);

  return (
    <figure className="my-12">
      <figcaption id={`${id}-cap`} className="mb-5 font-serif text-2xl font-semibold">
        {value.title}
      </figcaption>
      <div className="border border-rule bg-surface p-4 sm:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden="true" focusable="false">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={LINE} strokeWidth={1} />
              <text x={PAD.left - 10} y={y(t)} dy="0.32em" textAnchor="end" fontSize={13} fill={MUTED}>
                {fmt.format(t)}
              </text>
            </g>
          ))}

          {value.type === "line" ? (
            <g>
              <polyline
                points={data.map((d, i) => `${x(i)},${y(d.value)}`).join(" ")}
                fill="none"
                stroke={fill}
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {data.map((d, i) => (
                <circle key={d._key} cx={x(i)} cy={y(d.value)} r={5} fill="#164258" stroke={fill} strokeWidth={2.5} />
              ))}
            </g>
          ) : (
            data.map((d, i) => (
              <rect
                key={d._key}
                x={x(i) - barW / 2}
                y={Math.min(y(d.value), y(0))}
                width={barW}
                height={Math.abs(y(0) - y(d.value))}
                rx={0}
                fill={fill}
              />
            ))
          )}

          <line x1={PAD.left} x2={W - PAD.right} y1={y(0)} y2={y(0)} stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={1} />
          {data.map((d, i) =>
            i % labelEvery === 0 ? (
              <text key={d._key} x={x(i)} y={H - PAD.bottom + 24} textAnchor="middle" fontSize={13} fill={MUTED}>
                {d.label}
              </text>
            ) : null,
          )}
        </svg>
      </div>
      <table className="sr-only" aria-labelledby={`${id}-cap`}>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d._key}>
              <th scope="row">{d.label}</th>
              <td>{fmt.format(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
