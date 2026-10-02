import type { Metadata } from "next";
import { Tags } from "lucide-react";
import { ListScreen } from "@/components/admin/ListScreen";

export const metadata: Metadata = { title: "Topics" };

export default function TopicsAdmin() {
  return (
    <ListScreen type="topic" title="Topics" singular="topic" icon={Tags} description="Research areas. Each sets the colour of its reports and covers." columns={["count", "updated"]} />
  );
}
