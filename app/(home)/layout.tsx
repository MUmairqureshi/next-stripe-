import "@/styles/pages/home.scss"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import BasicAnimationLayout from "@/components/BasicAnimationLayout"

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: '<https://www.hikeclerb.com>',
    siteName: siteConfig.name,
    images: [
      {
        url: '/card.jpg',
        width: 1200,
        height: 600,
      }
    ]
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-mono antialiased",
            fontMono.variable
          )}
        >
          <BasicAnimationLayout>{children}</BasicAnimationLayout>
        </body>
      </html>
    </>
  )
}
