"use client"

import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from "@/components/RichTextComponents";

interface AccordionProps {
  question: string;
  answer: any; // Adjust this type as necessary, e.g., if you know it's a specific structure
}

const AccordionItem: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <h5 onClick={toggleAccordion}>{question}</h5>
      {isOpen && <PortableText value={answer} components={RichTextComponents} />}
    </div>
  );
};

export default AccordionItem;
