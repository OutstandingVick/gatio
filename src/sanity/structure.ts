import type { StructureResolver } from "sanity/structure";

/** Studio desk: Reports, Articles, Authors, Topics. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("report").title("Reports"),
      S.documentTypeListItem("article").title("Articles"),
      S.divider(),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("topic").title("Topics"),
    ]);
