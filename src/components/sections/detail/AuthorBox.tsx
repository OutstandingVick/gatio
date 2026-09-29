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
    <section aria-labelledby="authors-title" className="border-t border-line pt-10">
      <h2 id="authors-title" className="mb-8 text-3xl">
        {authors.length > 1 ? "About the authors" : "About the author"}
      </h2>
      <ul className="grid gap-8 md:grid-cols-2">
        {authors.map((a) => (
          <li key={a._id} className="flex gap-5">
            {a.photo?.asset ? (
              <Image
                src={urlFor(a.photo).width(160).height(160).fit("crop").url()}
                alt=""
                width={80}
                height={80}
                className="size-20 shrink-0 rounded-full bg-sand object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="flex size-20 shrink-0 items-center justify-center rounded-full bg-ink font-display text-2xl text-cream"
              >
                {initials(a.name)}
              </span>
            )}
            <div>
              <p className="font-display text-xl tracking-[-0.02em]">{a.name}</p>
              {a.role && <p className="text-sm text-ink-muted">{a.role}</p>}
              {a.bio && <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{a.bio}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
