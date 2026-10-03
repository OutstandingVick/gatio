import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Emphasis, stripEmphasis } from "@/components/ui/Emphasis";
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

const DETAILS = [
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Office" },
  { key: "officeHours", label: "Hours" },
] as const;

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const topics = contact?.topics?.filter(Boolean) as string[] | undefined;

  const value = (key: (typeof DETAILS)[number]["key"]) => {
    const v = settings?.[key];
    if (!v) return <span className="text-fg-faint">[{key === "officeHours" ? "HOURS" : key.toUpperCase()}]</span>;
    if (key === "email") return <a href={`mailto:${v}`} className="hover:text-gold">{v}</a>;
    if (key === "phone") return <a href={`tel:${v.replace(/[^\d+]/g, "")}`} className="hover:text-gold">{v}</a>;
    return <span className="whitespace-pre-line">{v}</span>;
  };

  return (
    <Container className="grid gap-14 pt-32 pb-20 md:pt-40 md:pb-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <div className="flex flex-col gap-12">
        <div>
          <p className="label text-gold">Contact</p>
          <h1 className="mt-5 text-5xl md:text-7xl">
            <Emphasis text={contact?.headline || "Let's talk about *your market.*"} blossomColor="none" />
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-fg-muted">{contact?.intro || "[CONTACT INTRO]"}</p>
        </div>
        <dl className="border-t border-rule">
          {DETAILS.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-[100px_minmax(0,1fr)] gap-4 border-b border-rule py-4">
              <dt className="label pt-1 text-gold">{label}</dt>
              <dd className="text-lg break-words">{value(key)}</dd>
            </div>
          ))}
        </dl>
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
