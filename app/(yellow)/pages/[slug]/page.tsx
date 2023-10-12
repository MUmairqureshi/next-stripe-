import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {
  const query = groq`
    *[_type == "pages" && slug.current == "${params.slug}"][0]{
      title,
      text
    }
  `
  const page = await client.fetch(query)

  return (
    <section className='page py-10 sm:py-12 lg:py-20'>
      <div className='container mx-auto max-w-screen-lg px-4 sm:px-8 lg:px-16'>
        <h1 className='mb-4'>{page.title}</h1>
        <div className='text-block'>
          <PortableText value={page.text} components={RichTextComponents} />
        </div>
      </div>
    </section>
  )
}
