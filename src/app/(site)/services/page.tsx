import type { Metadata } from "next";
import { CapabilityCta } from "@/components/sections/home/CapabilityCta";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { ServiceTile } from "@/components/sections/home/ServicesGrid";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { servicesQuery } from "@/sanity/queries";
import { getSettings } from "@/sanity/settings";

export const metadata: Metadata = {
  title: "Services",
  description: "[SERVICES DESCRIPTION]",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([sanityFetch({ query: servicesQuery, tags: ["service"] }), getSettings()]);

  return (
    <>
      <PageHeader
        eyebrow="Services"
        eyebrowTone="teal"
        title="Everything you need to {blossom} *understand a market.*"
        description="[SERVICES DESCRIPTION: how engagements are scoped, quoted and led.]"
      />
      <Container className="pb-10 md:pb-14">
        {services?.length ? (
          <ul className="grid gap-5 md:grid-cols-2">
            {services.map((s, i) => (
              <li key={s._id} className="flex">
                <ServiceTile service={s} index={i} surface="paper" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-ink-muted">No services published yet.</p>
        )}
        <div className="mt-12 flex justify-center">
          <CapabilityCta pdfUrl={settings?.capabilityPdfUrl} />
        </div>
      </Container>
      <FinalCta heading="Not sure which fits? *Let's talk.*" text="[CTA: describe your question and we'll suggest an approach.]" ctaLabel={settings?.ctaLabel} />
    </>
  );
}
