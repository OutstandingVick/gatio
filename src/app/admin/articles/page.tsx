import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { ListScreen } from "@/components/admin/ListScreen";

export const metadata: Metadata = { title: "Articles" };

export default function ArticlesAdmin() {
  return (
    <ListScreen type="article" title="Articles" singular="article" icon={Newspaper} description="Shorter pieces published under Insights." columns={["topic", "status", "people", "updated"]} />
  );
}
