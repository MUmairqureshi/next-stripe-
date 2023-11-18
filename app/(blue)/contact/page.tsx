import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";
import { Button, ButtonTwo } from "@/components/ui/buttons";

import "@/styles/pages/contact.scss"

type Link = {
  _key: string;
  url: string;
  text: string;
  style:  "default" | "destructive" | "text" | "ghost" | "primary" | "secondary" | "link" | "header" | "footer";
  email: string;
};

export default async function Page() {
   const query = groq`
    *[_type == "settings"][0]{
      contactFormTitle,
      contactInfo,
      contactLinks
    }
  `
  const settings = await client.fetch(query)

  return (
    <div className='contact-page'>
      <section className="contact-section default-padding">
        <div className="container">
          <form className="default-form-style">
            <h3 className='text-center'>{settings.contactFormTitle}</h3>
            <div className='input-wrapper mt-6 md:mt-10'>
              <div className='input-group'>
                <input type="text" name="firstname" id="firstname" placeholder="First Name" aria-label="First Name"/>
                <input type="text" name="lastname" id="lastname" placeholder="Last Name" aria-label="Last Name"/>
              </div>
                <input type="text" name="email" id="email" placeholder="Email" aria-label="Email"/>
                <textarea name="message" id="message" placeholder="Let's talk about it" aria-label="Message"/>
                <button type="submit">Submit</button>
            </div>
          </form>

          <div className="contact-info">
            <div className='contact-text'>
              <PortableText 
                value={settings.contactInfo} 
                components={RichTextComponents} />
            </div>
            <div className="contact-links mt-8 flex flex-col gap-2 md:mt-10 xl:flex-row xl:gap-4">
              {settings.contactLinks.map((link: Link) => (
                <ButtonTwo key={link._key} text={link.text} url={link.url} email={link.email} variant={link.style} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
