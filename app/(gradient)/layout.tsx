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
import Image from 'next/image'

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

const query = groq`
  *[_type == "settings"][0]{
    ...
  }
`

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await client.fetch(query);
  // const className = usePageClassname();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            // className,
            "gradient-background bg-greenLight font-mono antialiased",
            fontMono.variable
          )}
        >
          <Image
            src='/clouds/cloud1.svg'
            alt='white cloud floating on page'
            width={344}
            height={133}
            className='cloud cloud-1'
          />
          <Image
            src='/clouds/cloud2.svg'
            alt='white cloud floating on page'
            width={658}
            height={318}
            className='cloud cloud-2'
          />
          <Image
            src='/clouds/cloud3.svg'
            alt='white cloud floating on page'
            width={531}
            height={205}
            className='cloud cloud-3'
          />
          <Image
            src='/clouds/cloud4.svg'
            alt='white cloud floating on page'
            width={371}
            height={143}
            className='cloud cloud-4'
          />
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
