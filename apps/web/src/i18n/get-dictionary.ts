import 'server-only'
import type { Locale } from './locales'

const dictionaries = {
  pl: () => import('./messages/pl.json').then((module) => module.default),
  en: () => import('./messages/en.json').then((module) => module.default)
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>