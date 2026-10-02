import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import type { ComponentProps } from "react";
import { studioCreateHref, type AdminRow } from "@/lib/admin";
import { adminFetch } from "@/sanity/adminClient";
import { adminListQuery } from "@/sanity/adminQueries";
import { ContentTable } from "./ContentTable";
import { Panel } from "./Panel";

type ListScreenProps = {
  type: string;
  title: string;
  singular: string;
  description: string;
  icon: LucideIcon;
  columns: ComponentProps<typeof ContentTable>["columns"];
};

/** Admin list page for one document type: header, count, "New" button and table. */
export async function ListScreen({ type, title, singular, description, icon, columns }: ListScreenProps) {
  const rows = ((await adminFetch(adminListQuery, { type })) ?? []) as AdminRow[];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1 py-2">
        <div>
          <h1 className="text-2xl">
            {title} <span className="text-admin-faint tabular-nums">{rows.length}</span>
          </h1>
          <p className="mt-1 text-sm text-admin-muted">{description}</p>
        </div>
        <Link
          href={studioCreateHref(type)}
          className="flex h-9 items-center gap-2 rounded-lg bg-admin-blue px-3.5 text-sm font-medium text-white hover:bg-[#3f7bf0]"
        >
          <Plus className="size-4" aria-hidden="true" />
          New {singular}
        </Link>
      </div>
      <Panel title={`All ${title.toLowerCase()}`} icon={icon}>
        <ContentTable rows={rows} columns={columns} caption={title} empty={`No ${title.toLowerCase()} yet.`} />
      </Panel>
    </div>
  );
}
