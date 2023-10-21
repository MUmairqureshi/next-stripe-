"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { XCircle } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

// import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
interface Product {
  _id: string;
  slug: string;
  name: string;
  images: any[];
  tags?: { icon: { asset: any }, name: string }[];
  price: number;
}

interface Props {
  products: Product[];
}

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className='no-products'>
          <h1>
            There are no products that match your search
          </h1>
      </div>
    )
  }
  
  return (
    <section className="products-wrapper">
      <div className="container">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product.slug}`} className="product-card">
            <div className='media-block'>
              <Image
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(225, 280))}`}
                src={urlForImage(product.images[0]).url()}
                alt={product.name}
                width={225}
                height={280}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className='product-info'>
              <h5>{product.name}</h5>

              {product.tags && (
                <div className="product-tags">
                  {product.tags.map(tag => (
                    <div className="product-tag">
                      <Image
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(20, 20))}`}
                        src={urlForImage(tag.icon.asset).url()}
                        alt={tag.name}
                        width={20}
                        height={20}
                      />
                      <small>{tag.name}</small>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="buy-badge">Add to Cart &mdash; {formatCurrencyString({ currency: "USD", value: product.price})}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
