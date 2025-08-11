import { type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/get-dictionary'
import type { Metadata } from 'next'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const dict = await getDictionary(locale)
  
  return {
    title: dict.footer.links.privacy,
    description: 'Polityka prywatności All Natural'
  }
}

export default async function PrivacyPage({ params }: Props) {
  const locale = params.locale as Locale
  const dict = await getDictionary(locale)

  return (
    <main className="container py-16">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-neutral-dark mb-8">
          {dict.footer.links.privacy}
        </h1>
        <div className="prose prose-lg text-neutral-dark/80">
          <p>Treść polityki prywatności będzie dodana po integracji z Strapi CMS.</p>
        </div>
      </div>
    </main>
  )
}