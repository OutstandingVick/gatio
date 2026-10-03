import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** "EXPLORE RESEARCH →": tracked label with a hairline underline; gold on hover. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "label group inline-flex w-fit items-center gap-2 border-b border-fg/40 pb-1.5 text-fg transition-colors hover:border-gold hover:text-gold",
        className,
      )}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
