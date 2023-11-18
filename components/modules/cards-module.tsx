import Image from 'next/image'
import urlFor from '@/lib/urlfor'
import { Button } from "@/components/ui/buttons"
import Link from "next/link"

interface CardProps {
  image: {
    asset: { _ref: string };
    alt: string;
    caption?: string;
  };
  title?: string;
  text?: string;
}

interface CardsModuleProps {
  module: {
    title?: string;
    cards?: CardProps[];
  };
}

function CardsModule({ module }: CardsModuleProps) {
  return (
    <section className='cards-section page-section'>
      <div className="container">
        <h3>{module.title}</h3>
        <div className='cards-wrapper'>
          {module.cards?.map(card => (
            <div className="card">
              <div className={`card-container ${card.title || card.text ? 'bg-white' : ''}`}>
                <div className='media-block'>
                   <Image
                     src={urlFor(card.image.asset._ref).url()}
                     alt={card.image.alt ? card.image.alt : 'hike clerb image'}
                     width={384}
                     height={384}
                     className='card-img'
                   />
                  {card.image.caption && <small>{card.image.caption}</small>}
                 </div>
                { (card.title || card.text) && (
                    <div className="text-wrapper">
                      {card.title && <h6>{card.title}</h6>}
                      {card.text && <p>{card.text}</p>}
                    </div>
                  )
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardsModule;
