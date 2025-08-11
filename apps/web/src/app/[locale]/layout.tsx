import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/locales'
import { getDictionary } from '@/i18n/get-dictionary'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

type Props = {
  children: import('react').ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const dict = await getDictionary(locale)
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.siteName}`
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pl': '/pl',
        'en': '/en'
      }
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: dict.meta.siteName,
      type: 'website',
      locale: locale
    },
    icons: { icon: '/favicon.ico' }
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale

  if (!locales.includes(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans">
        <Header locale={locale} dict={dict} />
        {children}
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  )
}