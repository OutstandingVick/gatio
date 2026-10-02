import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ContentTable } from "@/components/admin/ContentTable";
import { Panel } from "@/components/admin/Panel";
import { adminFetch } from "@/sanity/adminClient";
import { adminRecentQuery, adminSearchQuery } from "@/sanity/adminQueries";

export const metadata: Metadata = { title: "Search" };

export default async function SearchAdmin({ searchParams }: PageProps<"/admin/search">) {
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 80) ?? "";
  // GROQ `match` does prefix matching per word.
  const terms = q.split(/\s+/).filter(Boolean).map((w) => `${w.replace(/[*"]/g, "")}*`);
  const rows = terms.length ? await adminFetch(adminSearchQuery, { q: terms }) : await adminFetch(adminRecentQuery, { limit: 30 });

  return (
    <div className="flex flex-col gap-3">
      <div className="px-1 py-2">
        <h1 className="text-2xl">{q ? <>Results for “{q}”</> : "All content"}</h1>
        <p className="mt-1 text-sm text-admin-muted" role="status">
          {(rows ?? []).length} {(rows ?? []).length === 1 ? "item" : "items"}
          {q ? " match across reports, articles, services, authors and topics." : ", most recently edited first."}
        </p>
      </div>
      <Panel title={q ? "Matches" : "Everything"} icon={Search}>
        <ContentTable rows={rows ?? []} caption={q ? `Search results for ${q}` : "All content"} empty="Nothing matches that search." />
      </Panel>
    </div>
  );
}
