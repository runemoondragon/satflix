import React from 'react'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BTIFLIX - Watch Movies with Bitcoin',
  description: 'Watch your favorite movies using Bitcoin Lightning Network',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ff7f1e',
  openGraph: {
    type: 'website',
    title: 'Btiflix - Movie Streaming Aggregator',
    description: 'Watch movies from multiple platforms in one place',
    siteName: 'Btiflix',
    images: [
      {
        url: '/og-image.png', // Social media preview image
        width: 1200,
        height: 630,
        alt: 'Btiflix Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Btiflix - Movie Streaming Aggregator',
    description: 'Watch movies from multiple platforms in one place',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#ff7f1e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}