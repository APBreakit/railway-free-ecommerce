import type { MetadataRoute } from 'next'
import { locales } from '@/i18n/locales'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const pages = [
    '',
    '/products',
    '/collections',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/returns',
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      const path = `${baseUrl}/${locale}${page}`
      entries.push({
        url: path,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      })
    }
  }

  // TODO: Uzupełnić o dynamiczne strony produktów/kategorii po dodaniu BFF/Strapi
  return entries
}