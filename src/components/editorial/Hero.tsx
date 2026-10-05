import Image from "next/image";
import Link from "next/link";
import { Emphasis } from "@/components/ui/Emphasis";

type HeroProps = {
  headline?: string | null;
  intro?: string | null;
  primaryCta?: string | null;
  secondaryCta?: string | null;
  note?: string | null;
  facts?: string[];
  areas: { title: string; href: string }[];
};

/** Full-bleed hero over the generated Lagos dusk image. */
export function Hero({ headline, intro, primaryCta, secondaryCta, note, facts = [], areas }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <Image
        src="/images/hero-lagos-dusk.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center]"
      />
      {/* Darken the left for legibility, fade into the page at the bottom. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b2533]/90 via-[#0f3142]/60 to-[#12384b]/15" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col px-5 pt-24 pb-10 md:px-8 md:pt-28">
        <div className="flex flex-wrap justify-between gap-3 border-t border-fg/20 pt-3">
          <p className="label text-fg-muted">Gatio · Research &amp; market intelligence</p>
          {facts.length > 0 && <p className="label hidden text-fg-muted md:block">{facts.join(" · ")}</p>}
        </div>

        <div className="flex flex-1 flex-col justify-center py-10">
          <h1 id="hero-title" className="max-w-[14ch] text-[52px] leading-[0.98] sm:text-7xl lg:text-[104px]">
            <Emphasis text={headline || "Research that turns *complex markets* into clear decisions."} blossomColor="none" />
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-fg/80 md:text-xl">{intro || "[AGENCY POSITIONING]"}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/research" className="label inline-flex min-h-12 items-center bg-steel px-7 font-medium text-white transition-colors hover:bg-white hover:text-deep">
              {primaryCta || "Explore research"}
            </Link>
            <Link href="/contact" className="label inline-flex min-h-12 items-center border border-white/60 px-7 text-white transition-colors hover:border-gold hover:text-gold">
              {secondaryCta || "Work with us"} <span aria-hidden="true" className="ml-3">↓</span>
            </Link>
          </div>
          {note && <p className="mt-5 text-sm text-fg-muted">{note}</p>}
        </div>

        {areas.length > 0 && (
          <nav aria-labelledby="areas-label">
            <p id="areas-label" className="label mb-3 text-fg-muted">
              Research areas
            </p>
            <ol className="grid grid-cols-2 border-t border-fg/20 md:grid-cols-3 lg:grid-cols-6">
              {areas.map((a, i) => (
                <li key={a.href} className="border-b border-fg/20">
                  <Link href={a.href} className="group flex items-baseline gap-3 py-3.5">
                    <span className="label text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-lg font-semibold transition-colors group-hover:text-gold">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
