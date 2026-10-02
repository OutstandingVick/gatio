import Link from "next/link";
import { Plus } from "lucide-react";
import { studioCreateHref } from "@/lib/admin";

const OPTIONS = [
  { type: "report", label: "Report" },
  { type: "article", label: "Article" },
  { type: "service", label: "Service" },
  { type: "author", label: "Author" },
  { type: "topic", label: "Topic" },
];

/** Blue "Create new" button with a menu of content types; opens the editor. */
export function CreateMenu() {
  return (
    <details className="group relative">
      <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-lg bg-admin-blue px-3.5 text-sm font-medium text-white hover:bg-[#3f7bf0] [&::-webkit-details-marker]:hidden">
        <Plus className="size-4" aria-hidden="true" />
        Create new
      </summary>
      <ul className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-admin-line bg-admin-raised p-1 shadow-xl shadow-black/40">
        {OPTIONS.map((o) => (
          <li key={o.type}>
            <Link href={studioCreateHref(o.type)} className="block rounded-md px-3 py-2 text-sm hover:bg-[#2f2f2f]">
              New {o.label.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
