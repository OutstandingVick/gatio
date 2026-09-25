export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Falls back to a dummy id so the app builds before a project is configured. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";

export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

/** Server-only read token. Undefined on the client. */
export const readToken = process.env.SANITY_API_READ_TOKEN;
