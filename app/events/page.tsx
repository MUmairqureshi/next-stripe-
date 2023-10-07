import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import EventItems from '@/components/event-items'

const query = groq`
  *[_type=='events']{
    ...,
    "icon": icon.asset->url,
    tags[]->
  }
`

type ModalData = {
  title: string;
  content: string;
} | null;

export default async function Page() {
  const events = await client.fetch(query)
  // console.log(events)

  

  return (
    <div className='events-page p-4 sm:p-6 lg:p-10'>
      <h1>EVENTS</h1>
      <EventItems events={events} />
    </div>
  )
}

