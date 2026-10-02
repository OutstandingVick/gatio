"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Globe, HelpCircle, Menu, PenLine, Search, Settings } from "lucide-react";
import { useAdminShell } from "./AdminShell";

const iconButton =
  "flex size-9 items-center justify-center rounded-lg border border-admin-line bg-admin-raised text-admin-muted hover:bg-[#2c2c2c] hover:text-admin-text";

export function Topbar() {
  const { openMobile } = useAdminShell();
  const q = useSearchParams().get("q") ?? "";

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-admin-line bg-admin-shell px-3 lg:rounded-2xl lg:border">
      <button type="button" onClick={openMobile} className={`${iconButton} lg:hidden`} aria-label="Open menu">
        <Menu className="size-4" />
      </button>

      <form action="/admin/search" role="search" className="relative w-full max-w-[320px]">
        <label htmlFor="admin-search" className="sr-only">
          Search content
        </label>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-admin-muted" aria-hidden="true" />
        <input
          id="admin-search"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search reports, articles, services…"
          className="h-9 w-full rounded-lg border border-admin-line bg-admin-raised pr-3 pl-9 text-sm text-admin-text placeholder:text-admin-muted focus:border-admin-blue focus:outline-none"
        />
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Link href="/" target="_blank" className={iconButton} aria-label="View website (opens in a new tab)" title="View website">
          <Globe className="size-4" />
        </Link>
        <Link href="/studio" className={`${iconButton} hidden sm:flex`} aria-label="Open the editor" title="Open the editor">
          <PenLine className="size-4" />
        </Link>
        <a
          href="https://www.sanity.io/docs/studio"
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconButton} hidden sm:flex`}
          aria-label="Help (opens in a new tab)"
          title="Help"
        >
          <HelpCircle className="size-4" />
        </a>
        <Link href="/admin/settings" className={iconButton} aria-label="Settings" title="Settings">
          <Settings className="size-4" />
        </Link>
      </div>
    </header>
  );
}
