import { ArrowLink } from "@/components/ui/ArrowLink";
import { Blossom } from "@/components/ui/Blossom";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

type WhoWeAreProps = {
  heading?: string | null;
  body?: string | null;
  quote?: string | null;
  attribution?: string | null;
};

export function WhoWeAre({ heading, body, quote, attribution }: WhoWeAreProps) {
  const paragraphs = (body || "[WHO WE ARE]").split(/\n\s*\n/).filter(Boolean);

  return (
    <Section labelledBy="who-title">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
        <div>
          <SectionHeading id="who-title" eyebrow="Who we are" eyebrowTone="teal" title={heading || "We turn {blossom} *messy markets* into clear answers."} className="mb-8 md:mb-10" />
          <div className="flex max-w-[62ch] flex-col gap-5 text-lg leading-relaxed text-ink-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <ArrowLink href="/about" className="mt-8">
            More about how we work
          </ArrowLink>
        </div>

        {quote && (
          <figure className="relative overflow-hidden rounded-[var(--radius-panel)] bg-blush p-8 md:p-10 lg:mt-20">
            <Blossom color="var(--plum)" className="absolute -top-6 -right-6 size-28 opacity-90" />
            <p className="relative text-sm font-bold text-plum">In our words</p>
            <blockquote className="relative mt-4 text-2xl leading-snug font-extrabold tracking-[-0.03em] md:text-[28px]">
              <p>&ldquo;{quote}&rdquo;</p>
            </blockquote>
            {attribution && <figcaption className="relative mt-6 text-sm font-semibold text-ink-muted">{attribution}</figcaption>}
          </figure>
        )}
      </div>
    </Section>
  );
}
