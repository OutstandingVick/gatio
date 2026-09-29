import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import SiteNotFound from "./(site)/not-found";

/** Unmatched URLs render outside the (site) layout, so wrap with the chrome here. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <SiteNotFound />
      </main>
      <Footer />
    </>
  );
}
