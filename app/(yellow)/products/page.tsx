import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import ProductCategories from "@/components/product-categories"
import "@/styles/pages/shop.scss"

interface Props {
  searchParams: {
    date?: string,
    price?: string,
    color?: string,
    category?: string,
    size?: string,
    search?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { date = "desc", price, color, category, size, search } = searchParams
  const priceOrder = searchParams.price ? `| order(price ${price})` : ''
  const dateOrder = searchParams.date ? `| order(_createdAt ${date})` : ''
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ""
  const categoryFilter = category ? `&& "${category}" in categories` : ""
  const sizeFilter = size ? `&& "${size}" in sizes` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""
  const filter = `*[${productFilter}${colorFilter}${categoryFilter}${sizeFilter}${searchFilter}]`

  //  const products = await client.fetch<SanityProduct[]>(
  //     groq`${filter} ${order} {
  //       _id,
  //       _createdAt,
  //       name,
  //       sku,
  //       images,
  //       currency,
  //       price,
  //       description,
  //       "slug": slug.current,
  //        tags[]->,
  //        categories[]->,
  //        colors[]->,
  //     }`
  //   )

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
      inventory,
      "slug": slug.current,
      tags[]->,
      categories[]->,
      colors[]->,
    }`
  )

  // console.log("products ===>>> ", products)

  const categories = await client.fetch(
    groq`*[_type=='productCategory']{
        ...,
      }
    `
  )


  return (
    <div className='bg-paper-3'>
      <h2 id="products-heading" className="sr-only">Products</h2>
      {/* <ProductSort/> */}
      {/* <ProductFilters/> */}
      <ProductCategories categories={categories} products={products} />
      <ProductGrid products={products}/>
    </div>
  )
}
