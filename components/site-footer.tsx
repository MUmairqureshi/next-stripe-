"use client"

import Image from 'next/image';
import ButtonTwo from "@/components/ui/button-two"
import { urlForImage } from "@/sanity/lib/image"
import { usePathname } from "next/navigation"

type ButtonProps = {
  text: string;
  url: string;
  style: string;
  email?: string;
}

type Settings = {
  footerLogo: {
    asset: {
      _ref: string;
    };
    caption: string;
  };
  formCaption: string;
  companyName: string;
  footerFinePrint: string;
  footerTextBlock: string;
  footerLinkLists: {
    _id: string;
    name: string;
    url: ButtonProps[];
  }[];
  footerButtonText: string;
  footerButton: ButtonProps;
}

export function SiteFooter({ settings }: { settings: Settings }) {
  const pathname = usePathname()
  if (pathname.startsWith('/studio')) return null

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="logo-caption">
          <Image
            src={urlForImage(settings.footerLogo.asset).url()}
            width={56}
            height={56}
            alt="Event Type Icon"
          />
          <h6 className="text-xl">{settings.footerLogo.caption}</h6>
        </div>

        <form>
          <p className="text-sm">{settings.formCaption}</p>
        </form>

        <div className="button-caption">
          <p className="text-sm">{settings.footerButtonText}</p>
          <ButtonTwo 
            text={settings.footerButton.text} 
            url={settings.footerButton.url} 
            email={settings.footerButton.email} 
            style={settings.footerButton.style} 
          />
        </div>

        <div className="link-lists">
          {settings.footerLinkLists.map(list => (
            <div className="footer-link-list" key={list._id}>
              <p>{list.name}</p>
              {
                list.url.map(button => (
                  <ButtonTwo 
                    text={button.text} 
                    url={button.url} 
                    email={button.email} 
                    style={button.style}
                  />
                ))
              }
            </div>
          ))}
        </div>

        <div className="copyright">
          <p className="copyright-text text-sm">&copy; {settings.companyName} {new Date().getFullYear()}</p>
          <small>{settings.footerFinePrint}</small>
        </div>
      </div>
    </footer>
  )
}
