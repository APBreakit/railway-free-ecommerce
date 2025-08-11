import { type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/get-dictionary'

type Props = {
  params: { locale: string }
}

export default async function HomePage({ params }: Props) {
  const locale = params.locale as Locale
  const dict = await getDictionary(locale)

  return (
    <main className="min-h-dvh">
      <section className="container py-16">
        <div className="rounded-container bg-warm-cream p-8 shadow-sm">
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-dark">
            {dict.home.hero.title}
          </h1>
          <p className="mt-4 text-lg text-neutral-dark/80">
            {dict.home.hero.description}
          </p>
          <div className="mt-8">
            <a
              href={`/${locale}/products`}
              className="inline-flex items-center rounded-brand bg-brand-primary px-6 py-3 text-white shadow hover:bg-brand-secondary transition-colors"
              data-analytics-id="hero_cta"
            >
              {dict.home.hero.ctaText}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}