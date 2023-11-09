import Image from 'next/image'
import urlFor from '@/lib/urlfor'
import { ButtonTwo } from "@/components/ui/buttons"
import { PortableText } from '@portabletext/react'
import { RichTextComponents } from "@/components/RichTextComponents"

type ColorType = {
  rgb: {
    r: number;
    g: number;
    b: number;
  }
}

type TextBlockType = {
  _key: string;
  title?: string;
  subtitle?: string;
  text?: any[];
  color: ColorType;
  link: {
    text: string;
    email: string;
    url: string;
    style: "default" | "destructive" | "text" | "ghost" | "primary" | "secondary" | "link" | "header" | "footer";
  };
}

type ImageType = {
  asset: {
    _ref: string;
  }
  caption: string;
  alt: string;
}

type CalloutModuleProps = {
  module: {
    _type: 'module.callout',
    _key: string,
    image: ImageType,
    imageFirst?: boolean;
    tabletColumns?: boolean;
    textBlock?: TextBlockType[];
  }
}

function CalloutModule({ module }: CalloutModuleProps) {
  return (
    <section className='callout-section page-section'>
      <div className={`container flex gap-6 md:gap-10 ${module.imageFirst ? 'flex-col' : 'flex-col-reverse'} ${module.tabletColumns ? 'md:grid md:grid-cols-2 md:items-center' : 'lg:grid lg:grid-cols-2 lg:items-center'}`}>
        <div className='media-block'>
          <Image
            src={urlFor(module.image.asset._ref).url()}
            alt={module.image.alt}
            width={480}
            height={480}
            className='global-tag-icon'
          />
          <p className="caption">{module.image.caption}</p>
        </div>
        <div className={module.imageFirst ? 'callout-content' : 'callout-content col-start-1 row-start-1'}>
          {module.textBlock?.map(block => (
            <div 
              key={block._key} // Assuming that either title or subtitle is unique, you may want to provide a more appropriate key
              className='text-block'
              style={{ backgroundColor: `rgba(${block.color.rgb.r}, ${block.color.rgb.g}, ${block.color.rgb.b}, 0.5)` }}
            >
              {block.title && <h4>{block.title}</h4>}
              {block.subtitle && <h5>{block.subtitle}</h5>}
              {block.text && <PortableText value={block.text} components={RichTextComponents} />}
              {(block.link.text || block.link.email) && block.link.url && 
                <ButtonTwo text={block.link.text} url={block.link.url} email={block.link.email} variant={block.link.style} size='sm' />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CalloutModule
