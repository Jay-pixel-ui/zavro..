# Zavro Solutions

AI-native growth partner — website, brand, marketing, and AI automation engineered as one compounding system. Based in Singapore, working worldwide.

Production site built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion**, and the **Vercel AI SDK**.

## Features

- Single-page marketing site: hero, about, services, marketing solutions, why us, workflow, case studies, testimonials, contact
- **NOVA** — a floating AI chat assistant powered by the AI SDK via Vercel AI Gateway (`/api/chat`), grounded in a company knowledge base (`lib/knowledge-base.ts`)
- Contact form that opens a pre-filled WhatsApp or email message — zero backend to maintain
- Full SEO: metadata, Open Graph, `robots.txt`, `sitemap.xml`, custom 404
- Brand constants centralized in `lib/constants.js` (contact details, social links, nav, imagery)

## Development

```bash
pnpm install
pnpm dev
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `AI_GATEWAY_API_KEY` | Only outside Vercel | AI Gateway auth for the NOVA chatbot. On Vercel deployments OIDC is used automatically. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site URL for SEO (defaults to `https://zavro.vercel.app`). |

## Deploy

Push to `main` or click **Publish** in v0 — the app deploys to Vercel with zero extra configuration.

## Structure

```
app/            # App Router pages, layout, API routes, SEO files
components/     # Landing sections + NOVA chat widget
lib/            # Brand constants, knowledge base, testimonials data
public/images/  # Logo, hero/workflow art, generated imagery
```
