import Link from 'next/link'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  locale: Locale
  dict: Dictionary
}

export function Footer({ locale, dict }: Props) {
  return (
    <footer className="border-t border-neutral-light bg-neutral-light/50">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-dark/70">
            {dict.footer.copyright}
          </p>
          
          <nav className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link 
              href={`/${locale}/privacy`}
              className="text-sm text-neutral-dark/70 hover:text-brand-primary transition-colors"
            >
              {dict.footer.links.privacy}
            </Link>
            <Link 
              href={`/${locale}/terms`}
              className="text-sm text-neutral-dark/70 hover:text-brand-primary transition-colors"
            >
              {dict.footer.links.terms}
            </Link>
            <Link 
              href={`/${locale}/returns`}
              className="text-sm text-neutral-dark/70 hover:text-brand-primary transition-colors"
            >
              {dict.footer.links.returns}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}