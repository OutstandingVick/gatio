"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { ExternalLink, PanelLeft, PenLine, X } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { CoverArt } from "@/components/ui/CoverArt";
import { cn } from "@/lib/cn";
import { NAV } from "./nav";

const ShellContext = createContext<{ openMobile: () => void }>({ openMobile: () => {} });
export const useAdminShell = () => useContext(ShellContext);

const PROMO_KEY = "gatio-admin-promo-dismissed";
const promoListeners = new Set<() => void>();

function readPromoHidden() {
  try {
    return localStorage.getItem(PROMO_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribePromo(cb: () => void) {
  promoListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    promoListeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function dismissPromo() {
  try {
    localStorage.setItem(PROMO_KEY, "1");
  } catch {}
  promoListeners.forEach((cb) => cb());
}

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ collapsed, onNavigate, onToggle }: { collapsed: boolean; onNavigate?: () => void; onToggle?: () => void }) {
  const pathname = usePathname();
  // Hidden on the server render, then read from localStorage in the browser.
  const promoHidden = useSyncExternalStore(subscribePromo, readPromoHidden, () => true);

  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center border-b border-admin-line px-4", collapsed ? "justify-center" : "justify-between")}>
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5 rounded-lg" aria-label="Gatio admin, overview">
          <LogoMark className="size-7" />
          {!collapsed && <span className="text-[15px] font-semibold">Gatio</span>}
        </Link>
        {onToggle && !collapsed && (
          <button
            type="button"
            onClick={onToggle}
            className="flex size-8 items-center justify-center rounded-md border border-admin-line bg-admin-raised text-admin-muted hover:text-admin-text"
            aria-label="Collapse sidebar"
          >
            <PanelLeft className="size-4" />
          </button>
        )}
      </div>

      <nav aria-label="Admin" className="flex-1 overflow-y-auto">
        {NAV.map((group) => (
          <div key={group.title} className="border-b border-admin-line px-3 py-4">
            {!collapsed && <p className="mb-2 px-2 text-[13px] text-admin-faint">{group.title}</p>}
            <ul className="flex flex-col gap-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? label : undefined}
                      className={cn(
                        "relative flex h-10 items-center gap-3 rounded-lg px-2.5 text-[15px] transition-colors",
                        collapsed && "justify-center",
                        active
                          ? "border border-admin-line bg-admin-raised text-admin-text before:absolute before:top-1.5 before:bottom-1.5 before:-left-3 before:w-[3px] before:rounded-r before:bg-admin-blue"
                          : "border border-transparent text-admin-muted hover:bg-admin-panel hover:text-admin-text",
                      )}
                    >
                      <Icon className={cn("size-[18px] shrink-0", active && "text-admin-blue")} aria-hidden="true" />
                      {collapsed ? <span className="sr-only">{label}</span> : label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        {collapsed && onToggle && (
          <div className="flex justify-center py-4">
            <button
              type="button"
              onClick={onToggle}
              className="flex size-9 items-center justify-center rounded-md border border-admin-line bg-admin-raised text-admin-muted hover:text-admin-text"
              aria-label="Expand sidebar"
            >
              <PanelLeft className="size-4 rotate-180" />
            </button>
          </div>
        )}
      </nav>

      {!collapsed && !promoHidden && (
        <div className="px-3 pb-3 [@media(max-height:760px)]:hidden">
          <div className="relative overflow-hidden rounded-xl border border-admin-line bg-admin-panel">
            <div className="h-24 overflow-hidden">
              <CoverArt coverStyle="rings" colorKey="ink" />
            </div>
            <button
              type="button"
              onClick={dismissPromo}
              className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md bg-black/60 text-white hover:bg-black/80"
              aria-label="Dismiss"
            >
              <X className="size-4" />
            </button>
            <div className="p-3">
              <p className="text-sm font-semibold">Edit in the Studio</p>
              <p className="mt-1 text-[13px] leading-snug text-admin-muted">
                Write reports, update pages and publish changes to the website.
              </p>
              <Link
                href="/studio"
                className="mt-3 flex h-9 items-center justify-center gap-2 rounded-lg border border-admin-line bg-admin-raised text-sm font-medium hover:bg-[#2c2c2c]"
              >
                <PenLine className="size-4" aria-hidden="true" /> Open the editor
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="border-t border-admin-line p-3">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-xl border border-admin-line bg-admin-panel p-2 hover:bg-admin-raised",
            collapsed && "justify-center",
          )}
          title={collapsed ? "View website" : undefined}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cream text-sm font-semibold text-ink">G</span>
          {collapsed ? (
            <span className="sr-only">View website</span>
          ) : (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">Gatio workspace</span>
                <span className="block truncate text-xs text-admin-faint">View website</span>
              </span>
              <ExternalLink className="size-4 text-admin-faint" aria-hidden="true" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

/** Admin frame: sidebar (collapsible on desktop, drawer on mobile) plus the page. */
export function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <ShellContext.Provider value={{ openMobile: () => setMobileOpen(true) }}>
      <div className="flex min-h-dvh gap-3 p-0 lg:p-3">
        <aside
          className={cn(
            "sticky top-3 hidden h-[calc(100dvh-1.5rem)] shrink-0 overflow-hidden rounded-2xl border border-admin-line bg-admin-shell lg:block",
            collapsed ? "w-[72px]" : "w-[264px]",
          )}
        >
          <SidebarContent collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin menu">
            <button type="button" className="absolute inset-0 bg-black/70" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] border-r border-admin-line bg-admin-shell">
              <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-3">{children}</div>
      </div>
    </ShellContext.Provider>
  );
}

