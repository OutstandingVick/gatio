import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { AuthorDetail } from "@/sanity/types";

function initials(name: string | null) {
  return (name ?? "?")
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Photo, name, role and bio for each author. */
export function AuthorBox({ authors }: { authors: AuthorDetail[] }) {
  if (!authors.length) return null;

  return (
    <section aria-labelledby="authors-title">
      <h2 id="authors-title" className="mb-6 text-3xl">
        {authors.length > 1 ? "About the authors" : "About the author"}
      </h2>
      <ul className="grid border-t border-rule md:grid-cols-2">
        {authors.map((a) => (
          <li key={a._id} className="flex gap-5 border-b border-rule py-6 md:pr-6">
            {a.photo?.asset ? (
              <Image
                src={urlFor(a.photo).width(160).height(160).fit("crop").url()}
                alt=""
                width={80}
                height={80}
                className="size-16 shrink-0 rounded-full bg-surface-2 object-cover grayscale"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-16 shrink-0 items-center justify-center rounded-full border border-gold/70 font-serif text-xl font-semibold text-gold"
              >
                {initials(a.name)}
              </span>
            )}
            <div>
              <p className="font-serif text-2xl font-semibold">{a.name}</p>
              {a.role && <p className="label mt-1 text-fg-faint">{a.role}</p>}
              {a.bio && <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{a.bio}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
