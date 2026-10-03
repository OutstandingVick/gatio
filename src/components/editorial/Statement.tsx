import { Emphasis } from "@/components/ui/Emphasis";

/** Centred editorial interlude: tiny gold label and one large serif sentence. */
export function Statement({ label, text }: { label: string; text: string }) {
  return (
    <section aria-label={label} className="border-b border-rule px-5 py-24 text-center md:py-36">
      <p className="label text-gold">{label}</p>
      <p className="mx-auto mt-6 max-w-[30ch] font-serif text-3xl leading-[1.25] font-semibold md:text-5xl [&_em]:text-gold [&_em]:italic">
        <Emphasis text={text} blossomColor="none" />
      </p>
    </section>
  );
}
