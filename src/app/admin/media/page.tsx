import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Images, Upload } from "lucide-react";
import { Panel } from "@/components/admin/Panel";
import { updatedLabel } from "@/lib/admin";
import { adminFetch } from "@/sanity/adminClient";
import { adminMediaQuery } from "@/sanity/adminQueries";

export const metadata: Metadata = { title: "Media" };

function size(bytes: number | null) {
  if (!bytes) return "";
  return bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.round(bytes / 1000)} KB`;
}

export default async function MediaAdmin() {
  const assets = (await adminFetch(adminMediaQuery)) ?? [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1 py-2">
        <div>
          <h1 className="text-2xl">
            Media <span className="text-admin-faint tabular-nums">{assets.length}</span>
          </h1>
          <p className="mt-1 text-sm text-admin-muted">Every image uploaded to the site. Upload and tag images in the media library.</p>
        </div>
        <Link href="/studio/media" className="flex h-9 items-center gap-2 rounded-lg bg-admin-blue px-3.5 text-sm font-medium text-white hover:bg-[#3f7bf0]">
          <Upload className="size-4" aria-hidden="true" /> Open media library
        </Link>
      </div>
      <Panel title="All images" icon={Images} insetClassName="p-3">
        {assets.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {assets.map((a) => (
              <li key={a._id} className="overflow-hidden rounded-xl border border-admin-line bg-admin-panel">
                <div className="relative aspect-[4/3] bg-admin-raised">
                  {a.url && (
                    <Image src={`${a.url}?w=480&fit=max&auto=format`} alt={a.originalFilename ?? ""} fill sizes="(min-width: 1280px) 20vw, (min-width: 640px) 33vw, 50vw" className="object-cover" />
                  )}
                </div>
                <div className="p-3 text-xs">
                  <p className="truncate text-sm text-admin-text">{a.originalFilename ?? "Untitled image"}</p>
                  <p className="mt-1 text-admin-muted">
                    {a.width}×{a.height} · {size(a.size)} · {a.extension?.toUpperCase()}
                  </p>
                  <p className="mt-1 text-admin-faint">
                    Used in {a.usedBy} {a.usedBy === 1 ? "document" : "documents"} · {updatedLabel(a._createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-8 text-center text-sm text-admin-muted">No images uploaded yet.</p>
        )}
      </Panel>
    </div>
  );
}
