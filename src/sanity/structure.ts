import { CogIcon } from "@sanity/icons/Cog";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

/** Singleton documents: one fixed document each, edited in place. */
export const SINGLETONS = [
  { type: "homePage", title: "Home", icon: HomeIcon },
  { type: "aboutPage", title: "About", icon: UsersIcon },
  { type: "contactPage", title: "Contact", icon: EnvelopeIcon },
  { type: "siteSettings", title: "Settings", icon: CogIcon },
] as const;

export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

function singleton(S: StructureBuilder, type: string, title: string, icon: (typeof SINGLETONS)[number]["icon"]) {
  return S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));
}

/** Studio desk: Pages, Posts, Services, Settings. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Pages")
            .items(SINGLETONS.filter((s) => s.type !== "siteSettings").map((s) => singleton(S, s.type, s.title, s.icon))),
        ),
      S.divider().title("Posts"),
      S.documentTypeListItem("report").title("Reports"),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("topic").title("Topics"),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.divider(),
      singleton(S, "siteSettings", "Settings", CogIcon),
    ]);
