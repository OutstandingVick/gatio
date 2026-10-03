import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Emphasis, stripEmphasis } from "@/components/ui/Emphasis";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { sanityFetch } from "@/sanity/client";
import { contactPageQuery } from "@/sanity/queries";
import { getSettings } from "@/sanity/settings";

function getContact() {
  return sanityFetch({ query: contactPageQuery, tags: ["contactPage"] });
}

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return {
    title: contact?.seo?.title || "Contact",
    description: contact?.seo?.description || contact?.intro || stripEmphasis(contact?.headline) || undefined,
  };
}

const CARDS = [
  { key: "email", label: "Email", icon: Mail, tone: "bg-sky text-accent" },
  { key: "phone", label: "Phone", icon: Phone, tone: "bg-mint text-teal" },
  { key: "address", label: "Office", icon: MapPin, tone: "bg-blush text-plum" },
  { key: "officeHours", label: "Hours", icon: Clock, tone: "bg-butter text-mustard-text" },
] as const;

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const topics = contact?.topics?.filter(Boolean) as string[] | undefined;

  const value = (key: (typeof CARDS)[number]["key"]) => {
    const v = settings?.[key];
    if (!v) return <span className="text-ink-muted">[{key === "officeHours" ? "HOURS" : key.toUpperCase()}]</span>;
    if (key === "email") return <a href={`mailto:${v}`} className="hover:text-accent hover:underline">{v}</a>;
    if (key === "phone") return <a href={`tel:${v.replace(/[^\d+]/g, "")}`} className="hover:text-accent hover:underline">{v}</a>;
    return <span className="whitespace-pre-line">{v}</span>;
  };

  return (
    <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
      <div className="flex flex-col gap-10">
        <div>
          <Eyebrow tone="accent">Contact</Eyebrow>
          <h1 className="mt-6 text-5xl md:text-[64px] md:leading-[1.02]">
            <Emphasis text={contact?.headline || "Let's talk about *your market.*"} />
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-muted">{contact?.intro || "[CONTACT INTRO]"}</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {CARDS.map(({ key, label, icon: Icon, tone }) => (
            <li key={key} className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-paper p-5">
              <span className={`flex size-10 items-center justify-center rounded-full ${tone}`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-semibold text-ink-muted">{label}</span>
              <span className="text-[15px] font-semibold break-words">{value(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="sr-only">Send us a message</h2>
        <ContactForm
          topics={topics?.length ? topics : ["Commission research", "Media enquiry", "Partnership", "Something else"]}
          successMessage={contact?.successMessage || "Thanks, we'll be in touch soon."}
        />
      </div>
    </Container>
  );
}
