import { Blossom } from "@/components/ui/Blossom";

/** Scrolling strip of capabilities. The list is duplicated for a seamless loop; the copy is hidden from screen readers. */
export function Marquee({ items }: { items: string[] }) {
  const list = items.filter(Boolean);
  if (!list.length) return null;

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {list.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-6 pr-6 text-2xl font-extrabold tracking-[-0.03em] whitespace-nowrap md:text-3xl">
          {item}
          <Blossom color="var(--lime)" className="size-6" />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="What we cover" className="marquee mx-2 overflow-hidden rounded-[24px] bg-ink py-6 text-white md:mx-3">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
