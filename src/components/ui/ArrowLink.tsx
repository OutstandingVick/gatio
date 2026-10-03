import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** "Learn more ›" style text link; the chevron nudges right on hover. */
export function ArrowLink({
  href,
  children,
  dark = false,
  className,
}: {
  href: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-1 text-[15px] font-semibold",
        dark ? "text-white hover:text-lime" : "text-ink hover:text-accent",
        className,
      )}
    >
      {children}
      <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}
