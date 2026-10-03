import { ArrowLink } from "@/components/ui/ArrowLink";
import { Emphasis } from "@/components/ui/Emphasis";
import { Section } from "@/components/ui/Section";

type WhoWeAreProps = { heading?: string | null; body?: string | null; quote?: string | null; attribution?: string | null };

export function WhoWeAre({ heading, body, quote, attribution }: WhoWeAreProps) {
  const paragraphs = (body || "[WHO WE ARE]").split(/\n\s*\n/).filter(Boolean);
  return (
    <Section labelledBy="who-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        <div>
          <p className="label text-gold">Who we are</p>
          <h2 id="who-title" className="mt-5 max-w-[14ch] text-5xl md:text-6xl">
            <Emphasis text={heading || "We turn *messy markets* into clear answers."} blossomColor="none" />
          </h2>
        </div>
        <div>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-fg-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {quote && (
            <figure className="mt-12 border-t border-rule pt-10">
              <blockquote className="font-serif text-3xl leading-snug font-medium italic md:text-4xl">
                <p>
                  <span aria-hidden="true" className="text-gold">
                    &ldquo;
                  </span>
                  {quote}
                  <span aria-hidden="true" className="text-gold">
                    &rdquo;
                  </span>
                </p>
              </blockquote>
              {attribution && <figcaption className="label mt-6 text-gold">{attribution}</figcaption>}
            </figure>
          )}
          <ArrowLink href="/about" className="mt-12">
            How we work
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
