import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { ListScreen } from "@/components/admin/ListScreen";

export const metadata: Metadata = { title: "Authors" };

export default function AuthorsAdmin() {
  return (
    <ListScreen type="author" title="Authors" singular="author" icon={BookOpen} description="People credited on reports and articles, and shown on the About page." columns={["count", "updated"]} />
  );
}
