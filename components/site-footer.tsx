"use client"

import Image from 'next/image';
import {ButtonTwo} from "@/components/ui/buttons"
import { urlForImage } from "@/sanity/lib/image"
import { usePathname } from "next/navigation"

type ButtonProps = {
  text: string;
  url: string;
  style: string;
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
    _id: string;
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
        return "grid grid-cols-2";
      case 3:
        return "grid grid-cols-2 sm:grid-cols-3";
      case 4:
      case 8:
        return "grid grid-cols-2 sm:grid-cols-4";
      default:
        return "grid grid-cols-2 sm:grid-cols-3";
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
              width={56}
              height={56}
              alt="Hike Clerb Ladybug Logo"
            />
            <h6 className="text-lg">{settings.footerLogo.caption}</h6>
          </div>

          <form className="default-form-style">
            <p className="text-sm">{settings.formCaption}</p>
            <div className='input-group'>
              <input type="text" name="firstname" id="firstname" placeholder="First Name" aria-label="First Name"/>
              <input type="text" name="lastname" id="lastname" placeholder="Last Name" aria-label="Last Name"/>
              <input type="text" name="email" id="email" placeholder="Email" aria-label="Email"/>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
        <div className='information'>
          <div className="button-caption">
            <p className="text-sm">{settings.footerButtonText}</p>
            <ButtonTwo 
              text={settings.footerButton.text} 
              url={settings.footerButton.url} 
              email={settings.footerButton.email} 
              variant='footer'
            />
          </div>

          <nav className={`link-lists gap-4 sm:gap-8 ${dynamicClassName}`} aria-labelledby="footerMenu">
            {settings.footerLinkLists.map(list => (
              <ul className="footer-link-list" key={list._id}>
                <h6 id="footerMenu" className='text-lg text-black'>{list.name}</h6>
                  {
                    list.url.map((button, i) => (
                      <li key={`${list._id}-${i}`}>
                        <ButtonTwo 
                          text={button.text} 
                          url={button.url} 
                          email={button.email} 
                          variant='footer'
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
          <p className="copyright-text text-xs">&copy; {settings.companyName} {new Date().getFullYear()}</p>
          <p className="text-xs">{settings.footerFinePrint}</p>
        </div>
      </div>
    </footer>
  )
}
