# Seed content

Placeholder documents for a fresh Sanity dataset. Every value is a `[PLACEHOLDER]` or marked `[SAMPLE]`.

```bash
pnpm exec sanity dataset import scripts/seed/home.ndjson production --replace
```

`--replace` overwrites documents with the same `_id` (here, the Home page singleton) and leaves everything else alone.
