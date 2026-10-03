import type { Metadata } from "next";
import { Divisions } from "@/components/editorial/Divisions";
import { CapabilityCta } from "@/components/sections/home/CapabilityCta";
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
        scene="harbour"
        title="Everything you need to *understand a market.*"
        description="[SERVICES DESCRIPTION: how engagements are scoped, quoted and led.]"
      />
      {services?.length ? (
        <Divisions services={services} ctaLabel={settings?.ctaLabel} />
      ) : (
        <Container className="py-24 text-center text-fg-muted">No services published yet.</Container>
      )}
      <Container className="flex justify-center border-t border-rule py-16">
        <CapabilityCta pdfUrl={settings?.capabilityPdfUrl} />
      </Container>
    </>
  );
}
