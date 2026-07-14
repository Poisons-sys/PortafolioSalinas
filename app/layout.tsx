import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#07101d',
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers()
  const forwardedHost = requestHeaders.get('x-forwarded-host')?.split(',')[0]?.trim()
  const host = forwardedHost || requestHeaders.get('host') || 'localhost:3000'
  const protocol = requestHeaders.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const metadataBase = new URL(`${protocol}://${host}`)
  const socialImage = new URL('/og.png', metadataBase).toString()

  return {
    metadataBase,
    title: 'Rene Salinas — Full Stack Developer',
    description:
      'Productos web, APIs .NET y software para operaciones construido de punta a punta.',
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: 'Rene Salinas — Full Stack Developer',
      description: 'Productos web, APIs y sistemas para operaciones construidos de punta a punta.',
      type: 'website',
      locale: 'es_MX',
      images: [{ url: socialImage, width: 1730, height: 909, alt: 'Rene Salinas — Full Stack Developer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rene Salinas — Full Stack Developer',
      description: 'Productos web, APIs y sistemas para operaciones construidos de punta a punta.',
      images: [socialImage],
    },
  }
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
