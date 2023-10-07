import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";

export default async function Page() {
   const query = groq`
    *[_type == "settings"][0]{
      contactFormTitle,
      contactInfo,
      contactLinks
    }
  `
  const settings = await client.fetch(query)
  // console.log(settings)

  return (
    <div className='contact-page'>
      <h1>{settings.contactFormTitle}</h1>
      <PortableText value={settings.contactInfo} components={RichTextComponents} />
    </div>
  )
}
