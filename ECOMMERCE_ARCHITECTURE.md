# All Natural E-commerce - Architecture & Implementation Plan

Sklep e-commerce oparty na Next.js 14, Strapi CMS, Fourthwall API i Railway hosting.

## Design System & Brand Guidelines

### Paleta Kolorów

- **Primary Brown**: `#8B4513` (ciepły brąz - główny kolor marki)
- **Secondary Brown**: `#A0522D` (średni brąz - akcenty)
- **Light Brown**: `#D2B48C` (jasny brąz/tan - tła sekcji)
- **Warm Beige**: `#F5F5DC` (ciepły beż - karty produktów)
- **Cream**: `#FDF5E6` (krem - jasne tła)
- **Off White**: `#FAF0E6` (złamana biel - główne tło)
- **Pure White**: `#FFFFFF` (czysta biel - akcenty)
- **Dark Brown**: `#654321` (ciemny brąz - tekst)
- **Medium Beige**: `#D3C7B8` (średni beż - szary tekst)
- **Red Accent**: `#B22222` (ciepła czerwień dla promocji -20%, -30%)

### Typography

- **Primary Font**: Inter (clean, modern sans-serif)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Font Sizes**:
  - H1: 3rem (48px)
  - H2: 2.5rem (40px)
  - H3: 2rem (32px)
  - H4: 1.5rem (24px)
  - Body Large: 1.125rem (18px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Spacing & Layout

- **Border Radius**: 8px (buttons), 12px (cards), 16px (containers)
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Container Max Width**: 1280px
- **Grid**: 12-column responsive grid

### Components Style Guidelines

- **Buttons**: Rounded corners (8px), solid fills w ciepłych brązach, subtle shadows
- **Cards**: Cream/warm beige background, subtle border, hover effects
- **Product Images**: Aspect ratio 1:1, rounded corners (12px)
- **Navigation**: Clean, minimal, sticky header w off-white
- **Forms**: Clean inputs z warm beige focus states

## Completed Tasks

- [x] Zdefiniowanie design system i brand guidelines
- [x] Określenie palety kolorów i typografii (zaktualizowane na ciepłe tony)
- [x] Konfiguracja projektu Next.js 14 z App Router
- [x] Implementacja systemu design tokens w Tailwind CSS

## In Progress Tasks

- [ ] Konfiguracja projektu Next.js 14 z App Router
- [ ] Implementacja systemu design tokens w Tailwind CSS

## Future Tasks

### 1. Project Setup & Infrastructure

- [ ] Inicjalizacja projektu Next.js 14 z App Router
- [ ] Konfiguracja Tailwind CSS z custom design tokens
- [ ] Instalacja i konfiguracja shadcn/ui
- [ ] Konfiguracja TypeScript z strict mode
- [ ] Setup ESLint + Prettier z project rules
- [ ] Konfiguracja Framer Motion z LazyMotion
- [ ] Setup Railway deployment configuration

### 2. Core Architecture & Services

- [ ] Implementacja BFF (Backend for Frontend) w `/app/api/`
- [ ] Konfiguracja Fourthwall API integration
- [ ] Setup Strapi CMS z PostgreSQL na Railway
- [ ] Implementacja systemu cache z revalidateTag
- [ ] Konfiguracja i18n z next-intl
- [ ] Setup Sentry dla monitoring i error handling

### 3. Database & Content Structure

- [ ] Definicja Strapi Content Types:
  - Blog Posts (tytuł, treść, autor, data, kategoria, SEO)
  - Categories (nazwa, opis, slug, SEO)
  - Landing Pages (hero, sekcje, CTA, SEO)
  - User Generated Content (reviews, testimonials)
- [ ] Konfiguracja Strapi i18n plugin
- [ ] Setup Strapi API permissions i security
- [ ] Implementacja preview mode dla content

### 4. Layout & Navigation Components

- [ ] Header component z navigation menu
  - Logo "All Natural"
  - Menu: Collections, Products, Brand, Journal
  - User actions: Account, Favorites, Search, Bag (0)
  - Sticky header behavior
- [ ] Footer component z brand info i linkami
- [ ] Mobile navigation drawer
- [ ] Search overlay/modal
- [ ] Breadcrumb navigation component

### 5. Homepage Implementation

- [ ] Hero section z brand logos (KINFORM, VOGUE, CERELLE, BAZAR)
- [ ] Product sections:
  - "Trending" products carousel
  - "Bestsellers" section
  - "Kits" section
- [ ] Category showcase ("Shop by Category"):
  - Body care section z obrazem
  - Skin care section z obrazem
  - Hair care section z obrazem
- [ ] Featured product spotlight (Body Lotion)
- [ ] Promotional sections (Save with bundles, Gift Cards)

### 6. Product Catalog & Pages

- [ ] Product Listing Page (PLP):
  - Grid layout responsywny
  - Filtry i sortowanie
  - Paginacja lub infinite scroll
  - Quick view functionality
- [ ] Product Detail Page (PDP):
  - Image gallery z zoom
  - Product information i opis
  - Price display z promo pricing
  - Add to cart functionality
  - Related products
  - Reviews section
- [ ] Category pages z hero images
- [ ] Search results page

### 7. E-commerce Functionality

- [ ] Shopping cart implementation:
  - Add/remove products
  - Quantity updates
  - Price calculations
  - Persistent cart state
- [ ] Wishlist/Favorites functionality
- [ ] Quick Add to Cart buttons
- [ ] Product variants handling (size, color)
- [ ] Inventory status display
- [ ] Promotional pricing display

### 8. User Account & Authentication

- [ ] User registration/login system
- [ ] Account dashboard:
  - Order history
  - Favorites/Wishlist
  - Account settings
  - Address book
- [ ] Guest checkout option
- [ ] Social login integration (optional)

### 9. Checkout & Payment Integration

- [ ] Checkout flow z Fourthwall:
  - Cart review
  - Shipping information
  - Payment processing
  - Order confirmation
- [ ] Order tracking integration
- [ ] Email confirmations setup

### 10. Content & Blog System

- [ ] Journal/Blog listing page
- [ ] Blog post template z Strapi content
- [ ] Category filtering dla blog posts
- [ ] Related articles suggestions
- [ ] Social sharing buttons

### 11. SEO & Performance Optimization

- [ ] Metadata generation dla wszystkich stron
- [ ] OpenGraph i Twitter Cards
- [ ] JSON-LD structured data:
  - Product schema
  - Organization schema
  - BreadcrumbList schema
- [ ] Sitemap.xml generation
- [ ] Robots.txt configuration
- [ ] Core Web Vitals optimization:
  - Image optimization z next/image
  - Font loading optimization
  - Code splitting i lazy loading
  - Bundle size analysis

### 12. Analytics & Conversion Tracking

- [ ] Google Analytics 4 setup
- [ ] E-commerce tracking events:
  - Product views
  - Add to cart
  - Purchase completion
  - Search queries
- [ ] Conversion funnel tracking
- [ ] A/B testing infrastructure (optional)

### 13. Mobile Optimization

- [ ] Responsive design implementation
- [ ] Touch-friendly interactions
- [ ] Mobile-specific navigation
- [ ] Progressive Web App features (optional)

### 14. Accessibility & UX

- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader optimization
- [ ] Focus management
- [ ] Loading states i skeletons
- [ ] Error states handling

### 15. Testing & Quality Assurance

- [ ] Unit tests dla kluczowych komponentów
- [ ] Integration tests dla API routes
- [ ] E2E tests z Playwright:
  - Checkout flow
  - Product search
  - Navigation
- [ ] Performance testing z Lighthouse
- [ ] Cross-browser testing

### 16. Deployment & DevOps

- [ ] Railway deployment pipeline
- [ ] Environment variables configuration
- [ ] CI/CD z GitHub Actions
- [ ] Health checks i monitoring
- [ ] Backup strategies dla Postgres i Strapi

## Implementation Priority

### Phase 1 (Foundation) - Tydzień 1-2

1. Project setup i infrastructure
2. Design system implementation
3. Core architecture setup

### Phase 2 (Content & Layout) - Tydzień 3-4

1. Layout components
2. Homepage implementation
3. Content management setup

### Phase 3 (E-commerce Core) - Tydzień 5-6

1. Product catalog
2. E-commerce functionality
3. Fourthwall integration

### Phase 4 (Features & Polish) - Tydzień 7-8

1. User accounts
2. Checkout flow
3. SEO optimization

### Phase 5 (Launch Prep) - Tydzień 9-10

1. Testing
2. Performance optimization
3. Deployment

## Technical Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion z LazyMotion
- **TypeScript**: Strict mode
- **State Management**: React Server Components + Context API gdzie potrzebne

### Backend & Services

- **CMS**: Strapi 4 z PostgreSQL
- **E-commerce API**: Fourthwall
- **Database**: Railway PostgreSQL
- **Hosting**: Railway
- **Monitoring**: Sentry

### Development Tools

- **Package Manager**: npm/yarn
- **Linting**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Playwright
- **CI/CD**: GitHub Actions

## Relevant Files Structure

## Design Tokens (Tailwind Config)

Będę implementować design tokens w Tailwind CSS:

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8B4513',      // Primary Brown
          secondary: '#A0522D',    // Secondary Brown
          light: '#D2B48C',        // Light Brown/Tan
        },
        warm: {
          beige: '#F5F5DC',        // Warm Beige
          cream: '#FDF5E6',        // Cream
          white: '#FAF0E6',        // Off White
        },
        neutral: {
          dark: '#654321',         // Dark Brown (text)
          medium: '#D3C7B8',       // Medium Beige (secondary text)
          light: '#FAF0E6',        // Off White
        },
        accent: {
          red: '#B22222',          // Warm Red (promotions)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'brand': '8px',
        'card': '12px',
        'container': '16px',
      }
    }
  }
}
