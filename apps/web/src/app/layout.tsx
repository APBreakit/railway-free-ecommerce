import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'All Natural – E-commerce',
    template: '%s | All Natural'
  },
  description: 'Naturalne produkty pielęgnacyjne – All Natural',
  openGraph: {
    title: 'All Natural',
    description: 'Naturalne produkty pielęgnacyjne – All Natural',
    url: '/',
    siteName: 'All Natural',
    type: 'website'
  },
  icons: { icon: '/favicon.ico' }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}