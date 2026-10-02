import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { Container } from "./Container";
import { Logo } from "./Logo";

type FooterLink = { href: string; label: string; external?: boolean };

const BASE_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/services", label: "Services" },
      { href: "/research", label: "Research" },
      { href: "/insights", label: "Insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/contact", label: "Request a quote" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const linkClass = "text-[15px] text-white/70 hover:text-white";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const socials: FooterLink[] = (settings?.socials ?? [])
    .filter((s) => s.label && s.url)
    .map((s) => ({ href: s.url!, label: s.label!, external: true }));
  const columns = socials.length ? [...BASE_COLUMNS, { title: "Follow", links: socials }] : BASE_COLUMNS;

  return (
    <footer className="mt-auto bg-ink text-white">
      <Container className="flex flex-col gap-14 pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-5">
            <Logo light className="text-white" />
            <p className="max-w-[34ch] text-white/70">{settings?.positioning || "[AGENCY POSITIONING]"}</p>
            <address className="flex flex-col gap-1.5 text-[15px] text-white/70 not-italic">
              {settings?.address && <span className="whitespace-pre-line">{settings.address}</span>}
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="w-fit hover:text-white">
                  {settings.email}
                </a>
              )}
              {settings?.phone && (
                <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className="w-fit hover:text-white">
                  {settings.phone}
                </a>
              )}
            </address>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-4 text-[15px] font-bold tracking-normal text-white">{col.title}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a href={link.href} className={linkClass} rel="noopener noreferrer" target="_blank">
                          {link.label}
                          <span className="sr-only"> (opens in a new tab)</span>
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
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings?.copyright || "Gatio"}. All rights reserved.
          </p>
          <p>A spec demo. Sample content is marked on each page.</p>
        </div>
      </Container>
    </footer>
  );
}
