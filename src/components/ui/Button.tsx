import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "soft" | "light";
export type ButtonSize = "md" | "lg";

const base =
  "label inline-flex min-h-12 items-center justify-center gap-3 px-7 font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /** Steel blue solid: the main action. Inverts to white on hover. */
  primary: "bg-steel text-white hover:bg-white hover:text-deep",
  /** Alias of primary, kept for existing call sites. */
  accent: "bg-steel text-white hover:bg-white hover:text-deep",
  /** Thin outline: secondary actions. */
  outline: "border border-fg/45 text-fg hover:border-gold hover:text-gold",
  /** Raised surface with a hairline: tertiary actions. */
  soft: "border border-rule bg-surface-2 text-fg hover:border-gold/60 hover:text-gold",
  /** Ivory solid, for use over imagery. */
  light: "bg-white text-deep hover:bg-steel hover:text-white",
};

const sizes: Record<ButtonSize, string> = {
  md: "",
  lg: "min-h-14 px-9",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps | "href"> & { href: string };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Pill button. Renders a Next `<Link>` when given `href`, otherwise a `<button>`. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
