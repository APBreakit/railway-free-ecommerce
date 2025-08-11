import Link from 'next/link'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  locale: Locale
  dict: Dictionary
}

export function Header({ locale, dict }: Props) {
  return (
    <header className="border-b border-neutral-light bg-white">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="text-xl font-semibold text-neutral-dark">
          All Natural
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href={`/${locale}`}
            className="text-neutral-dark hover:text-brand-primary transition-colors"
          >
            {dict.nav.home}
          </Link>
          <Link 
            href={`/${locale}/products`}
            className="text-neutral-dark hover:text-brand-primary transition-colors"
          >
            {dict.nav.products}
          </Link>
          <Link 
            href={`/${locale}/collections`}
            className="text-neutral-dark hover:text-brand-primary transition-colors"
          >
            {dict.nav.collections}
          </Link>
          <Link 
            href={`/${locale}/about`}
            className="text-neutral-dark hover:text-brand-primary transition-colors"
          >
            {dict.nav.about}
          </Link>
          <Link 
            href={`/${locale}/contact`}
            className="text-neutral-dark hover:text-brand-primary transition-colors"
          >
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language switcher */}
          <div className="flex items-center space-x-2">
            <Link 
              href="/pl" 
              className={`px-2 py-1 text-sm rounded ${locale === 'pl' ? 'bg-brand-primary text-white' : 'text-neutral-dark hover:bg-neutral-light'}`}
            >
              PL
            </Link>
            <Link 
              href="/en"
              className={`px-2 py-1 text-sm rounded ${locale === 'en' ? 'bg-brand-primary text-white' : 'text-neutral-dark hover:bg-neutral-light'}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}