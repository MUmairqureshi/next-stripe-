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
    <div className='page'>
      <h1>{page.title}</h1>
      <PortableText value={page.text} components={RichTextComponents} />
    </div>
  )
}
