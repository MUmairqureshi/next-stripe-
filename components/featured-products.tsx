"use client"

import Image from "next/image"
import Link from "next/link"
import React, { Component } from 'react';
import Slider from "react-slick";
import { urlForImage } from "@/sanity/lib/image"
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
  // ... other potential properties
}

interface Props {
  products: Product[];
}

 export default class FeaturedProducts extends Component<Props> {
  render() {
    const { products } = this.props;

    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            infinite: true,
          }
        }
      ]
    };
    
    return (

      <Slider {...settings}>
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
                      {product.tags.map((tag: { icon: { asset: any }, name: string }) => (
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
      </Slider>

    )
  }
 }
