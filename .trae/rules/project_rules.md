---
description: This rule explains how to create and manage task lists to track project progress.
globs: *
alwaysApply: true
---

# Task List Management

Guidelines for creating and managing task lists in Markdown files to track project progress

## Task List Creation

1. Create task lists in a markdown file (in the project root):
   - Use `TASKS.md` or a descriptive name relevant to the feature (e.g., `ASSISTANT_CHAT.md`)
   - Include a clear title and description of the feature being implemented

2. Structure the file with these sections:

   ```markdown
   # Feature Name Implementation

   Brief description of the feature and its purpose.

   ## Completed Tasks

   - [x] Task 1 that has been completed
   - [x] Task 2 that has been completed

   ## In Progress Tasks

   - [ ] Task 3 currently being worked on
   - [ ] Task 4 to be completed soon

   ## Future Tasks

   - [ ] Task 5 planned for future implementation
   - [ ] Task 6 planned for future implementation

   ## Implementation Plan

   Detailed description of how the feature will be implemented.

   ### Relevant Files

   - path/to/file1.ts - Description of purpose
   - path/to/file2.ts - Description of purpose
   ```

## Task List Maintenance

1. Update the task list as you progress:
   - Mark tasks as completed by changing `[ ]` to `[x]`
   - Add new tasks as they are identified
   - Move tasks between sections as appropriate

2. Keep "Relevant Files" section updated with:
   - File paths that have been created or modified
   - Brief descriptions of each file's purpose
   - Status indicators (e.g., ✅) for completed components

3. Add implementation details:
   - Architecture decisions
   - Data flow descriptions
   - Technical components needed
   - Environment configuration

## AI Instructions

When working with task lists, the AI should:

1. Regularly update the task list file after implementing significant components
2. Mark completed tasks with [x] when finished
3. Add new tasks discovered during implementation
4. Maintain the "Relevant Files" section with accurate file paths and descriptions
5. Document implementation details, especially for complex features
6. When implementing tasks one by one, first check which task to implement next
7. After implementing a task, update the file to reflect progress

## Example Task Update

When updating a task from "In Progress" to "Completed":

```markdown
## In Progress Tasks

- [ ] Implement database schema
- [ ] Create API endpoints for data access

## Completed Tasks

- [x] Set up project structure
- [x] Configure environment variables
```

Should become:

```markdown
## In Progress Tasks

- [ ] Create API endpoints for data access

## Completed Tasks

- [x] Set up project structure
- [x] Configure environment variables
- [x] Implement database schema
---
description: This rule explains React component patterns, hooks usage, and best practices.
globs: **/*.jsx,**/*.tsx
alwaysApply: false
---

# React rules

- Use functional components with hooks instead of class components
- Use custom hooks for reusable logic
- Use the Context API for state management when needed
- Use proper prop validation with PropTypes
- Use React.memo for performance optimization when necessary
- Use fragments to avoid unnecessary DOM elements
- Use proper list rendering with keys
- Prefer composition over inheritance
- Use React.lazy for code splitting
- Use the useCallback and useMemo hooks for performance optimization
- Use the useEffect hook for side effects
- Use the useRef hook for mutable values
- Use the useImperativeHandle hook for customizing the instance value that is exposed to parent components
- Use the useLayoutEffect hook for layout effects
- Use the useDebugValue hook for custom hooks
---
description: React + Next.js rules tailored for this project (App Router, BFF, animations, performance).
globs: apps/web/**/*.{tsx,jsx}
alwaysApply: true
---

# React + Next.js rules

- Conversion rules: When building or modifying the frontend (apps/web/**), you must follow `.trae/rules/conversion_rules.md` (Conversion-Focused Frontend Rules).
- Prefer Server Components (App Router). Add "use client" only for interactivity.
- Data fetching:
  - Use Next fetch with `next: { revalidate, tags }` and ISR for content; SSR for pages with personalization.
  - Use cache tags and `revalidateTag` triggered by webhooks.
- BFF / API Routes:
  - Implement proxy to external APIs only in `/app/api/**` (server-only).
  - Secrets in env; no direct client calls.
- UI and accessibility:
  - Tailwind + shadcn/ui as the component system (A11y, focus states).
  - framer-motion for micro-interactions; avoid blocking LCP; prefer LazyMotion with `domAnimation` (or `domMax` when needed) and honor prefers-reduced-motion via `useReducedMotion` with non-animated fallbacks.
  - 3D via react-three-fiber with dynamic import and Suspense (optional).
- Performance:
  - next/image, dynamic() with `ssr: false` for heavy widgets, code-splitting.
  - Prefer props/server components over global state.
- SEO:
  - Metadata API, alternates/hreflang, canonical, OpenGraph, JSON-LD (Product).
- Tests/QA:
  - Playwright e2e for checkout/PDP; Lighthouse budgets in CI.

---
description: Fourthwall Integration & Webhooks (safe proxy, caching, events).
globs: apps/web/src/app/api/fourthwall/**/*.* , apps/web/src/app/**/*.* 
alwaysApply: true
---

# Fourthwall Integration Rules

- Authorization and secrets:
  - Env: FOURTHWALL_API_BASE, FOURTHWALL_TOKEN (server).
  - No direct client requests to Fourthwall.
- Proxy/BFF:
  - Handlers in `/app/api/fourthwall/*`; normalize responses and errors.
  - Short cache (60–120 s) + revalidateTag.
- Webhooks:
  - Endpoint `/app/api/fourthwall/webhooks/route.ts`. Fast 200, async processing, idempotency, signature/secret validation.
- SEO/UX:
  - ISR for PLP/PDP; SSR when personalization/pricing is needed.
  - Skeletons, prefetch, conversion optimization.

---
description: Strapi CMS on Railway (i18n, preview, ISR, Postgres, security).
globs: apps/cms/**/*.*
alwaysApply: true
---

# Strapi Rules

- Database and env:
  - Railway Postgres: DATABASE_CLIENT=postgres, DATABASE_HOST/PORT/NAME/USERNAME/PASSWORD, APP_KEYS, API_TOKEN_SALT, ADMIN_JWT_SECRET, ENCRYPTION_KEY (optional, for encrypting sensitive data where used).
- i18n:
  - Internationalization plugin; `en` default; add more locales in the admin panel.
- CORS:
  - Allow frontend domains (Railway URL + custom domain) in config.
- Preview:
  - Preview URL → `/api/preview?secret=STRAPI_PREVIEW_SECRET&redirect=/en/...`.
- ISR Revalidate:
  - Publish webhook → POST `/api/revalidate` with `{ secret: STRAPI_REVALIDATE_SECRET, tag?: "content", path?: "/en/..." }`.
- Security:
  - Restrict admin access (SSO/IP allowlist/VPN); do not commit `.env` (use Railway env).

---
description: i18n & SEO (Next App Router, locales, metadata, sitemap/robots, JSON-LD).
globs: apps/web/src/app/**/*.* , apps/web/src/i18n/**/*.* , apps/web/src/lib/seo.ts
alwaysApply: true
---

# i18n & SEO Rules

- i18n:
  - Segment `/[locale]`, dictionaries in `src/i18n/messages/*.json`, update `src/i18n/locales.ts`.
- Metadata:
  - Central SEO helper; set metadataBase, canonical, OG/Twitter; alternates/hreflang.
- JSON-LD:
  - PDP: `Product` (price, availability, SKU, brand); navigation: `BreadcrumbList`.
- Sitemap/Robots:
  - `app/sitemap.ts` – dynamic entries (products/categories); `app/robots.ts` – `host` and `sitemap` from `NEXT_PUBLIC_SITE_URL`.
- Core Web Vitals:
  - Minimize JS, use next/image, lazy, prefetch key pages.

---
description: Security & Secrets (env, webhooks, rate-limits, headers).
globs: *
alwaysApply: true
---

# Security & Secrets Rules

- Secrets:
  - Only in env; do not log tokens; no secrets in the repo.
- Rate limiting and validation:
  - Rate-limit public API routes; validate input (Zod).
- Webhooks:
  - Verify signature/secret; idempotency; fast 200; log metadata only.
- Headers:
  - Consider CSP, HSTS, X-Frame-Options; remove unnecessary server headers.
- PII/GDPR:
  - Anonymize logs; CMP for cookies.

---
description: Railway Deployment (services, env, domains, logging, healthchecks).
globs: *
alwaysApply: false
---

# Railway Rules

- Services:
  - `web` (Next SSR/ISR) and `cms` (Strapi) as separate services; Postgres as a Railway service.
- Environment variables:
  - Configure per service in Railway; do not commit `.env`.
- Domains:
  - Generate public URL; attach custom domain in Networking.
- Build/Start:
  - Next: listen on `$PORT`; Strapi: build + start in production.
- Observability:
  - Railway logs; Sentry for web and cms.

---
description: Error handling, logging and monitoring (Next.js + Strapi + BFF).
globs: apps/web/**/*.* , apps/cms/**/*.* , *
alwaysApply: true
---

# Error Handling & Monitoring Rules

- Monitoring and tools:
  - Sentry for `web` and `cms` (DSN in env: `SENTRY_DSN_WEB`, `SENTRY_DSN_CMS`), tag `environment`, `release`.
  - Enable Performance (tracing) with conservative sample rate in production.
- Next.js (App Router):
  - Use `error.tsx` and `not-found.tsx` per segment; in client components apply error boundaries where appropriate.
  - API routes: do not expose stack traces; return unified error shape `{ error: { code, message, requestId } }` with proper HTTP status.
  - Generate `requestId` (e.g., `crypto.randomUUID()`), log it and set `X-Request-Id` header.
- BFF / Fourthwall:
  - Short timeouts; retries with exponential backoff on 429/5xx; circuit-breaker thresholds.
  - Standardize Fourthwall errors to a common shape; log metadata only (no tokens/PII).
- Strapi:
  - Centralized logging via Strapi logger; error sanitization; no detailed I/O on public endpoints.
  - Webhooks: fast 200, async processing, idempotency via `eventId`/`signature`.
- Logging:
  - Structured logs (JSON): `level`, `timestamp`, `requestId`, `route`, `latencyMs`, `userIdHash?`.
  - Do not log secrets or PII; anonymize identifiers.
- Validation and rate limiting:
  - Validate inputs (Zod) on public API routes; enable rate limit.
- Alerting and SLO:
  - Alerts on rising `error rate`/latency (Sentry/Railway); define SLOs (e.g., p95 < 600 ms on PLP/PDP).
- RUM / Web Vitals:
  - Collect LCP/CLS/INP in production and send to analytics; correlate with `requestId`.

---
description: Performance and Core Web Vitals (App Router, animations, media, third‑party).
globs: apps/web/**/*.* 
alwaysApply: true
---

# Performance & Core Web Vitals Rules

- Performance budgets (enforced in CI/Lighthouse):
  - Initial JS < 170 kB gz (target: < 90 kB), CSS < 40 kB gz; LCP image < 200 kB (mobile).
- LCP:
  - Hero via `next/image` with `priority` and `fetchPriority="high"`; preconnect to image CDN.
  - Avoid client wrappers around the LCP element; prefer RSC + streaming.
- CLS:
  - Always set `width/height` and `sizes` for images; reserve space for banners/sticky-ATC.
- INP / interactions:
  - Defer heavy JS; use `useTransition` and Server Actions; limit framer-motion to microinteractions.
  - Load heavy animations with `dynamic(() => import(...), { ssr: false })`.
- Fonts:
  - `next/font` with `display: swap|optional`; minimize variants; preload critical subsets.
- Third-party scripts:
  - `next/script` with `strategy="afterInteractive"` or `lazyOnload`; remove unnecessary third‑party.
- Fetching and cache:
  - Parallelize fetches; `next: { revalidate, tags }`; do not block rendering on non-critical data.
  - Set cache headers for static assets; use `revalidateTag`.
- Media:
  - WebP/AVIF, responsive sizes, lazy offscreen; videos with `poster` and minimal preload.
- Prefetch/Preload:
  - `router.prefetch` for top‑nav; `preconnect`/`preload` for critical origins.
- Streaming/Edge:
  - Use `Suspense`/streaming; consider edge runtime for globally cacheable pages.
- Diagnostics:
  - Bundle analysis (next-bundle-analyzer) in CI; report Web Vitals to analytics; monitor Next traces.

---
description: Code Editing Policy for Trae LLM (diff style, file blocks, commands).
globs: *
alwaysApply: true
---

# Code Editing Policy for Trae LLM

- Response format:
  - When editing, show only necessary fragments and use `// ... existing code ...` to indicate unchanged parts.
  - Always provide a code block with the correct language ID and full file path.
  - For existing files, indicate the specific method/section when applicable.
- Commands:
  - One command per block, macOS by default.
- Rules:
  - Do not modify the user's existing comments unless requested.
  - Do not expose secrets; use env only.
  - Make small, self-contained changes; after shipping, update `TASKS.md`.

