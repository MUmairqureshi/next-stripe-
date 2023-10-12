import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import CalloutModule from "@/components/modules/callout-module"
import CardsModule from "@/components/modules/cards-module"

type ImageType = {
  asset: {
    _ref: string;
  };
  caption: string;
};

type CalloutModuleType = {
  _type: 'module.callout',
  _id: string,
  image: ImageType,
  alt: string
};

type CardsModuleType = {
  _type: 'module.cards',
  _id: string,
  flyingTitle: string
};

type ModuleType = CalloutModuleType | CardsModuleType;

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
  console.log(modules);

  return (
    <>
      {modules.map(module => {
        if (module._type === 'module.callout') {
          return <CalloutModule module={module} key={module._id} />;
        }
        if (module._type === 'module.cards') {
          return <CardsModule module={module} key={module._id} />;
        }
        return null;
      })}
    </>
  )
}
