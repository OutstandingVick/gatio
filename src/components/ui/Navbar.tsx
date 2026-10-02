"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

export function Navbar({ ctaLabel = "Work with us" }: { ctaLabel?: string | null }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 8, () => false);
  const close = () => setOpen(false);

  // Lock scroll and close on Escape while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-cream/95 backdrop-blur-sm transition-shadow duration-200",
        scrolled && !open && "shadow-[0_1px_0_var(--line),0_8px_24px_rgb(13_20_33/0.05)]",
      )}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Logo onClick={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3.5 py-2 text-[15px] font-medium text-ink-muted hover:bg-ink/5 hover:text-ink",
                    isActive(link.href) && "bg-ink/5 text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href="/contact">{ctaLabel}</Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-xl border-[1.5px] border-ink/80 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile full-screen sheet */}
      <div id={menuId} hidden={!open} className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-cream lg:hidden">
        <Container className="flex min-h-full flex-col gap-8 py-8">
          <nav aria-label="Mobile">
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl bg-paper px-5 py-4 text-2xl font-extrabold tracking-[-0.03em]",
                      isActive(link.href) && "ring-2 ring-accent",
                    )}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-accent">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href="/contact" variant="accent" size="lg" onClick={close} className="w-full">
            {ctaLabel}
          </Button>
        </Container>
      </div>
    </header>
  );
}
