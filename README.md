# Outbound Engine

AI-powered cold email machine. Generates personalized multi-step sequences per prospect, A/B tests them, and exports to Instantly.

## Stack

- Next.js 14 (app router) + TypeScript
- Supabase Postgres (via Prisma ORM)
- Anthropic Claude for sequence generation
- Deployed on Vercel

## Build phases

1. **Project scaffold + Vercel deploy** ← current
2. Product context engine (upload + understand your product)
3. Prospect ingestion (CSV upload)
4. AI sequence writer (personalized 4-step sequences)
5. Dynamic landing pages (per-prospect)
6. Instantly export + A/B variant engine
7. Reply tracking + optimisation loop
8. Budget engine + Apollo auto-pull

## Local setup

```bash
npm install
cp .env.example .env   # fill in your values
npx prisma generate
npx prisma db push     # sync schema to Supabase
npm run dev
```

## Deploy (Vercel)

1. Import this repo in Vercel.
2. Add the env vars from `.env.example` in Project Settings → Environment Variables.
3. Vercel runs `prisma generate && next build` automatically (see `vercel.json`).
4. After first deploy, run `npx prisma db push` against your Supabase DB to create tables.

## Required environment variables

See `.env.example`. You need a Supabase project (free tier works) and an Anthropic API key.
