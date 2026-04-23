import React from "react"
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/contexts/auth-context'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito"
});

export const metadata: Metadata = {
  title: 'Kyrgyz Memory - Cultural Card Game',
  description: 'Discover Kyrgyz culture through a fun memory card game featuring traditional instruments, costumes, ornaments, and animals. Play solo or with friends!',
  keywords: ['Kyrgyz', 'memory game', 'cultural', 'educational', 'cards', 'Kyrgyzstan', 'Central Asia', 'nomadic culture'],
  authors: [{ name: 'Kyrgyz Memory Team' }],
  creator: 'Kyrgyz Memory Team',
  publisher: 'Kyrgyz Memory',
  metadataBase: new URL('https://kyrgyz-memory.vercel.app'),
  openGraph: {
    title: 'Kyrgyz Memory - Cultural Card Game',
    description: 'Discover Kyrgyz culture through a fun memory card game featuring traditional instruments, costumes, ornaments, and animals.',
    url: 'https://kyrgyz-memory.vercel.app',
    siteName: 'Kyrgyz Memory',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kyrgyz Memory - Cultural Card Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kyrgyz Memory - Cultural Card Game',
    description: 'Discover Kyrgyz culture through a fun memory card game!',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#c54b3c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
