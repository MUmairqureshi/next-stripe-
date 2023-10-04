
import urlFor from "@/lib/urlfor"
import Image from "next/image"
import Link from "next/link"
import { shimmer, toBase64 } from "@/lib/image"

export const RichTextComponents = {
  types: {
    image: ({value}: any) => {
      return (
        <div className='media-block'>
          <Image
            src={urlFor(value).url()}
            alt={value.alt}
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
          />

          <p className='mt-2 text-xs'>{value.alt}</p>
        </div>
      )
    }
  },
  list: {
    bullet: ({children}: any) => (
      <ul className="ml-10 list-disc space-y-5 px-5">{children}</ul>
    ),
    number: ({children}: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    )
  },
  block: {
    h1: ({children}: any) => (
      <h1 className="py-10 text-5xl font-bold">{children}</h1>
    ),
    h2: ({children}: any) => (
      <h2 className="py-10 text-4xl font-bold">{children}</h2>
    ),
    h3: ({children}: any) => (
      <h3 className="py-10 text-3xl font-bold">{children}</h3>
    ),
    h4: ({children}: any) => (
      <h4 className="py-10 text-2xl font-bold">{children}</h4>
    ),
    blockquote: ({children}: any) => (
      <blockquote className="bg-blue-50">
        {children}
      </blockquote>
    )
  },
  marks: {
    link: ({children, value}: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;

      return (
        <Link href={value.href} rel={rel} className="underline" target="_blank">
          {children}
        </Link>
      )
    }
  }
}