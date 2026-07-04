# Fit 60

Sixty days to build it. A lifetime to live it.

A 60-day guide and lifelong tool for training, eating, sleeping, and living well. No accounts, no ads, no upsells. Evidence-backed where it matters; opinion labeled where it doesn't.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- localStorage for calculator, split, and diet preferences

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publish to GitHub Pages

This repo deploys automatically when you push to `main`. You also need to turn on Pages in the repo settings:

1. On GitHub, open **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”)
3. Push to `main` — the **Deploy to GitHub Pages** workflow builds the site and publishes it

The live site will be at **https://gavin-morris-04.github.io/Momentum/** (project Pages URL for this repo name).

To test the production build locally (visit **http://localhost:3000/Momentum/** — note the `/Momentum/` path):

```bash
npm run preview:pages
```

## Structure

- **Phase 1 (Days 1–28):** Build
- **Phase 2 (Days 29–56):** Grow
- **Finish (Days 57–60):** Look back, then forward
- **Day 61+:** Yours now

## Customize

All content lives in `src/data/`. Calculator logic in `src/lib/calories.ts`. Meal portion solver in `src/lib/mealBuilder.ts`.

## Build checklist notes

- Calculator matches calculator.net’s three formulas, six multipliers (1.2 / 1.375 / 1.465 / 1.55 / 1.725 / 1.95), five goal tiers, and 1,200 / 1,500 kcal floors
- Meal builder targets ±3% of calorie target across goal tiers for test users at 130 lb, 182 lb, and 240 lb
- Sticky in-page nav works on all long pages (Lift, Diet, Run, Sleep, Life)
- Splits render as tabs with persisted selection (`fit60:splitId`)
- Every long page has intro copy, a three-things callout, section transitions, and exactly one pull quote
- Tip groups collapse beyond 6 per group; no TIP index numbers
- Voice pass applied — copy reads conversational, not spec-like
- `prefers-reduced-motion` disables section reveal animations
- Nav order: Home / Lift / Diet / Run / Sleep / Life / Supplements / Calendar
- `/sleep` and updated `/references` (Sleep group) are in the sitemap
