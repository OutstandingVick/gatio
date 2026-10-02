import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { Container } from "./Container";

type FooterLink = { href: string; label: string; external?: boolean };

const BASE_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/research", label: "Research" },
      { href: "/insights", label: "Insights" },
      { href: "/research?topic=payments", label: "Topics" },
    ],
  },
  {
    title: "Agency",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const linkClass = "text-cream/80 underline-offset-4 hover:text-cream hover:underline";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const socials: FooterLink[] = (settings?.socials ?? [])
    .filter((s) => s.label && s.url)
    .map((s) => ({ href: s.url!, label: s.label!, external: true }));
  const columns = socials.length ? [...BASE_COLUMNS, { title: "Follow", links: socials }] : BASE_COLUMNS;

  return (
    <footer className="mt-auto bg-ink text-cream">
      <Container className="flex flex-col gap-16 pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-4">
            <p className="max-w-[32ch] text-cream/80">{settings?.positioning || "[AGENCY POSITIONING]"}</p>
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className={`${linkClass} w-fit`}>
                {settings.email}
              </a>
            )}
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-mustard">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} className={linkClass} rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p
          aria-hidden="true"
          className="font-display text-[26vw] leading-[0.8] tracking-[-0.05em] select-none lg:text-[300px]"
        >
          Gatio<span className="text-accent">.</span>
        </p>

        <div className="flex flex-col gap-4 border-t border-cream/20 pt-6 text-sm text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings?.copyright || "Gatio"}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className={linkClass}>Privacy</Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>Terms</Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
