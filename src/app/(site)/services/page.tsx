import type { Metadata } from "next";
import { ServiceCard } from "@/components/sections/services/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { sanityFetch } from "@/sanity/client";
import { servicesQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Services",
  description: "[SERVICES DESCRIPTION]",
};

export default async function ServicesPage() {
  const services = (await sanityFetch({ query: servicesQuery, tags: ["service"] })) ?? [];

  return (
    <>
      <PageHeader title="Services" description="[SERVICES DESCRIPTION]" />
      <Container className="py-10 md:py-14">
        {services.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s._id}>
                <ServiceCard service={s} index={i} headingLevel="h2" />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-muted">No services published yet.</p>
        )}

        <div className="mt-16 flex flex-col items-start gap-6 rounded-[var(--radius-panel)] bg-ink p-8 text-cream md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="max-w-[20ch] text-3xl md:text-4xl [&_em]:text-mustard">
            Not sure which fits? <em>Let&rsquo;s talk.</em>
          </h2>
          <Button href="/contact" variant="accent">
            Get in touch
          </Button>
        </div>
      </Container>
    </>
  );
}
