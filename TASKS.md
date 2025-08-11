# All Natural E-commerce – Progress Tracker

Implementacja według ECOMMERCE_ARCHITECTURE.md (Next.js 14, Strapi, Fourthwall, Railway).

## Completed Tasks

- [x] Struktura monorepo (apps/web)
- [x] Konfiguracja projektu Next.js 14 z App Router (apps/web)
- [x] Implementacja systemu design tokens w Tailwind CSS (apps/web)
- [x] TypeScript strict mode (apps/web)
- [x] ESLint + Prettier (apps/web podstawowe)
- [x] Podstawowe API routes (health, placeholders dla Fourthwall)
- [x] Instalacja i konfiguracja shadcn/ui
- [x] Strony prawne w segmencie [locale] (privacy, terms, returns)
- [x] Strony błędów w segmencie [locale] (not-found, error)
- [x] Homepage: Hero + Features + CTA (i18n, LCP image optymalizacja)
- [x] PLP – MVP listing (RSC + i18n + search + grid)

## In Progress Tasks

- [x] Konfiguracja i18n (segment [locale], middleware, tłumaczenia)
- [x] SEO podstawy (robots.ts, sitemap.ts)
- [x] Konfiguracja produkcyjna (next.config.mjs, .env.example, scripts)
- [x] Sentry setup (client + server)
- [ ] Layout components (Header, Footer, Nav)

## Current Tasks

- [x] BFF – Fourthwall proxy (implementacja + cache + revalidateTag)
- [ ] Strapi CMS setup (apps/cms – inicjalizacja)
- [ ] PLP – Filtry (min/max), paginacja UI, skeletony ładowania i dopracowany empty state
- [ ] PLP – Products listing (RSC, BFF, paginacja, wyszukiwarka)  ← in progress

## Future Tasks

- [ ] Homepage sections (Hero, carousels, kategorie)
- [ ] PLP/PDP, koszyk, checkout
- [ ] SEO (metadata, JSON-LD), sitemap/robots
- [ ] Testy (unit/e2e), Lighthouse w CI
- [ ] Railway deployment (web + cms)

## Implementation Plan (Phase 1 → Phase 2)

- Phase 1: Ukończyć shadcn/ui, i18n runtime, BFF skeleton i Sentry.
- Phase 2: Zaimplementować layout i homepage w oparciu o reguły konwersji.

### Relevant Files

- apps/web/next.config.ts – Konfiguracja Next
- apps/web/tsconfig.json – TypeScript strict mode ✅
- apps/web/postcss.config.js – PostCSS
- apps/web/tailwind.config.ts – Tokeny kolorów/typografii ✅
- apps/web/src/app/layout.tsx – Root layout + next/font ✅
- apps/web/src/app/page.tsx – Strona startowa ✅
- apps/web/src/app/api/health/route.ts – Healthcheck ✅
- apps/web/src/app/api/fourthwall/products/route.ts – BFF products ✅
- apps/web/src/app/api/fourthwall/webhooks/route.ts – Webhook revalidate ✅
- apps/web/src/app/[locale]/products/page.tsx – PLP listing (RSC, i18n) ✅
- apps/web/src/app/[locale]/products/loading.tsx – Skeletony dla PLP ✅
- apps/web/src/components/ui/skeleton.tsx – shadcn Skeleton ✅
- apps/web/src/i18n/messages/en.json – Klucze i18n dla homepage i PLP ✅
- apps/web/src/i18n/messages/pl.json – Klucze i18n dla homepage i PLP ✅
- apps/web/.eslintrc.cjs – ESLint ✅
- apps/web/.prettierrc – Prettier ✅
- apps/web/components.json – shadcn/ui config (do instalacji)
- apps/web/src/lib/seo.ts – SEO helper
- apps/web/src/i18n/* – i18n scaffolding
- apps/web/src/app/[locale]/products/page.tsx – PLP listing (RSC, i18n) ✅
