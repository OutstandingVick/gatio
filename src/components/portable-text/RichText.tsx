import Image from "next/image";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { headingIdMap } from "@/lib/portableText";
import type { ColorKey } from "@/lib/topics";
import { urlFor } from "@/sanity/image";
import type { Chart as ChartData, PullQuote as PullQuoteData, RichText as RichTextValue, SimpleText } from "@/sanity/types";
import { Chart } from "./Chart";
import { PullQuote } from "./PullQuote";

type ImageValue = Extract<RichTextValue[number], { _type: "image" }>;

/** Asset refs look like `image-<id>-1200x800-jpg`. */
function dimensions(ref: string | undefined) {
  const match = ref?.match(/-(\d+)x(\d+)-/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : { width: 1600, height: 1000 };
}

function BodyImage({ value }: { value: ImageValue }) {
  if (!value.asset?._ref) return null;
  const { width, height } = dimensions(value.asset._ref);
  const w = Math.min(width, 1360);
  return (
    <figure className="my-12">
      <Image
        src={urlFor(value).width(w).fit("max").url()}
        alt={value.alt ?? ""}
        width={w}
        height={Math.round((height / width) * w)}
        sizes="(min-width: 768px) 680px, 100vw"
        className="h-auto w-full rounded-[var(--radius-card)] bg-sand"
      />
      {value.caption && <figcaption className="mt-3 text-sm text-ink-muted">{value.caption}</figcaption>}
    </figure>
  );
}

function components(ids: Map<string, string>, color: ColorKey): PortableTextComponents {
  return {
    block: {
      normal: ({ children }) => <p className="my-5">{children}</p>,
      h2: ({ children, value }) => (
        <h2 id={value._key ? ids.get(value._key) : undefined} className="mt-14 mb-5 scroll-mt-32 text-[28px] md:text-[34px]">
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 id={value._key ? ids.get(value._key) : undefined} className="mt-10 mb-4 scroll-mt-32 text-xl md:text-2xl">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 border-l-4 border-accent pl-5 text-xl font-semibold">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6 marker:text-accent">{children}</ul>,
      number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6 marker:text-ink-muted">{children}</ol>,
    },
    marks: {
      link: ({ children, value }) => {
        const href: string = value?.href ?? "#";
        const external = /^https?:/.test(href);
        return (
          <a
            href={href}
            className="font-semibold text-accent underline decoration-accent/30 decoration-2 underline-offset-4 hover:decoration-accent"
            {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
          >
            {children}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </a>
        );
      },
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    },
    types: {
      image: ({ value }: { value: ImageValue }) => <BodyImage value={value} />,
      pullQuote: ({ value }: { value: PullQuoteData }) => <PullQuote value={value} />,
      chart: ({ value }: { value: ChartData }) => <Chart value={value} color={color} />,
    },
  };
}

type RichTextProps = {
  value: RichTextValue | SimpleText | null | undefined;
  /** Topic colour used for charts. */
  color?: ColorKey;
  className?: string;
};

/** Portable Text body at a comfortable reading width. */
export function RichText({ value, color = "accent", className }: RichTextProps) {
  if (!value?.length) return null;
  return (
    <div className={className ?? "max-w-[680px] text-[17px] leading-[1.75] text-ink/90"}>
      <PortableText value={value as PortableTextBlock[]} components={components(headingIdMap(value), color)} />
    </div>
  );
}
