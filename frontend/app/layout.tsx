import React from 'react'
import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '../components/Navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vooomo Movies',
  description: 'Watch movies from multiple platforms in one place',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192.png',
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
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