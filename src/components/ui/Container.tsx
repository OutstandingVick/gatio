import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/** Centred content column: max 1280px, 20px gutters on mobile, 80px on desktop. */
export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter)]", className)}>
      {children}
    </Tag>
  );
}
