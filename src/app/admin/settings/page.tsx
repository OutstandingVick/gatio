import type { Metadata } from "next";
import Link from "next/link";
import { PenLine, Settings } from "lucide-react";
import { Panel } from "@/components/admin/Panel";
import { studioEditHref, updatedLabel } from "@/lib/admin";
import { adminFetch } from "@/sanity/adminClient";
import { siteSettingsQuery } from "@/sanity/queries";
import { adminPagesQuery } from "@/sanity/adminQueries";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsAdmin() {
  const [settings, docs] = await Promise.all([adminFetch(siteSettingsQuery), adminFetch(adminPagesQuery)]);
  const updated = docs?.find((d) => d._id === "siteSettings")?._updatedAt;

  const rows: [string, string | null | undefined][] = [
    ["Site name", settings?.siteName],
    ["Positioning line", settings?.positioning],
    ["Navbar button", settings?.ctaLabel],
    ["Email", settings?.email],
    ["Phone", settings?.phone],
    ["Address", settings?.address],
    ["Office hours", settings?.officeHours],
    ["Social links", settings?.socials?.map((s) => s.label).filter(Boolean).join(", ")],
    ["Copyright holder", settings?.copyright],
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1 py-2">
        <div>
          <h1 className="text-2xl">Settings</h1>
          <p className="mt-1 text-sm text-admin-muted">
            Site-wide details used in the navbar, footer and contact page{updated ? ` · updated ${updatedLabel(updated)}` : ""}.
          </p>
        </div>
        <Link href={studioEditHref("siteSettings", "siteSettings")} className="flex h-9 items-center gap-2 rounded-lg bg-admin-blue px-3.5 text-sm font-medium text-white hover:bg-[#3f7bf0]">
          <PenLine className="size-4" aria-hidden="true" /> Edit settings
        </Link>
      </div>
      <Panel title="Site details" icon={Settings}>
        <dl className="divide-y divide-admin-line">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-4">
              <dt className="text-sm text-admin-muted">{label}</dt>
              <dd className={value ? "whitespace-pre-line" : "text-admin-faint"}>{value || "Not set"}</dd>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}
