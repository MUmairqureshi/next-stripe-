import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";
import "@/styles/pages/faq.scss"

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
    <section className="faq-page page-section ">
      <div className="container gap-6 md:flex">
        <div className="title-wrapper p-4 md:sticky md:top-32 md:max-w-sm md:p-6">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className='faq-wrapper mt-4 flex flex-col gap-4 sm:mt-6 md:mt-0'>
          {faqs.map(faq => (
            <div 
              key={faq._key} 
              className='faq p-4 md:p-6'
            >
              <h5 className='mb-2'>{faq.question}</h5>
              <PortableText value={faq.answer} components={RichTextComponents} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
