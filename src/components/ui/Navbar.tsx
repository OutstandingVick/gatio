"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const NAV_LINKS = [
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
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
    <header className="relative z-40 border-b border-line bg-cream">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo onClick={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "text-[15px] font-medium text-ink-muted underline-offset-8 hover:text-ink hover:underline",
                    isActive(link.href) && "text-ink underline decoration-accent decoration-2",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" className="hidden sm:inline-flex">
            Work with us
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-12 items-center justify-center rounded-full border-[1.5px] border-ink lg:hidden"
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
      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-cream lg:hidden"
      >
        <Container className="flex min-h-full flex-col gap-10 py-10">
          <nav aria-label="Mobile">
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={close}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="flex items-center justify-between py-5 font-display text-4xl tracking-[-0.03em]"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-accent">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href="/contact" variant="accent" size="lg" onClick={close} className="w-full">
            Work with us
          </Button>
        </Container>
      </div>
    </header>
  );
}
