"use client"

import Image from 'next/image';
import urlFor from '@/lib/urlfor';
import React, { Component } from 'react';
import Slider from "react-slick";

interface ImageProps {
  asset: {
    _ref: string;
  };
  alt: string;
  caption?: string;
}

interface GalleryModuleProps {
  module: {
    images: ImageProps[];
  };
}

 export default class GalleryModule extends Component<GalleryModuleProps> {
  render() {
    const { module } = this.props;

    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            infinite: true,
          }
        }
      ]
    };
    
    return (

      <section className='gallery-section page-section'>
        <div className="container">
          <Slider {...settings}>
            {module.images.map((img, index) => (
                <div key={index} className='gallery-item'>
                  <div className='media-block'>
                    <Image
                      src={urlFor(img.asset._ref).url()}
                      alt={img.alt ? img.alt : 'hike clerb image'}
                      width={384}
                      height={384}
                      className='card-img'
                    />
                  </div>
                  {img.caption && <small>{img.caption}</small>}
                </div>
              ))}
          </Slider>
        </div>
      </section>

      
    )
  }
 }
