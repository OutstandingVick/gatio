import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { ListScreen } from "@/components/admin/ListScreen";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsAdmin() {
  return (
    <ListScreen type="report" title="Reports" singular="report" icon={FileText} description="Long-form research published under Research." columns={["topic", "status", "people", "updated"]} />
  );
}
