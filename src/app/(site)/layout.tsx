import { Footer } from "@/components/ui/Footer";
import { SiteHeader } from "@/components/editorial/SiteHeader";
import { getSettings } from "@/sanity/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-gold px-5 py-3 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <SiteHeader ctaLabel={settings?.ctaLabel} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
