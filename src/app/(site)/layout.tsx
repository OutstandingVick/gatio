import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { getSettings } from "@/sanity/settings";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Navbar ctaLabel={settings?.ctaLabel} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
    </>
  );
}
