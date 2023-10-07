"use client"

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import ButtonTwo from "@/components/ui/button-two";
import { Input } from "@/components/ui/input";
import { urlForImage } from "@/sanity/lib/image";
import { useState } from 'react';

type Settings = {
  linkbarText: string;
  linkbarUrl?: string;
  showLinkbar: boolean;
  headerLogo: {
    asset: {
      _ref: string;
    };
  };
  menuIcon: {
    asset: {
      _ref: string;
    };
  };
  accountIcon: {
    asset: {
      _ref: string;
    };
  };
  cartIcon: {
    asset: {
      _ref: string;
    };
  };
  menuLinks: {
    text: string;
    url: string;
    style: string;
    email?: string;
    _id?: string; // Assuming menuLinks has an _id property
  }[];
};

export function SiteHeader({ settings }: { settings: Settings }) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartCount } = useShoppingCart()
  const defaultSearchQuery = searchParams.get('search') ?? ""
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  if (pathname.startsWith('/studio')) return null

   function onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchQuery = formData.get("search")
    router.replace(`/shop/?search=${searchQuery}`)
  }

  return (
    <div className='header-linkbar-wrapper sticky left-0 top-0 z-40 w-full'>
      {/* linkbar */}
      {
        settings.showLinkbar && (
          <div className="linkbar flex items-center bg-brownLight px-4 py-2 text-center">
            {settings.linkbarUrl ? 
              <Link href="/" className='w-full'><span className='linkbar-text text-sm text-greenDark'>{settings.linkbarText}</span></Link> 
              : (<span className='linkbar-text text-sm text-greenDark'>{settings.linkbarText}</span>)}
          </div>
        )
      }

      {/* header */}
      <header className="w-full p-2 sm:px-4">
        <div className="container grid w-full grid-cols-3 p-2 backdrop-blur-md sm:px-8">
          <div className="menu-contaienr">
            <button onClick={toggleMenu}>
              <Image
                src={urlForImage(settings.menuIcon.asset).url()}
                width={32}
                height={32}
                alt="Event Type Icon"
              />
            </button>
          </div>

          <div className="logo-container flex items-center justify-center">
            <Link href="/">
              <Image
                src={urlForImage(settings.headerLogo.asset).url()}
                width={128}
                height={40}
                alt="Event Type Icon"
              />
            </Link>
          </div>

          
          {/* <MainNav /> */}
          
          <div className="icons-wrapper flex justify-end gap-4">
            <Link href="/" className='hidden sm:block'>
              <Image
                src={urlForImage(settings.accountIcon.asset).url()}
                width={32}
                height={32}
                alt="Event Type Icon"
              />
            </Link>
            <Link href="/cart" className='relative'>
              <Image
                src={urlForImage(settings.cartIcon.asset).url()}
                width={32}
                height={32}
                alt="Event Type Icon"
              />
              <span className="absolute right-4 top-4 ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Link>
            {/* <ThemeToggle /> */}
            {process.env.NODE_ENV === 'development' && (
              <Link href='/studio' className='hidden sm:block'>
                <Button size="sm" variant="ghost">
                  Studio
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* menu */}
      {showMenu &&
        <div className="site-menu">
          <nav aria-labelledby="mainmenulabel" className='main-menu'>
            <h2 id="mainmenulabel" className="sr-only">Main Menu</h2>
            <ul>
              {settings.menuLinks.map(item => (
                <li key={item._id}>
                  <ButtonTwo text={item.text} url={item.url} email={item.email} style={item.style} />
                </li>
              ))}
            </ul>
          </nav>

          <form 
            onSubmit={onSubmit} 
            className="hidden items-center lg:inline-flex"
          >
            <Input
              id="search"
              name="search"
              type="search"
              autoComplete="off"
              placeholder="Search products..."
              className="h-9 lg:w-[300px]"
              defaultValue={defaultSearchQuery}
            />
          </form>
        </div>
      }
    </div>
  )
}
