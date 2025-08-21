# TriggerBy — Mobile‑First Shopify AI Agency

A cinematic, **mobile‑first** landing site that sells TriggerBy’s AI automations through **story‑driven visuals** (≈70% visuals / 30% copy) with **zero dashboards** and **copy locked verbatim**.

This README is intentionally exhaustive so tools like **Cursor** can scaffold, implement, and deploy the project end‑to‑end.

---

## North Star

* **Vibe:** iOS‑grade glassmorphism + Shopify greens + subtle 3D/Lottie accents.
* **Goal:** Convince via **psychological storytelling**, not charts. Keep attention with micro‑events every \~1s.
* **Accessibility:** All text must be crystal‑readable over visuals; honor `prefers-reduced-motion`.
* **Performance:** LCP ≤ 2.5s on 4G; CLS < 0.03; mobile‑first.

---

## Tech Stack

* **Framework:** Next.js 14+ (App Router, React 18, TypeScript)
* **Styling:** Tailwind CSS + CSS variables (Shopify‑inspired greens)
* **Motion:** Framer Motion (safe fallbacks for reduced motion)
* **UI Primitives:** shadcn/ui + lucide‑react (sparingly)
* **State:** Lightweight (Zustand) for UI toggles (sound, autoplay, bot)
* **Animation assets:** Lottie/WebM for micro‑loops (≤90KB each)
* **Email/Delivery (Lead Bot):** Resend (default) or SendGrid
* **PDF Roadmap (optional):** Puppeteer/Lighthouse via serverless function/queue
* **Analytics (optional):** Plausible or PostHog (privacy‑friendly)
* **Deployment:** Vercel

> You can replace Resend/SendGrid with any email service; the API contract is abstracted.

---

## Repository Layout

```
triggerby/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx                     # Home (Hero → 10 Machines → Personalized → AI‑First → Case Studies → Final Call)
│  ├─ (sections)/
│  │   ├─ Hero.tsx                 # exact copy; cinematic aurora + glass scrim
│  │   ├─ TenMachinesCarousel.tsx  # IG‑style, self‑advancing, photos + SVG overlays
│  │   ├─ Personalized.tsx         # three‑step timeline + quotes + CTA
│  │   ├─ AIFirst.tsx              # comparison rail + AI roles chips + CTA
│  │   ├─ CaseStudies.tsx
│  │   └─ FinalCall.tsx
│  ├─ api/
│  │   └─ roadmap/route.ts         # POST { storeUrl, email } → queue + email PDF link (stub included)
│  └─ credits/page.tsx             # temporary attributions for placeholder images (remove on final)
├─ components/
│  ├─ LeadBot.tsx                  # after‑one‑scroll bot (URL/email capture, consent)
│  ├─ StickyDock.tsx               # bottom CTA dock
│  ├─ HypeTypewriter.tsx           # outside‑carousel hype lines
│  ├─ VisualOverlays/              # per‑machine SVG/Lottie overlays
│  └─ ui/                          # shadcn components as needed
├─ content/
│  ├─ copy.ts                      # **locked marketing copy** (single source of truth)
│  └─ legal/                       # privacy, terms
├─ public/
│  └─ images/                      # see Asset Structure below
├─ styles/
│  ├─ globals.css                  # Tailwind base + tokens + glass utilities
│  └─ tokens.css                   # color variables (Shopify greens)
├─ assets.manifest.json            # image manifest (cards, thumbs, blur placeholders)
├─ scripts/
│  ├─ verify-assets.ts             # ensures all manifest assets exist & within size budgets
│  └─ generate-blurs.ts            # creates base64 LQIP entries in manifest
├─ tailwind.config.ts
├─ postcss.config.js
├─ package.json
├─ tsconfig.json
└─ .env.example
```

---

## Locked Copy Policy (Important)

* All marketing text lives in `content/copy.ts`. **Do not modify**.
* Sections reference copy via imports to prevent accidental drift.
* A tiny test asserts equality of displayed strings vs. `copy.ts` constants.

**Example (content/copy.ts)**

```ts
export const hero = {
  badge: "TriggerBy - AI Automation for Shopify",
  headline: "While You Sleep, Your Store Bleeds Money",
  sub: "Lost sales. Endless support tickets. Wasted ad spend. But the smartest store owners? They wake up richer—their AI never sleeps.",
  hook: "Automate your Shopify before it's too late.",
};

export const machines = {
  headline: "The 10 Money-Making Machines Missing From Your Store",
  sub: "Each one captures revenue that's slipping away right now—working every second while your competitors pull ahead.",
  items: [
    { title: "Ad Budget Optimizer", desc: "Kills wasteful spend while you read this. Reallocates to winning products automatically. Every second of delay costs you sales." },
    { title: "Cart Recovery Engine", desc: "Right now, 70% of your visitors are leaving empty-handed. This captures them all, converts them while you sleep." },
    // ...8 more (verbatim)
  ]
};
// Personalized, AI-First, CTAs, Bottom Lines — all verbatim here
```

---

## Asset Structure (Images & Motion)

Follow the dedicated image blueprint; summary here:

```
/public/images
  /hero
    aurora-8k.avif
    aurora-3200.jpg
  /machines
    /ad-budget-optimizer/{card.avif, card.webp, card.jpg, thumb.jpg, overlay.png}
    /cart-recovery-engine/{card.avif, card.webp, card.jpg, thumb.jpg, overlay.png}
    ... (x10)
  /personalized/{step-1-dna.avif, step-2-goldmine.avif, step-3-machine.avif}
  /ai-first/{compare-most-new.avif, compare-ai-first.avif}
  /ai-first/roles/*.svg
  /case-studies/brand-x/{pain.avif, intervention.avif, outcome.avif}
```

**Export targets**

* Card AVIF ≤ **220KB**; WebP ≤ 260KB; JPG ≤ 320KB; Thumbs ≤ 35KB.
* Each card: 1200×1560 (≈10:13). Thumbs: 300×300.
* Optional overlays: transparent PNG ≤ 80KB.

**Manifest (`assets.manifest.json`)**

```json
{
  "machines": [
    {
      "slug": "cart-recovery-engine",
      "title": "Cart Recovery Engine",
      "desc": "Right now, 70% of your visitors are leaving empty-handed. This captures them all, converts them while you sleep.",
      "card": "/images/machines/cart-recovery-engine/card.avif",
      "thumb": "/images/machines/cart-recovery-engine/thumb.jpg",
      "blur": "data:image/jpeg;base64,....",
      "alt": "Chrome magnet under a moon pulling shopping carts into a glowing emerald portal."
    }
  ]
}
```

Run `scripts/verify-assets.ts` in CI to fail builds if files are missing/oversized.

---

## Getting Started

### Prereqs

* Node.js **v20+**
* pnpm (recommended) or yarn/npm

### Install & Run

```bash
pnpm install
pnpm dev
# open http://localhost:3000
```

### Build & Preview

```bash
pnpm build
pnpm start
```

---

## Environment Variables (`.env.local`)

Copy `.env.example` → `.env.local` and fill:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Email delivery (choose one)
RESEND_API_KEY=your_resend_key
SENDGRID_API_KEY=your_sendgrid_key
ROADMAP_EMAIL_FROM="TriggerBy <noreply@triggerby.ai>"
# Queue/processing (optional)
ROADMAP_WEBHOOK_URL=https://your-worker.example.com/roadmap
# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=triggerby.ai
```

> If you use Resend, keep a verified domain ready for production.

---

## Key Sections & Responsibilities

### 1) Hero (`app/(sections)/Hero.tsx`)

* Aurora background + grain; glass scrim; **exact copy**.
* Primary CTA **Scan my store** → dispatches `triggerby:open-audit` for the Lead Bot.
* Sticky bottom dock appears after scrolling past hero.

### 2) 10 Machines Carousel (`app/(sections)/TenMachinesCarousel.tsx`)

* **IG‑style**: progress bars, auto‑advance, tap zones, swipe, filmstrip thumbs.
* **Hype Typewriter** sits **above** the carousel cycling UI hype lines (not copy).
* Each card = **photo (70%)** + overlay **(SVG/Lottie)** + **copy (30%)** over scrim.
* Accepts curated assets via manifest:

  ```ts
  import manifest from "@/assets.manifest.json";
  const assets = manifest.machines.map(m => m.card);
  <TenMachinesCarousel assets={assets} />
  ```

### 3) Personalized AI Automations (`app/(sections)/Personalized.tsx`)

* Headline/subheadline verbatim.
* Three‑step timeline + checklisted “What Gets Automated”.
* Glass pull‑quotes for “Reality” & “Opportunity”.
* CTA: **Discover Your Hidden Revenue Machine**.

### 4) AI‑First Launch (`app/(sections)/AIFirst.tsx`)

* Comparative rail (Most New Store Owners vs AI‑First Founders) + AI role chips.
* CTA: **Launch AI‑First**; bottom line emphasis.

### 5) Case Studies (`app/(sections)/CaseStudies.tsx`)

* Story cards: Pain → Intervention → Outcome. Short video loops allowed.

### 6) Final Call (`app/(sections)/FinalCall.tsx`)

* Sticky dock persists: **Scan my store** + **Talk to a strategist**.

### 7) Lead Bot (`components/LeadBot.tsx`)

* Triggered after \~60% scroll or via CTA.
* Collects **Shopify store URL** + **email** + **one‑time consent**.
* Validates Shopify hint (HEAD request + regex fallback).
* POST to `/api/roadmap` → returns `{ ok: true }`; show success panel.

---

## API Contract — Roadmap (`POST /api/roadmap`)

**Request:**

```json
{ "storeUrl": "https://acme.myshopify.com", "email": "founder@acme.com" }
```

**Response:**

```json
{ "ok": true, "message": "Queued" }
```

**Server behavior (stub):**

* Validate inputs; enqueue job to your worker/queue.
* Send transactional email via Resend/SendGrid with a link to a sample PDF (or “compiling” page).

> The back‑of‑house pipeline (Lighthouse + summary → PDF) is optional in v1. Keep the endpoint fast.

---

## Design System

**Typography (fluid clamps)**

* Display XL: `clamp(28px, 6vw, 48px)`
* H1: `clamp(22px, 5vw, 36px)`
* H2: `clamp(18px, 3.8vw, 28px)`
* Body: `clamp(14px, 3.2vw, 18px)`

**Color tokens (tokens.css)**

```css
:root{
  --bg:#060908; --panel:#0b100d; --mint-1:#ecfdf5; --green-2:#34d399; --green-3:#10b981; --green-4:#059669; --green-5:#065f46;
  --emerald-glow:0 0 40px rgba(16,185,129,.35);
}
```

**Effects**

* Glass surfaces (`backdrop-filter: blur(10px)` + 1px mint border)
* Soft vignette + conic shimmer borders on key cards
* Parallax ≤ 12px; no scroll‑jacking

---

## Accessibility & Motion

* Respect `prefers-reduced-motion`: disable Ken Burns and heavy overlays.
* Text/controls contrast ≥ 4.5:1; focus rings visible.
* All decorative animations have `aria-hidden`.
* Buttons are reachable via keyboard; tap targets ≥ 44×44px.

---

## Performance Playbook

* `<picture>` AVIF→WebP→JPG fallbacks; `sizes` hints.
* LQIP blur placeholders from manifest.
* Preload first 2 machine cards; JS prefetch next slide.
* Lazy‑load Lottie/WebM; cap to 2 anims/viewport.
* Tree‑shake shadcn components; avoid heavy icon packs.

**Budgets (CI‑enforced via `scripts/verify-assets.ts`)**

* Card ≤ 220KB AVIF; Thumbs ≤ 35KB; Any JS chunk ≤ 200KB compressed.

---

## SEO & Meta

* OG image (1200×630) derived from hero.
* Titles/Descriptions: single, strong; no keyword stuffing.
* `/robots.txt`, `/sitemap.xml` (Next SEO or custom minimal).

---

## Security & Compliance

* Content Security Policy tuned for self + Vercel + email provider + analytics.
* No PII stored beyond submitted email; DSGVO‑friendly consent copy.
* Use server‑side validation and rate limiting on `/api/roadmap`.

---

## Deployment (Vercel)

1. Push to GitHub.
2. “Import Project” in Vercel → set env vars from `.env.local`.
3. Add build command: `pnpm build` and output: `.next`.
4. Configure custom domain + email sender domain.

**Preview branches** auto‑deploy; use them to review animation performance on real devices.

---

## Testing

* **Unit:** Copy lock (rendered strings === `content/copy.ts`).
* **E2E:** Playwright flows (scroll → bot open → submit stub → success state).
* **Perf:** Lighthouse CI (mobile throttling), WebPageTest scripted scroll.
* **A11y:** axe‑core ruleset.

---

## Scripts

```bash
pnpm verify:assets   # run scripts/verify-assets.ts
pnpm generate:blurs  # write base64 LQIPs into assets.manifest.json
pnpm analyze         # bundle analysis (next-bundle-analyzer)
```

---

## Roadmap

* [ ] Replace placeholder images with curated finals (per image blueprint).
* [ ] Wire manifest into carousel + thumbs.
* [ ] Implement PDF Roadmap generator (queue + worker) and sample download.
* [ ] Add /news or /insights (optional, MDX + static images).
* [ ] Localization scaffolding (if needed) — copy remains locked per locale.

---

## Content Guarantees (What we won’t do)

* No charts/dashboards.
* No copy changes; only UI labels (buttons, links) permitted.
* No scroll‑jacking or autoplay audio.

---

## License & Credits

* Code © TriggerBy. Images must be owned/licensed. While using temporary Unsplash/Pexels placeholders, keep `/credits` page live until replaced.

---

## Quick Start for Cursor (Task List)

1. **Create Next.js app** with App Router + TS + Tailwind.
2. **Add** Framer Motion, shadcn/ui, Zustand, lucide-react.
3. **Create** `content/copy.ts` and paste the **exact** marketing copy.
4. **Scaffold** sections (Hero, TenMachinesCarousel, Personalized, AIFirst, CaseStudies, FinalCall) using this README’s structure.
5. **Implement** LeadBot with form (store URL + email + consent) → POST `/api/roadmap`.
6. **Set up** `assets.manifest.json`; consume in carousel; add `<picture>` fallbacks and blur placeholders.
7. **Apply** tokens in `styles/tokens.css` and glass utilities in `globals.css`.
8. **Wire** reduced‑motion fallbacks.
9. **Run** Lighthouse; fix any LCP/CLS regressions.
10. **Deploy** to Vercel with env vars and verify email flow.

> This README is the canonical spec. If code conflicts with copy or constraints here, adjust the code — not the README.
# final-version-of-triggerby-Website-
