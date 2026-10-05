import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";
import { Container } from "./Container";

type FooterLink = { href: string; label: string; external?: boolean };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
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
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

const link = "text-[15px] text-fg-muted transition-colors hover:text-gold";

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const socials: FooterLink[] = (settings?.socials ?? [])
    .filter((s) => s.label && s.url)
    .map((s) => ({ href: s.url!, label: s.label!, external: true }));

  return (
    <footer className="mt-auto border-t border-rule bg-bg">
      <Container className="flex flex-col gap-16 pt-20 pb-10 md:pt-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[16ch] font-serif text-5xl leading-[1.02] font-semibold md:text-7xl">
            Let&rsquo;s talk about <em className="font-medium text-gold italic">your market.</em>
          </p>
          <Link href="/contact" className="label inline-flex min-h-14 w-fit items-center bg-steel px-9 font-medium text-white transition-colors hover:bg-white hover:text-deep">
            {settings?.ctaLabel || "Work with us"}
          </Link>
        </div>

        <div className="grid gap-10 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h2 className="label font-sans text-gold">Contact</h2>
            <address className="flex flex-col gap-2 text-[15px] not-italic text-fg-muted">
              {settings?.address && <span className="whitespace-pre-line">{settings.address}</span>}
              {settings?.email ? (
                <a href={`mailto:${settings.email}`} className={link}>
                  {settings.email}
                </a>
              ) : (
                <span>[EMAIL]</span>
              )}
              {settings?.phone ? (
                <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className={link}>
                  {settings.phone}
                </a>
              ) : (
                <span>[PHONE]</span>
              )}
            </address>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <h2 className="label font-sans text-gold">{col.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="flex flex-col gap-4">
            <h2 className="label font-sans text-gold">Follow</h2>
            {socials.length ? (
              <ul className="flex flex-col gap-2.5">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-fg-muted">{settings?.positioning || "[AGENCY POSITIONING]"}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-serif text-lg font-semibold tracking-[0.35em] text-gold">
            GATIO
          </Link>
          <p className="label text-fg-faint">
            © {year} {settings?.copyright || "Gatio"} · Spec demo, sample content marked
          </p>
        </div>
      </Container>
    </footer>
  );
}
