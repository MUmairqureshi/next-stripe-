import Image from 'next/image';
import urlFor from '@/lib/urlfor';

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

function GalleryModule({ module }: GalleryModuleProps) {
  console.log(module);

  return (
    <section className='gallery-section'>
      <div className="container">
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
      </div>
    </section>
  );
}

export default GalleryModule;
