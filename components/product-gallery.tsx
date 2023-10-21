"use client"

import React, { Component } from 'react';
import Image from "next/image"
import Slider from "react-slick";
import { urlForImage } from "@/sanity/lib/image"
// import { SanityProduct } from "@/config/inventory"
import { shimmer, toBase64 } from "@/lib/image"
interface Product {
  name: string;
  images: {
    _key: string;
    // other properties of the image if there are any...
  }[];
}

interface Props {
  product: Product;
}

export default class ProductGallery extends Component<Props> {
  render() {
    const { product } = this.props;

    const settings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Slider {...settings}>
        {product.images.map((image, i) => (
          <div
            key={image._key as string}
            className="media-block"
          >
            <Image
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(480, 480))}`}
              src={urlForImage(image).url()}
              width={480}
              height={480}
              alt={product.name}
              className="product-img"
            />
          </div>
        ))}
      </Slider>
    )
  }
}
