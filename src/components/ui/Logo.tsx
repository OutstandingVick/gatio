import Link from "next/link";
import { cn } from "@/lib/cn";

/** Navy circle with an orange quarter segment. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={cn("size-8", className)}>
      <circle cx="16" cy="16" r="16" fill="#14213D" />
      <path d="M16 16 V0 A16 16 0 0 1 32 16 Z" fill="#C2410C" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn("inline-flex items-center gap-2.5", className)} aria-label="Gatio home">
      <LogoMark />
      <span className="font-display text-2xl leading-none tracking-[-0.03em]">Gatio</span>
    </Link>
  );
}
