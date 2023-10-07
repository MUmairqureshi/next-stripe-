import "@/styles/globals.css"
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

// type Settings = {
//   linkbarText: string;
//   linkbarUrl: string;
//   showLinkbar: string;
//   headerLogo: string;
//   menuIcon: string;
//   accountIcon: string;
//   cartIcon: string;
//   menuLinks: string;
//   footerLogo: string;
//   formCaption: string;
//   companyName: string;
//   footerFinePrint: string;
//   footerTextBlock: string;
//   footerLinkLists: string;
// }

const query = groq`
  *[_type == "settings"][0]{
    ...
  }
`

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await client.fetch(query);
  // console.log(settings);

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
