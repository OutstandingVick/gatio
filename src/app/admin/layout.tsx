import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { Topbar } from "@/components/admin/Topbar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Gatio admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin min-h-dvh bg-admin-bg font-sans text-admin-text [color-scheme:dark]">
      <AdminShell>
        <Suspense fallback={<div className="h-16 rounded-2xl border border-admin-line bg-admin-shell" />}>
          <Topbar />
        </Suspense>
        <main id="main" className="flex-1 border-admin-line bg-admin-shell p-3 sm:p-4 lg:rounded-2xl lg:border">
          {children}
        </main>
      </AdminShell>
    </div>
  );
}
