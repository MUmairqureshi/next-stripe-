import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { SanityProduct } from "@/config/inventory"
import ProductGallery from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import FeaturedProducts from "@/components/featured-products"
import "@/styles/components/slick.css"
import "@/styles/components/slick-theme.css"
import "@/styles/pages/product.scss"

interface Props {
  params: {
    slug: string
  }
}

export default async function Page({ params }: Props) {

  const product = await client.fetch (
    groq`*[_type == "product" && slug.current == "${params.slug}"][0] {
      ...,
      _id,
      _createdAt,
      "id": _id,
      name,
      sku,
      images,
      price,
      currency,
      description,
      inventory,
      i_inventory[],
      "slug": slug.current,
      tags[]->,
      categories[]->,
      colors[]->,
      sizes[]->,
    }`
  )

  const products = await client.fetch(
    groq`*[_type == "product"] {
      _id,
      _createdAt,
      name,
      sku,
      images,
      currency,
      price,
      description,
      "slug": slug.current,
      tags[]->,
      categories[]->,
      colors[]->,
    }`
  )

  console.log("product ===>>> ", product)


  return (
    <main className='product-page'>
      <section className="product-section">
        <div className="container">
          <ProductGallery product={product} />
          <ProductInfo product={product}/>
        </div>
      </section>
      <section className="featured-products">
        <div className="container">
          <FeaturedProducts products={products} />
        </div>
      </section>
    </main>
  )
}