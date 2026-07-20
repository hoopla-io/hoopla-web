# Hoopla Web

Marketing site + partner pages for [Hoopla](https://hoopla.uz) — order coffee, pick it up, earn cashback. Built with [Astro](https://astro.build), trilingual (uz / ru / en).

## Stack

- **Astro 5** with the Node adapter (standalone) — landing, contact, and legal pages are prerendered static HTML; `/[locale]/shop/[partnerId]` is server-rendered per request with live data from `api.hoopla.uz`.
- **Tailwind CSS 4** (`@tailwindcss/vite`) plus a custom design system in `src/styles/global.css`.
- Vanilla `<script>` islands only — no client framework.

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/ (static client + Node server)
npm start          # node ./dist/server/entry.mjs on :3000
```

## Environment

Copy `.env.example` to `.env`. Variables are read at **runtime** via `process.env` (do not switch them to `import.meta.env` — Vite would inline them at build time):

| Variable | Purpose |
| --- | --- |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | newsletter signups (`POST /api/newsletter`) |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | contact form sender (`POST /api/send-email`) |
| `CONTACT_RECIPIENT` | contact form recipient (defaults to `GMAIL_USER`) |

## Deploy

`docker compose up -d --build` (what the Jenkins pipeline runs on the VPS). The compose file injects `.env` via `env_file`, and the image serves on port 3000.

## Structure

```
src/
  pages/[locale]/          index, contact, terms-of-use, privacy-policy
  pages/[locale]/shop/     [partnerId].astro  (SSR, live API)
  pages/api/               newsletter.ts, send-email.ts
  components/              Header, Hero, Features, Cashback, Partners, OurStory, Footer, DeepLinkSheet
  i18n/                    uz.json, ru.json, en.json + helpers
  data/                    terms.ts, privacy.ts (legal HTML per locale)
  styles/global.css        design tokens, fonts, animations
```
