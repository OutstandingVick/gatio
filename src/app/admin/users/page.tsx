import type { Metadata } from "next";
import { ExternalLink, ShieldCheck, Users } from "lucide-react";
import { Panel } from "@/components/admin/Panel";
import { projectId } from "@/sanity/env";

export const metadata: Metadata = { title: "Users" };

const ROLES = [
  { role: "Administrator", text: "Full access, including inviting people and changing project settings." },
  { role: "Editor", text: "Create, edit and publish all content." },
  { role: "Viewer", text: "Read-only access to the Studio." },
];

export default function UsersAdmin() {
  const manage = `https://www.sanity.io/manage/project/${projectId}/members`;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end justify-between gap-4 px-1 py-2">
        <div>
          <h1 className="text-2xl">Users</h1>
          <p className="mt-1 text-sm text-admin-muted">People who can sign in to edit the site. Invitations and roles are handled by Sanity.</p>
        </div>
        <a href={manage} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center gap-2 rounded-lg bg-admin-blue px-3.5 text-sm font-medium text-white hover:bg-[#3f7bf0]">
          <ExternalLink className="size-4" aria-hidden="true" /> Manage users<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <Panel title="Roles" icon={ShieldCheck}>
        <ul className="divide-y divide-admin-line">
          {ROLES.map((r) => (
            <li key={r.role} className="flex items-start gap-3 px-4 py-4">
              <Users className="mt-0.5 size-4 text-admin-blue" aria-hidden="true" />
              <div>
                <p>{r.role}</p>
                <p className="text-sm text-admin-muted">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
