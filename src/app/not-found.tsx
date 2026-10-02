import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { getSettings } from "@/sanity/settings";
import SiteNotFound from "./(site)/not-found";

/** Unmatched URLs render outside the (site) layout, so wrap with the chrome here. */
export default async function NotFound() {
  const settings = await getSettings();
  return (
    <>
      <Navbar ctaLabel={settings?.ctaLabel} />
      <main id="main" className="flex-1">
        <SiteNotFound />
      </main>
      <Footer settings={settings} />
    </>
  );
}
