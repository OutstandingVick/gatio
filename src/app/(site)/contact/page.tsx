import type { Metadata } from "next";
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

const detailLink = "underline decoration-line decoration-2 underline-offset-4 hover:decoration-accent";

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContact(), getSettings()]);
  const topics = contact?.topics?.filter(Boolean) as string[] | undefined;

  return (
    <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      <div className="flex flex-col gap-10">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 text-5xl md:text-7xl">
            <Emphasis text={contact?.headline || "Let's talk about *your market.*"} />
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-ink-muted">{contact?.intro || "[CONTACT INTRO]"}</p>
        </div>

        <dl className="grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Email</dt>
            <dd className="mt-2 text-lg">
              {settings?.email ? (
                <a href={`mailto:${settings.email}`} className={detailLink}>
                  {settings.email}
                </a>
              ) : (
                "[EMAIL]"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Phone</dt>
            <dd className="mt-2 text-lg">
              {settings?.phone ? (
                <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`} className={detailLink}>
                  {settings.phone}
                </a>
              ) : (
                "[PHONE]"
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Office</dt>
            <dd className="mt-2 whitespace-pre-line text-lg">{settings?.address || "[ADDRESS]"}</dd>
          </div>
          {settings?.officeHours && (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Hours</dt>
              <dd className="mt-2 text-lg">{settings.officeHours}</dd>
            </div>
          )}
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
