import { Blossom } from "@/components/ui/Blossom";
import { Container } from "@/components/ui/Container";

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

/** Founder's note: a large quote on a lime card with the founder's name and role. */
export function FounderNote({ quote, name, role }: { quote?: string | null; name?: string | null; role?: string | null }) {
  if (!quote) return null;
  return (
    <section aria-labelledby="founder-title" className="py-16 md:py-24">
      <Container>
        <figure className="relative overflow-hidden rounded-[var(--radius-panel)] bg-lime px-7 py-12 md:px-16 md:py-16">
          <Blossom color="var(--ink)" className="absolute -right-10 -bottom-10 size-48 opacity-[0.06]" />
          <h2 id="founder-title" className="text-sm font-bold tracking-normal">
            A note from the founder
          </h2>
          <blockquote className="relative mt-6 max-w-[28ch] text-3xl leading-[1.15] font-extrabold tracking-[-0.035em] md:text-[44px]">
            <p>&ldquo;{quote}&rdquo;</p>
          </blockquote>
          {name && (
            <figcaption className="relative mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="flex size-14 items-center justify-center rounded-full bg-ink text-lg font-extrabold text-lime">
                {initials(name) || "G"}
              </span>
              <span>
                <span className="block font-bold">{name}</span>
                {role && <span className="block text-sm text-ink/70">{role}</span>}
              </span>
            </figcaption>
          )}
        </figure>
      </Container>
    </section>
  );
}
