"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { TocItem } from "@/lib/portableText";

/** Sticky contents list that highlights the section currently being read. */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!headings.length) return;

    // The active section is the last heading that has scrolled above 30% of the viewport.
    const update = () => {
      const line = window.innerHeight * 0.3;
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };

    const observer = new IntersectionObserver(update, { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] });
    headings.forEach((h) => observer.observe(h));
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav aria-labelledby="toc-title" className="sticky top-8">
      <h2 id="toc-title" className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Contents
      </h2>
      <ol className="flex flex-col border-l border-line">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pr-2 text-sm leading-snug hover:text-ink",
                  item.level === 3 ? "pl-7" : "pl-4",
                  isActive ? "border-accent font-medium text-ink" : "border-transparent text-ink-muted",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
