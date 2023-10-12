import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import AccordionItem from "@/components/accordion-item";


type FAQ = {
  _id: string;
  question: string;
  answer: string;
}

const query = groq`
  *[_type=='faq']{
    ...,
  }
`

export default async function Page() {
  const faqs: FAQ[] = await client.fetch(query)

  return (
    <div>
      <div>
        <h3>Frequently Asked Questions</h3>
      </div>
      <div className='faq-wrapper'>
        {faqs.map(faq => (
          <AccordionItem key={faq._id} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}
