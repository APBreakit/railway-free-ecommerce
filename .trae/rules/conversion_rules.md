---
description: Conversion-focused frontend roles for e-commerce (components, packs, analytics, SEO, a11y).
globs: apps/web/**/*.* , apps/web/src/**/*.* 
alwaysApply: true
---

# Conversion-Focused Frontend Rules

These rules define how to design, build, instrument, and roll out conversion-oriented UI/UX across the storefront. They cover components, content modeling, analytics, SEO, accessibility, and performance constraints.

## Global Principles

- Performance first:
  - Keep LCP < 2.5s, CLS < 0.1, TBT < 200ms. Prefer Server Components, avoid blocking JS.
  - Use next/image with responsive sizes, lazy loading, and priority for above-the-fold hero/ATC areas.
  - Code-split heavy widgets via dynamic import with ssr: false only when strictly needed.

- Accessibility:
  - All interactive elements have keyboard focus, ARIA labels, and visible focus states.
  - Carousels: provide controls, pause on hover/focus, `aria-roledescription="carousel"`, `aria-live="polite"` for announcements.
  - Banners/announcements: use `role="status"` or `aria-live="polite"` for time-bound updates.

- i18n & Copy:
  - All strings sourced from i18n dictionaries or Strapi; no hard-coded copy.
  - Keep concise, benefit-driven copy; avoid jargon; include social proof and risk-reversal cues.

- SEO:
  - Use semantic tags (section, header, nav, aside, footer).
  - Add JSON-LD where applicable (e.g., AggregateRating on PDP, BreadcrumbList).
  - Avoid duplicate banners that push content excessively below the fold.

- Analytics & Experimentation:
  - Emit GA4 events via a centralized tracker (e.g., track('event_name', payload)).
  - Include data attributes: data-analytics-id, data-variant, data-source.
  - Support A/B via feature flags (e.g., GrowthBook or env flag) and variants prop.

- CMS-driven:
  - Components read content from Strapi (title, subtitle, body, images, ratings, thresholds, badges, CTAs, toggles).
  - Support Preview mode and ISR revalidation via Strapi webhooks.

- Safety:
  - No client-side calls to Fourthwall; use server-side BFF endpoints.
  - Do not expose secrets; use env only.

## Locations & Conventions

- Components:
  - Place reusable conversion UI in apps/web/src/components/conversion/*
  - Name components with clear intent (e.g., ReviewCarousel, TrustBadges, PaymentMethodsStrip).

- Props:
  - Common props: id, title, subtitle, body, items, cta, href, icon, image, variant, theme, badge, tags, start/end date, showClose, dismissKey.
  - Analytics props: analyticsId, analyticsContext, variant, position/index.
  - Accessibility props as needed: ariaLabel, ariaDescribedBy.

- Styling:
  - Tailwind + shadcn/ui primitives; ensure focus-visible, prefers-reduced-motion.
  - framer-motion for micro-interactions that do not block LCP.

- Instrumentation:

  - Standard GA4 events:
    - view_promotion, select_promotion
    - view_item, add_to_cart, begin_checkout
    - generate_lead, sign_up, subscribe
  - Example payload fields: { id, component, variant, placement, value, currency, product_id, list_name }

## Core Components (Conversion)

1. Review Carousel

- Purpose: Social proof via rotating customer reviews/UGC snippets.
- Behavior: Auto-rotate with pause on hover/focus; manual prev/next; optional thumbnails.
- SEO: Use schema AggregateRating when applicable (PDP).
- Analytics: view_promotion on mount, select_promotion on interaction.
- Strapi: reviews collection (rating, title, body, author, locale, image?, source).

1. Third-Party Review Widgets (Google/Bing, Trustpilot)

- Purpose: Leverage trusted external ratings.
- Behavior: Lazy-load 3P script after idle; provide fallback (static badge) if blocked.
- Analytics: view_promotion on visible; select_promotion on click-through.
- Strapi: provider config, widget variant, badge image fallback.

1. Gift Sections (Free Gift / GWP)

- Purpose: Boost AOV with threshold-based gifts.
- Behavior: Display progress bar to threshold; show eligible gifts; integrate with cart logic (server-side validation).
- Analytics: view_promotion; begin_checkout when threshold achieved prompt is clicked.
- Strapi: gift rules (threshold, gift items, copy, images, start/end, locales).

1. Text Banners / Announcement Bar

- Purpose: Communicate key promos (shipping, codes, deadlines).
- Behavior: Dismissible (localStorage key); supports rotation, scheduling, locale variations.
- Analytics: view_promotion; select_promotion on click.
- Strapi: banners with scheduling and priority.

1. Money-Back Guarantee Strip

- Purpose: Risk reversal, increase trust.
- Behavior: Static trust strip near ATC, includes tooltip/modal for full policy.
- Analytics: view_promotion; select_promotion on policy click.
- Strapi: guarantee content, iconography, link to policy.

1. Payment Methods Strip

- Purpose: Trust and convenience signals.
- Behavior: Show supported logos (Apple Pay, Google Pay, PayPal, major cards); collapse on mobile.
- Analytics: view_promotion; select_promotion on info clicks.
- Strapi: methods, ordering, regional availability.

1. Urgency & Scarcity Bar

- Purpose: Nudge decision using timers (order-by for shipping) or low-stock indicators.
- Behavior: Countdown with server time sync; low-stock message when below threshold.
- Accessibility: Respect prefers-reduced-motion; non-flashy updates.
- Analytics: view_promotion; select_promotion on CTA click.
- Strapi: thresholds, copy, shipping cutoff schedules.

1. Sticky Add-To-Cart (PDP/Mobile)

- Purpose: Keep ATC accessible on scroll; show price, variant, CTA.
- Performance: Render minimal client logic; avoid layout shifts.
- Analytics: add_to_cart event with product context.
- Strapi: configuration toggles per template.

1. Exit-Intent / Scroll-Depth Offer

- Purpose: Capture abandoning users; offer code or lead magnet.
- Behavior: Trigger once per session; rate-limit; fully dismissible.
- Analytics: view_promotion; generate_lead on signup; select_promotion on CTA.
- Strapi: offer content, segments, limits.

1. Shipping / Returns / Tax Info Block

- Purpose: Clarify fees and policies pre-checkout to reduce friction.
- Behavior: Collapsible; link to policy pages; PDP and cart placement.
- Analytics: select_promotion on expand.
- Strapi: policy snippets, locales.

1. Trust Badges Cluster

- Purpose: Aggregate key trust signals (SSL, guarantees, ratings).
- Behavior: Compact row with tooltips. Optional modal linking to details.
- Analytics: view_promotion; select_promotion on interactions.
- Strapi: badges (title, icon, description, link).

1. Cross-Sell / Bundles

- Purpose: Lift AOV by recommending complements or bundles.
- Behavior: Server-side selection rules; graceful fallback if no data.
- Analytics: view_item_list, select_item, add_to_cart.
- Strapi: bundle definitions, curated SKU lists, logic toggles.

1. Recently Viewed

- Purpose: Help resume shopping; increase revisit of PDPs.
- Behavior: Local, privacy-safe; dedupe; limit count; lazy.
- Analytics: view_item_list; select_item.
- Strapi: display toggles; max items.

1. UGC Gallery (Photo/Video)

- Purpose: Authentic social proof.
- Behavior: Masonry grid, lightbox; lazy-load media; alt text required.
- Analytics: view_promotion; select_promotion on lightbox open.
- Strapi: UGC entries with rights-cleared flag.

1. FAQ Accordion (Product/Policy)

- Purpose: Objection handling to unlock purchase intent.
- Behavior: Accessible accordion; deep-link to specific FAQ.
- Analytics: select_promotion on expand; measure questions resolved.
- Strapi: FAQs by category and locale.

## 15 Conversion Packs (Ready-to-Ship)

Each pack includes: copy guidelines, Strapi models, default variants, analytics events, and rollout checklist.

1. Launch Promo Pack

- Use: New collection/product launches.
- Includes: Hero banner, countdown, highlight cards, social proof badge.
- KPI: CTR to PDP, add_to_cart (ATC), revenue.
- Events: view_promotion, select_promotion.

1. Free Shipping Threshold Pack

- Use: Increase AOV to threshold.
- Includes: Progress bar in header/cart, banner copy variants.
- KPI: AOV, begin_checkout.
- Events: view_promotion, begin_checkout.

1. Seasonal Sale Pack

- Use: Sales with urgency.
- Includes: Announcement bar, PDP price badge, category ribbons.
- KPI: Conversion rate, revenue.
- Events: view_promotion, select_promotion.

1. Newcomer Welcome Pack

- Use: First-session perks.
- Includes: Modal/slide-in, 10% off for email/SMS opt-in.
- KPI: Leads, first-order rate.
- Events: generate_lead, sign_up.

1. Trust & Assurance Pack

- Use: High-risk categories or new markets.
- Includes: Money-back, payment methods, third-party badges.
- KPI: PDP→ATC rate.
- Events: view_promotion.

1. Social Proof Pack

- Use: Low awareness brands.
- Includes: Review carousel, UGC grid, star badges.
- KPI: Time on PDP, ATC rate.
- Events: view_promotion, select_promotion.

1. Bundle Booster Pack

- Use: Complementary SKUs.
- Includes: Bundle widget, "buy together" CTA.
- KPI: AOV, add_to_cart.
- Events: view_item_list, add_to_cart.

1. Exit-Intent Recovery Pack

- Use: Cart/PDP abandonment.
- Includes: Exit-intent modal, recovery email capture.
- KPI: Exit modal conversion, recovered sessions.
- Events: view_promotion, generate_lead.

1. PDP Clarity Pack

- Use: Complex products.
- Includes: FAQ, shipping/returns block, comparison table.
- KPI: PDP bounce, ATC rate.
- Events: select_promotion (FAQ expand).

1. Limited Stock Pack

- Use: Low inventory.
- Includes: Low-stock pill, estimated shipping date, sticky ATC.
- KPI: ATC rate.
- Events: view_promotion, add_to_cart.

1. Referral & UGC Pack

- Use: Acquire via community.
- Includes: "Share & Save" CTA, UGC submission, gallery.
- KPI: Referrals, UGC submissions.
- Events: share, generate_lead.

1. Trustpilot Integration Pack

- Use: Third-party credibility.
- Includes: Trustpilot widget + fallback static ratings.
- KPI: PDP engagement, CR.
- Events: view_promotion, select_promotion.

1. "Why Us" Differentiation Pack

- Use: Brand differentiation.
- Includes: Benefits grid, certifications, awards.
- KPI: PDP dwell time, CR.
- Events: view_promotion.

1. Post-Purchase Cross-Sell Pack

- Use: Increase LTV.
- Includes: "You may also like" on order confirmation and email content hooks.
- KPI: Repeat purchase intent.
- Events: view_item_list, select_item.

1. Localization & Market Entry Pack

- Use: New country/language rollout.
- Includes: Local payment methods, shipping copy, localized badges.
- KPI: CR in new locale.
- Events: view_promotion, begin_checkout.

## Strapi Modeling (Guidance)

- Collections:
  - reviews (rating, title, body, author, source_link, image?, locale)
  - banners (title, body, type, priority, schedule, locale, dismissKey)
  - gifts (threshold, gift_items[], locale, active_window)
  - trust_badges (title, icon, description, link, locale)
  - faqs (category, question, answer, locale)
  - ugc_entries (media, alt, rights_cleared, source, locale)

- Single Types:
  - site_promotions (announcement bars, thresholds)
  - payment_methods_config
  - guarantees_policy_snippet

- Conventions:
  - Include isActive, startAt, endAt, locales; review in Preview mode before publish.

## Analytics & QA

- Event naming:
  - Use snake_case for event names; include component and placement in params.
  - Example: track('view_promotion', { component: 'review_carousel', placement: 'pdp_top', variant: 'A', promotion_id: 'rev-hero-1' })

- QA gates per component:
  - No CLS > 0.1 when mounted.
  - Keyboard navigable; tab order logical.
  - Reduced motion respected.
  - Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90 on key pages.

- Experimentation:
  - Each component accepts variant prop.
  - Read experiment flags from server (BFF or env) to ensure SSR-consistent UI.
  - Log assignment once per session.

## Rollout & Revalidation

- ISR tags:
  - Tag pages using the displayed content (e.g., 'promo', 'reviews', 'banners').
  - Strapi publish/update should POST /api/revalidate with matching tag or path.

- Preview:
  - All components must render correctly in preview mode with draft content.

- Fallbacks:
  - If CMS data missing, display conservative default or hide the component without layout shift.

## Security & Compliance

- Do not inject third-party scripts without lazy loading and consent checks (CMP).
- Sanitize any user-generated content (UGC).
- Do not display PII; anonymize analytics context.
