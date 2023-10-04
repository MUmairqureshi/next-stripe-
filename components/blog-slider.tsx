"use client"
import React, { Component } from 'react';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Slider = dynamic(() => import('react-slick'), {
  ssr: false
});

interface Blog {
  _id: string;
  image?: string;
  title: string;
  author: string;
  date: string;
  body: any;
  color?: {
    hex?: string;
  };
}

interface Props {
  blogs?: Blog[];
}

export default class BlogSlider extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.formatDate = this.formatDate.bind(this);
  }

  formatDate(input: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}'`;
  }

  render() {
    const settings = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4.5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 3.5,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2.3,
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

    const blogs = this.props.blogs || [];

    return (
      <Slider {...settings}>
        {blogs.map(blog => (
          <div 
              key={`blog-` + blog._id} 
              className='blog px-4 pb-8 pt-16 sm:px-6'
              style={{ "backgroundColor": blog.color?.hex || 'transparent' }}
            >
              {blog.image && (
                <Image
                  src={blog.image}
                  width={168}
                  height={168}
                  alt="Event Type Icon"
                  className='mb-16'
                />
              )}
              <h2 className="text-5xl sm:text-6xl">{blog.title}</h2>
              <h6 className='mb-6 mt-4 flex gap-2'>
                {blog.author}
                <Image
                  src='/icons/flower.svg'
                  width={16}
                  height={16}
                  alt="Event Type Icon"
                />
                {this.formatDate(blog.date)}</h6>
              <PortableText value={blog.body} components={RichTextComponents} />
            </div>
        ))}
      </Slider>
    );
  }
}
