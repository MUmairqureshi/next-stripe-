import Image from 'next/image'
import urlFor from '@/lib/urlfor'
import { Button } from "@/components/ui/buttons"
import Link from "next/link"

type ImageType = {
  asset: {
    _ref: string;
  };
  caption: string;
};

type CalloutModuleProps = {
  module: {
    _type: 'module.callout',
    _id: string,
    image: ImageType, // Make this mandatory
    alt: string       // Make this mandatory
    // Include any other properties you expect for callout module
  }
};

function CalloutModule({ module }: CalloutModuleProps) {
  return (
    <section className='callout'>
      <div className='container'>
        <div className='text-wrapper'></div>
        <div className='media-block'>
          <Image
            src={urlFor(module.image.asset._ref).url()}
            alt={module.alt}
            width={24}
            height={24}
            className='global-tag-icon'
          />
          {module.image.caption}
        </div>
      </div>
    </section>
  );
}

export default CalloutModule;
