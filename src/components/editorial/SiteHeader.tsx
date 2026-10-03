"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

export const NAV = [
  { href: "/", label: "Home", n: "01" },
  { href: "/services", label: "Services", n: "02" },
  { href: "/research", label: "Research", n: "03" },
  { href: "/insights", label: "Insights", n: "04" },
  { href: "/about", label: "About", n: "05" },
  { href: "/contact", label: "Contact", n: "06" },
] as const;

function subscribe(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

/** Fixed header: transparent over the hero, solid once scrolled. Menu opens a full-screen index. */
export function SiteHeader({ ctaLabel = "Work with us" }: { ctaLabel?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(subscribe, () => window.scrollY > 24, () => false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Blur lives on the bar, not the header, so the fixed menu below isn't trapped inside it. */}
      <div
        className={cn(
          "flex h-16 items-center justify-between px-5 transition-colors duration-300 md:px-8",
          scrolled || open ? "border-b border-rule bg-bg/95 backdrop-blur" : "bg-gradient-to-b from-black/60 to-transparent",
        )}
      >
        <div className="flex items-center gap-5">
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
            className="-ml-2 flex size-11 items-center justify-center"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span className={cn("absolute left-0 h-px w-6 bg-fg transition-transform", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute top-1.5 left-0 h-px w-6 bg-fg transition-opacity", open && "opacity-0")} />
              <span className={cn("absolute left-0 h-px w-6 bg-fg transition-transform", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
          <Link href="/" onClick={() => setOpen(false)} className="font-serif text-xl font-semibold tracking-[0.35em] text-gold" aria-label="Gatio, home">
            GATIO
          </Link>
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="label text-fg-muted transition-colors hover:text-gold aria-[current=page]:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/contact" className="label border border-fg/40 px-4 py-2.5 text-fg transition-colors hover:border-gold hover:text-gold">
          {ctaLabel}
        </Link>
      </div>

      <div id={menuId} hidden={!open} className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-bg">
        <nav aria-label="Menu" className="mx-auto flex min-h-full max-w-[1280px] flex-col justify-center px-5 py-12 md:px-8">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-6 py-5 md:py-6"
                >
                  <span className="label text-gold">{item.n}</span>
                  <span className="font-serif text-4xl font-semibold transition-colors group-hover:text-gold md:text-6xl">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
