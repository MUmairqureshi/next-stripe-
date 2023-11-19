import "@/styles/tailwind.css"
// import "@/styles/main.scss"
import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { siteConfig } from "@/config/site"
import { fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { SiteBlob } from "@/components/site-blob"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

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

const query = groq`
  *[_type == "settings"][0]{
    ...
  }
`

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await client.fetch(query);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-paper-4 min-h-screen font-mono antialiased",
            fontMono.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader settings={settings} />
              {/* <SiteBlob/> */}
              <div className="flex-1">{children}</div>
              <SiteFooter settings={settings}/>
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}
