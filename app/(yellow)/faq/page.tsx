import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";

type BlockContent = any[];

type FAQ = {
  _key: string;
  question: string;
  answer: BlockContent;
}

const query = groq`
  *[_type=='faq']{
    ...,
  }
`

export default async function Page() {
  const faqs: FAQ[] = await client.fetch(query)

  return (
    <div className="faq-page gap-6 p-4 sm:p-6 md:flex md:p-10">
      <div className="rounded-2xl border border-dashed border-pink p-4 md:sticky md:top-32 md:h-screen md:max-w-sm md:p-6">
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className='faq-wrapper mt-4 flex flex-col gap-4 sm:mt-6 md:mt-0'>
        {faqs.map(faq => (
          <div 
            key={faq._key} 
            className='faq rounded-2xl border border-dashed border-greenDark p-4 md:p-6'
          >
            <h5 className='mb-2'>{faq.question}</h5>
            <PortableText value={faq.answer} components={RichTextComponents} />
          </div>
        ))}
      </div>
    </div>
  )
}
