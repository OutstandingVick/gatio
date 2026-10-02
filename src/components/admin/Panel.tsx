import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Dashboard card: header row on the outer surface, content in a darker inset. */
export function Panel({
  title,
  icon: Icon,
  action,
  children,
  className,
  insetClassName,
  id,
}: {
  title: string;
  icon: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  insetClassName?: string;
  id?: string;
}) {
  const headingId = id ?? `panel-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section aria-labelledby={headingId} className={cn("flex flex-col rounded-2xl border border-admin-line bg-admin-panel p-1.5", className)}>
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 px-2.5 py-1.5">
        <h2 id={headingId} className="flex items-center gap-2 text-[15px]">
          <Icon className="size-4 text-admin-text" aria-hidden="true" />
          {title}
        </h2>
        {action}
      </div>
      <div className={cn("flex-1 rounded-xl border border-admin-line bg-admin-inset", insetClassName)}>{children}</div>
    </section>
  );
}
