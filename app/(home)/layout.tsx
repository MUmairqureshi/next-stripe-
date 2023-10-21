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
