import { defaultLocale } from '@/lib/i18n'
import type { Metadata } from 'next'
import {
  Manrope,
  Noto_Naskh_Arabic,
  Source_Serif_4,
} from 'next/font/google'
import './globals.css'

const serif = Source_Serif_4({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
})

const ui = Manrope({
  variable: '--font-ui',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
})

const arabic = Noto_Naskh_Arabic({
  variable: '--font-arabic',
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Hadith Library',
  description: 'A multilingual, reading-first hadith experience.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${serif.variable} ${ui.variable} ${arabic.variable} h-full antialiased`}
      data-theme="winter"
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
