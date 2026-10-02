import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { SiteSettings } from "@/sanity/types";
import { Container } from "./Container";

const link = "inline-flex items-center gap-2 text-white/80 hover:text-white";

/** Thin navy bar above the navbar: contact details and a quote link. Desktop only. */
export function UtilityBar({ settings }: { settings?: SiteSettings | null }) {
  const phoneHref = settings?.phone ? `tel:${settings.phone.replace(/[^\d+]/g, "")}` : null;
  return (
    <div className="hidden bg-ink text-[13px] text-white md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {settings?.email ? (
            <a href={`mailto:${settings.email}`} className={link}>
              <Mail className="size-3.5" aria-hidden="true" />
              {settings.email}
            </a>
          ) : (
            <span className={link}>
              <Mail className="size-3.5" aria-hidden="true" />
              [EMAIL]
            </span>
          )}
          {phoneHref ? (
            <a href={phoneHref} className={link}>
              <Phone className="size-3.5" aria-hidden="true" />
              {settings?.phone}
            </a>
          ) : (
            <span className={link}>
              <Phone className="size-3.5" aria-hidden="true" />
              [PHONE]
            </span>
          )}
        </div>
        <Link href="/contact" className="font-semibold text-lime hover:underline">
          Request a quote <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </div>
  );
}
