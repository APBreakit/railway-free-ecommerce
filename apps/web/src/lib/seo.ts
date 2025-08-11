import type { Metadata } from 'next'

export function withBaseMetadata(meta: Metadata = {}): Metadata {
  const base: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: { canonical: '/' },
    openGraph: { type: 'website' }
  }
  return { ...base, ...meta }
}