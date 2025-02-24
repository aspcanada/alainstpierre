import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Alain St Pierre',
    default: 'Alain St Pierre - AI & Cloud Solutions Expert',
  },
  description:
    'I’m Alain, an AI & Cloud Solutions Expert based on Vancouver Island. I help businesses leverage cutting-edge technology to solve big challenges and unlock their potential in the cloud.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
        <GoogleAnalytics gaId="G-TRLGEVW5PH" />
      </body>
    </html>
  )
}
