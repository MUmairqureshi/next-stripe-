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
  _key: string;
  image?: string;
  title: string;
  author: string;
  date: string;
  body: any;
  color: {
    hex: string;
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
        {blogs.map((blog, index) => (
          <div 
              key={`blog-` + blog._key} 
              className="blog"
            >
              <div 
                className={`container px-4 py-8 sm:px-6 ${index % 2 !== 0 ? 'bg-paper-1' : 'bg-paper-2'}`}
                style={{"backgroundColor": blog.color.hex}}
              >
                {blog.image && (
                  <div className="media-block w-32 h-32 mx-auto mb-12">
                    <Image
                      src={blog.image}
                      width={124}
                      height={124}
                      alt="Event Type Icon"
                      className='object-contain h-full'
                    />
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl xl:text-5xl">{blog.title}</h2>
                <p className='mt-3 mb-4 sm:mb-6 sm:mt-4 flex gap-2 text-sm flex-wrap'>
                  {blog.author}
                  <Image
                    src='/icons/flower.svg'
                    width={16}
                    height={16}
                    alt="Event Type Icon"
                  />
                  {this.formatDate(blog.date)}</p>
                <PortableText value={blog.body} components={RichTextComponents} />
              </div>
            </div>
        ))}
      </Slider>
    );
  }
}
