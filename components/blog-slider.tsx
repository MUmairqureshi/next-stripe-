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
          breakpoint: 1280,
          settings: {
            slidesToShow: 3.2,
          }
        },
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 2.6,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1.2,
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
                // style={{backgroundColor: `rgba(${blog.color.rgb.r}, ${blog.color.rgb.g}, ${blog.color.rgb.b}, 0.7)`}}
              >
                {blog.image && (
                  <div className="media-blog mx-auto mb-12 h-32 w-32">
                    <Image
                      src={blog.image}
                      width={124}
                      height={124}
                      alt="Event Type Icon"
                      className='h-full object-contain'
                    />
                  </div>
                )}
                <h2 className="blog-title line-clamp-4 lg:line-clamp-3">{blog.title}</h2>
                <p className='mb-4 mt-3 flex flex-wrap gap-2 text-sm sm:mb-6 sm:mt-4'>
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
