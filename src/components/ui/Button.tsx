import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "outline" | "soft" | "light";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold whitespace-nowrap leading-none tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /** Navy: the default call to action. */
  primary: "bg-ink text-white hover:bg-[#1f2a3d]",
  /** Royal blue: the most important action on a screen. */
  accent: "bg-accent text-white hover:bg-[#2232c4]",
  outline: "border-[1.5px] border-ink/80 bg-transparent text-ink hover:border-ink hover:bg-ink/5",
  /** White on grey: secondary actions on the page background. */
  soft: "bg-paper text-ink shadow-[0_1px_2px_rgb(13_20_33/0.06)] hover:bg-white hover:shadow-[0_2px_8px_rgb(13_20_33/0.08)]",
  /** White on navy sections. */
  light: "bg-white text-ink hover:bg-lime",
};

const sizes: Record<ButtonSize, string> = {
  md: "",
  lg: "min-h-14 px-7 text-base",
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
