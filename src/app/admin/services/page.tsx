import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { ListScreen } from "@/components/admin/ListScreen";

export const metadata: Metadata = { title: "Services" };

export default function ServicesAdmin() {
  return (
    <ListScreen type="service" title="Services" singular="service" icon={Briefcase} description="What the agency offers. Shown on Home and the Services page." columns={["status", "updated"]} />
  );
}
