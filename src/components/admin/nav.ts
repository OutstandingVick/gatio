import {
  BookOpen,
  Briefcase,
  FileText,
  Images,
  LayoutDashboard,
  Newspaper,
  PanelsTopLeft,
  Settings,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

export const NAV: { title: string; items: NavItem[] }[] = [
  {
    title: "Workspace",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/pages", label: "Pages", icon: PanelsTopLeft },
      { href: "/admin/reports", label: "Reports", icon: FileText },
      { href: "/admin/articles", label: "Articles", icon: Newspaper },
      { href: "/admin/services", label: "Services", icon: Briefcase },
      { href: "/admin/media", label: "Media", icon: Images },
    ],
  },
  {
    title: "Library",
    items: [
      { href: "/admin/authors", label: "Authors", icon: BookOpen },
      { href: "/admin/topics", label: "Topics", icon: Tags },
    ],
  },
  {
    title: "Settings",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
      { href: "/admin/users", label: "Users", icon: Users },
    ],
  },
];
