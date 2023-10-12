import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import BlogSlider from "@/components/blog-slider"
import "@/styles/components/slick.css"
import "@/styles/components/slick-theme.css"

export default async function Page() {
  const query = groq`
    *[_type=='blogs']{
      ...,
      "image": icon.asset->url,
    }
  `
  const blogs = await client.fetch(query)
  
  return (
    <div className="blogs-page">
      <BlogSlider blogs={blogs}/>
    </div>
  )
}
