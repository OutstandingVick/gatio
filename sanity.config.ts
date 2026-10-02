"use client";

/**
 * Sanity Studio config, mounted at /studio by src/app/studio/[[...tool]]/page.tsx.
 */
import { DashboardIcon } from "@sanity/icons/Dashboard";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";
import { Dashboard } from "./src/sanity/studio/Dashboard";
import { studioTheme } from "./src/sanity/studio/theme";
import { SINGLETON_TYPES, structure } from "./src/sanity/structure";

export default defineConfig({
  name: "gatio",
  title: "Gatio",
  basePath: "/studio",
  theme: studioTheme,
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    // Singletons can only be edited and published, never duplicated or deleted.
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
  tools: (prev) => [{ name: "dashboard", title: "Dashboard", icon: DashboardIcon, component: Dashboard }, ...prev],
  plugins: [
    structureTool({ title: "Content", structure }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
