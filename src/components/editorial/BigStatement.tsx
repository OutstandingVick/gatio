/** The reference's "One Name. Eight Worlds." moment: two huge serif lines over a dotted list. */
export function BigStatement({ first, second, items }: { first: string; second: string; items: string[] }) {
  return (
    <section aria-label={`${first} ${second}`} className="flex min-h-[80vh] flex-col items-center justify-center border-t border-rule px-5 py-24 text-center">
      <p className="font-serif text-6xl leading-[0.95] font-bold md:text-[128px]">{first}</p>
      <p className="mt-2 font-serif text-6xl leading-[0.95] font-medium text-gold italic md:ml-24 md:text-[128px]">{second}</p>
      {items.length > 0 && (
        <p className="label mx-auto mt-10 max-w-[60ch] leading-[2.2] text-fg-muted">{items.join("  ·  ")}</p>
      )}
    </section>
  );
}
