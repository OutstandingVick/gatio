import Link from "next/link";
import { ExternalLink, PenLine } from "lucide-react";
import { publicHref, studioEditHref, TYPE_LABEL, updatedLabel, type AdminRow } from "@/lib/admin";
import { COLOR_CLASSES, topicColor } from "@/lib/topics";
import { cn } from "@/lib/cn";
import { StatusBadge, statusOf } from "./StatusBadge";

type Column = "type" | "topic" | "status" | "people" | "count" | "updated";

const HEADERS: Record<Column, string> = {
  type: "Type",
  topic: "Topic",
  status: "Status",
  people: "Author",
  count: "Used by",
  updated: "Updated",
};

/** Content table in the dashboard style. Edit opens the Sanity editor. */
export function ContentTable({
  rows,
  columns = ["type", "topic", "status", "people", "updated"],
  caption,
  empty = "Nothing here yet.",
}: {
  rows: AdminRow[];
  columns?: Column[];
  caption: string;
  empty?: string;
}) {
  if (!rows.length) {
    return <p className="p-8 text-center text-sm text-admin-muted">{empty}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-admin-line text-admin-muted">
            <th scope="col" className="px-4 py-3.5 font-normal">
              Title
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className="border-l border-admin-line px-4 py-3.5 font-normal">
                {HEADERS[c]}
              </th>
            ))}
            <th scope="col" className="border-l border-admin-line px-4 py-3.5 font-normal">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const site = publicHref(row._type, row.slug);
            const color = row.topic ? COLOR_CLASSES[topicColor(null, row.topic.colorKey)] : null;
            const people = (row.people ?? []).filter(Boolean).join(", ");
            return (
              <tr key={row._id} className="border-b border-admin-line last:border-0 hover:bg-white/[0.02]">
                <th scope="row" className="max-w-[340px] px-4 py-3 font-normal">
                  <Link href={studioEditHref(row._id, row._type)} className="line-clamp-1 hover:underline">
                    {row.title ?? TYPE_LABEL[row._type]}
                  </Link>
                </th>
                {columns.map((c) => (
                  <td key={c} className="border-l border-admin-line px-4 py-3 whitespace-nowrap text-admin-muted">
                    {c === "type" && TYPE_LABEL[row._type]}
                    {c === "topic" &&
                      (row.topic ? (
                        <span className="inline-flex items-center gap-2">
                          <span aria-hidden="true" className={cn("size-2.5 rounded-sm", color?.bg)} />
                          {row.topic.title}
                        </span>
                      ) : (
                        "—"
                      ))}
                    {c === "status" && <StatusBadge status={statusOf(row)} />}
                    {c === "people" && (people || "—")}
                    {c === "count" && <span className="tabular-nums">{row.count ?? 0}</span>}
                    {c === "updated" && <time dateTime={row._updatedAt}>{updatedLabel(row._updatedAt)}</time>}
                  </td>
                ))}
                <td className="border-l border-admin-line px-3 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {site && (
                      <Link
                        href={site}
                        target="_blank"
                        className="flex size-8 items-center justify-center rounded-md text-admin-muted hover:bg-admin-raised hover:text-admin-text"
                        aria-label={`View “${row.title ?? TYPE_LABEL[row._type]}” on the website (opens in a new tab)`}
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                    )}
                    <Link
                      href={studioEditHref(row._id, row._type)}
                      className="flex h-8 items-center gap-1.5 rounded-md border border-admin-line bg-admin-raised px-2.5 text-[13px] text-admin-text hover:bg-[#2c2c2c]"
                    >
                      <PenLine className="size-3.5" aria-hidden="true" />
                      Edit<span className="sr-only"> “{row.title ?? TYPE_LABEL[row._type]}”</span>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
