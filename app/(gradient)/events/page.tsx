import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import EventItems from '@/components/event-items'
import "@/styles/pages/events.scss"

const query = groq`
  *[_type=='events']{
    ...,
    "icon": icon.asset->url,
    tags[]->
  }
`

export default async function Page() {
  const events = await client.fetch(query)

  return (
    <section className='events-page page-section'>
      <div className="container">
        <h1>EVENTS</h1>
        <EventItems events={events} />
      </div>
    </section>
  )
}

