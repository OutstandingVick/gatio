function initials(name: string) {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Centred founder's note: large serif quote, gold-outlined monogram, tracked name and role. */
export function FounderNote({ quote, name, role }: { quote?: string | null; name?: string | null; role?: string | null }) {
  if (!quote) return null;
  return (
    <section aria-labelledby="founder-title" className="border-t border-rule bg-surface px-5 py-24 text-center md:py-36">
      <h2 id="founder-title" className="label font-sans text-gold">
        A note from the founder
      </h2>
      <blockquote className="mx-auto mt-8 max-w-[26ch] font-serif text-3xl leading-[1.25] font-medium md:text-5xl">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>
      {name && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <span aria-hidden="true" className="flex size-16 items-center justify-center rounded-full border border-gold font-serif text-xl font-semibold text-gold">
            {initials(name) || "G"}
          </span>
          <p className="font-serif text-xl font-semibold">{name}</p>
          {role && <p className="label -mt-2 text-fg-muted">{role}</p>}
        </div>
      )}
    </section>
  );
}
