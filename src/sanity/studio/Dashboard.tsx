import { Box, Button, Card, Container, Flex, Grid, Heading, Stack, Text } from "@sanity/ui";
import { useEffect, useState } from "react";
import { useClient, useProjectId } from "sanity";
import { IntentLink } from "sanity/router";

const COUNT_TYPES = [
  { type: "report", label: "Reports" },
  { type: "article", label: "Articles" },
  { type: "service", label: "Services" },
  { type: "author", label: "Authors" },
  { type: "topic", label: "Topics" },
  { type: "sanity.imageAsset", label: "Images" },
] as const;

const TYPE_LABELS: Record<string, string> = {
  report: "Report",
  article: "Article",
  service: "Service",
  author: "Author",
  topic: "Topic",
  homePage: "Home page",
  aboutPage: "About page",
  contactPage: "Contact page",
  siteSettings: "Settings",
};

type Recent = { _id: string; _type: string; _updatedAt: string; title: string | null };

const timeAgo = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
function ago(iso: string) {
  const mins = Math.round((Date.parse(iso) - Date.now()) / 60000);
  if (Math.abs(mins) < 60) return timeAgo.format(mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return timeAgo.format(hours, "hour");
  return timeAgo.format(Math.round(hours / 24), "day");
}

/** Studio landing screen: content counts, recent edits and quick actions. */
export function Dashboard() {
  const client = useClient({ apiVersion: "2025-09-01" });
  const projectId = useProjectId();
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [recent, setRecent] = useState<Recent[] | null>(null);

  useEffect(() => {
    const countQuery = `{${COUNT_TYPES.map((t) => `"${t.type}": count(*[_type == "${t.type}" && !(_id in path("drafts.**"))])`).join(",")}}`;
    client.fetch<Record<string, number>>(countQuery).then(setCounts);
    client
      .fetch<Recent[]>(
        `*[_type in $types] | order(_updatedAt desc)[0...8]{ _id, _type, _updatedAt, "title": coalesce(title, name) }`,
        { types: Object.keys(TYPE_LABELS) },
      )
      .then(setRecent);
  }, [client]);

  return (
    <Container width={3} padding={5}>
      <Stack gap={5}>
        <Stack gap={3}>
          <Heading size={3}>Dashboard</Heading>
          <Text muted>An overview of the site content. Changes you publish appear on the website within a minute.</Text>
        </Stack>

        <Grid gridTemplateColumns={[2, 3, 6]} gap={3}>
          {COUNT_TYPES.map((t) => (
            <Card key={t.type} padding={4} radius={3} border>
              <Stack gap={3}>
                <Text size={1} muted>
                  {t.label}
                </Text>
                <Heading size={4}>{counts ? (counts[t.type] ?? 0) : "–"}</Heading>
              </Stack>
            </Card>
          ))}
        </Grid>

        <Grid gridTemplateColumns={[1, 1, 2]} gap={4}>
          <Card padding={4} radius={3} border>
            <Stack gap={4}>
              <Heading size={1}>Recently edited</Heading>
              {recent === null ? (
                <Text muted size={1}>Loading…</Text>
              ) : recent.length === 0 ? (
                <Text muted size={1}>Nothing yet.</Text>
              ) : (
                <Stack gap={1}>
                  {recent.map((doc) => (
                    <Card
                      key={doc._id}
                      as={IntentLink}
                      intent="edit"
                      params={{ id: doc._id.replace(/^drafts\./, ""), type: doc._type }}
                      padding={3}
                      radius={2}
                    >
                      <Flex justify="space-between" gap={3}>
                        <Box flex={1}>
                          <Text size={1} weight="medium" textOverflow="ellipsis">
                            {doc.title ?? TYPE_LABELS[doc._type]}
                            {doc._id.startsWith("drafts.") ? " (draft)" : ""}
                          </Text>
                        </Box>
                        <Text size={1} muted>
                          {TYPE_LABELS[doc._type]} · {ago(doc._updatedAt)}
                        </Text>
                      </Flex>
                    </Card>
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>

          <Card padding={4} radius={3} border>
            <Stack gap={4}>
              <Heading size={1}>Quick actions</Heading>
              <Grid gridTemplateColumns={2} gap={2}>
                {[
                  { type: "report", label: "New report" },
                  { type: "article", label: "New article" },
                  { type: "service", label: "New service" },
                  { type: "author", label: "New author" },
                ].map((a) => (
                  <Button
                    key={a.type}
                    as={IntentLink}
                    intent="create"
                    params={{ type: a.type }}
                    text={a.label}
                    mode="ghost"
                  />
                ))}
              </Grid>
              <Stack gap={2}>
                <Button as="a" href="/" target="_blank" rel="noopener" text="View website" tone="primary" />
                <Button
                  as="a"
                  href={`https://www.sanity.io/manage/project/${projectId}/members`}
                  target="_blank"
                  rel="noopener"
                  text="Manage users & roles"
                  mode="ghost"
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Container>
  );
}
