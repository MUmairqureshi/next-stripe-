import Image from 'next/image'
import urlFor from '@/lib/urlfor'
import { Button } from "@/components/ui/buttons"
import Link from "next/link"

type ModuleType = {
  flyingTitle: string;
  // Add other properties if necessary
};

type CardsModuleProps = {
  module: {
    _type: 'module.cards',
    _id: string,
    flyingTitle: string  // Make this mandatory
    // Include any other properties you expect for cards module
  }
};

function CardsModule({ module }: CardsModuleProps) {
  return (
    <section className='cards'>
      {module.flyingTitle}
    </section>
  );
}

export default CardsModule;
