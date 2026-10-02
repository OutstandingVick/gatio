import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Home, Mail, PanelsTopLeft, PenLine, Users } from "lucide-react";
import { Panel } from "@/components/admin/Panel";
import { studioEditHref, updatedLabel } from "@/lib/admin";
import { adminFetch } from "@/sanity/adminClient";
import { adminPagesQuery } from "@/sanity/adminQueries";

export const metadata: Metadata = { title: "Pages" };

const PAGES = [
  { id: "homePage", title: "Home", href: "/", icon: Home, text: "Hero, section headings and newsletter copy." },
  { id: "aboutPage", title: "About", href: "/about", icon: Users, text: "Story, figures, how we work and the team." },
  { id: "contactPage", title: "Contact", href: "/contact", icon: Mail, text: "Headline, intro, enquiry types and the thank-you message." },
];

export default async function PagesAdmin() {
  const docs = (await adminFetch(adminPagesQuery)) ?? [];
  const updated = new Map(docs.map((d) => [d._id, d._updatedAt]));

  return (
    <div className="flex flex-col gap-3">
      <div className="px-1 py-2">
        <h1 className="text-2xl">Pages</h1>
        <p className="mt-1 text-sm text-admin-muted">Fixed pages of the website. Each has one document you edit in place.</p>
      </div>
      <Panel title="Website pages" icon={PanelsTopLeft} insetClassName="p-3">
        <ul className="grid gap-3 md:grid-cols-3">
          {PAGES.map(({ id, title, href, icon: Icon, text }) => (
            <li key={id} className="flex flex-col gap-4 rounded-xl border border-admin-line bg-admin-panel p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-admin-raised">
                  <Icon className="size-5 text-admin-blue" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-base">{title}</h2>
                  <p className="text-xs text-admin-muted">
                    {updated.has(id) ? `Updated ${updatedLabel(updated.get(id)!)}` : "Not created yet"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-admin-muted">{text}</p>
              <div className="mt-auto flex gap-2">
                <Link
                  href={studioEditHref(id, id)}
                  className="flex h-9 flex-1 items-center justify-center gap-2 rounded-lg bg-admin-blue text-sm font-medium text-white hover:bg-[#3f7bf0]"
                >
                  <PenLine className="size-4" aria-hidden="true" /> Edit<span className="sr-only"> {title} page</span>
                </Link>
                <Link
                  href={href}
                  target="_blank"
                  className="flex h-9 items-center gap-2 rounded-lg border border-admin-line bg-admin-raised px-3 text-sm hover:bg-[#2c2c2c]"
                >
                  <ExternalLink className="size-4" aria-hidden="true" /> View<span className="sr-only"> {title} page (opens in a new tab)</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
