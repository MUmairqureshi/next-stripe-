"use client"

import Image from 'next/image';
import {ButtonTwo} from "@/components/ui/buttons"
import { urlForImage } from "@/sanity/lib/image"
import { usePathname } from "next/navigation"

// import localFont from 'next/font/local'
// const Lemiesz = localFont({ src: '' })

type ButtonProps = {
  text: string;
  url: string;
  style: "default" | "destructive" | "text" | "ghost" | "primary" | "secondary" | "link" | "header" | "footer";
  email?: string;
};

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
    _key: string;
    name: string;
    url: ButtonProps[];
  }[];
  footerButtonText: string;
  footerButton: ButtonProps;
};

export function SiteFooter({ settings }: { settings: Settings }) {
  const pathname = usePathname()
  const footerType = pathname.startsWith('/contact') || pathname.startsWith('/about') ? 'graphic-footer' : 'default-footer'
  const getClassNameBasedOnCount = (count: number): string => {
    // Modify this function to return appropriate class names
    // based on the count value.
    switch (count) {
      case 0:
        return "d-none";
      case 1:
        return "block";
      case 2:
        return "grid grid-cols-2 gap-4 sm:gap-16";
      case 3:
        return "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-16";
      case 4:
      case 8:
        return "grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-16";
      default:
        return "grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-16";
    }
  };

  const linkListCount = settings.footerLinkLists.length;
  const dynamicClassName = getClassNameBasedOnCount(linkListCount);

  return (
    <footer className={`site-footer ${footerType}`}>
      <div className="container">
        <div className="brand">
          <div className="logo-caption">
            <Image
              src={urlForImage(settings.footerLogo.asset).url()}
              width={64}
              height={64}
              alt="Hike Clerb Ladybug Logo"
            />
            <h5 className="footer-logo-caption">{settings.footerLogo.caption}</h5>
          </div>

          <form className="default-form-style">
            <p className="footer-form-caption">{settings.formCaption}</p>
            <div className='input-wrapper'>
              <div className='input-group'>
                <input type="text" name="firstname" id="firstname" placeholder="First Name" aria-label="First Name"/>
                <input type="text" name="lastname" id="lastname" placeholder="Last Name" aria-label="Last Name"/>
                <input type="text" name="email" id="email" placeholder="Email" aria-label="Email"/>
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='information'>
          <div className="button-caption">
            <p className="footer-button-caption">{settings.footerButtonText}</p>
            <ButtonTwo 
              text={settings.footerButton.text} 
              url={settings.footerButton.url} 
              email={settings.footerButton.email} 
              variant={settings.footerButton.style} 
            />
          </div>

          <nav className={`link-lists ${dynamicClassName}`} aria-labelledby="footerMenu">
            {settings.footerLinkLists.map(list => (
              <ul className="footer-link-list" key={list._key}>
                <h6 id="footerMenu" className='footer-list-title'>{list.name}</h6>
                  {
                    list.url.map((button, i) => (
                      <li key={`${list._key}-${i}`}>
                        <ButtonTwo 
                          text={button.text} 
                          url={button.url} 
                          email={button.email} 
                          variant='text'
                          size='sm'
                        />
                      </li>
                    ))
                  }
              </ul>
            ))}
          </nav>
        </div>

        <div className="copyright">
          <p className="copyright-text">&copy; {settings.companyName} {new Date().getFullYear()}</p>
          <p className="fine-print">{settings.footerFinePrint}</p>
        </div>
      </div>
    </footer>
  )
}
