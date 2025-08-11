import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import type { Locale } from '@/i18n/locales'
import type { Dictionary } from '@/i18n/get-dictionary'

type Props = {
  locale: Locale
  dict: Dictionary
}

export function Header({ locale, dict }: Props) {
  return (
    <header className="border-b border-neutral-200 bg-white sticky top-0 z-50">
      <div className="container flex h-20 items-center justify-between">
        <Link href={`/${locale}` as any} className="text-2xl font-bold text-gray-800">
          All Natural
        </Link>
        
        <nav className="hidden md:flex items-center space-x-10 text-lg">
          <Link 
            href={`/${locale}` as any}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            {dict.nav.home}
          </Link>
          <Link 
            href={`/${locale}/products` as any}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            {dict.nav.products}
          </Link>
          <Link 
            href={`/${locale}/collections` as any}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            {dict.nav.collections}
          </Link>
          <Link 
            href={`/${locale}/about` as any}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            {dict.nav.about}
          </Link>
          <Link 
            href={`/${locale}/contact` as any}
            className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
          >
            {dict.nav.contact}
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          <button className="text-gray-600 hover:text-pink-500 transition-colors">
            <Search className="h-6 w-6" />
          </button>
          <button className="text-gray-600 hover:text-pink-500 transition-colors">
            <User className="h-6 w-6" />
          </button>
          <button className="text-gray-600 hover:text-pink-500 transition-colors">
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}