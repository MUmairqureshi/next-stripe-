import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import CalloutModule from "@/components/modules/callout-module"
import CardsModule from "@/components/modules/cards-module"
import GalleryModule from "@/components/modules/gallery-module"

type ImageType = {
  asset: {
    _ref: string;
  };
  caption: string;
  alt: string; 
};

type CalloutModuleType = {
  _type: 'module.callout',
  _key: string,
  image: ImageType,
  alt: string
};

type CardsModuleType = {
  _type: 'module.cards',
  _key: string,
  flyingTitle: string
};

type GalleryModuleType = {
  _type: 'module.gallery',
  _key: string,
  images: ImageType[],  // Make this an array
};


type ModuleType = CalloutModuleType | CardsModuleType | GalleryModuleType;

type AboutType = {
  modules: ModuleType[],
};


const query = groq`
  *[_type=='about']{
    ...,
  }
`

export default async function Page() {
  const about: AboutType[] = await client.fetch(query);
  if (!about || about.length === 0) return null; // Handle case if about is empty or undefined 
  const modules = about[0].modules;

  return (
    <main className='about-page'>
      {modules.map(module => {
        if (module._type === 'module.callout') {
          return <CalloutModule module={module} key={module._key} />;
        }
        if (module._type === 'module.cards') {
          return <CardsModule module={module} key={module._key} />;
        }
        if (module._type === 'module.gallery') {
          return <GalleryModule module={module} key={module._key} />;
        }
        return null;
      })}
    </main>
  )
}
