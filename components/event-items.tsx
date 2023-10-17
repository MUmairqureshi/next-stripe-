"use client"

import { Button } from "@/components/ui/buttons"
import Link from "next/link"
import Image from 'next/image'
import urlFor from '@/lib/urlfor'
import Modal from '@/components/modal';
import { useState } from 'react';

type Tag = {
  icon?: {
    asset: {
      _ref: string;
    };
  };
  name: string;
};

type Event = {
  _key: string;
  color: {
    hex: string;
  };
  date: string;
  tags?: Tag[];
  name: string;
  location: string;
  time: string;
  icon: string;
  url: string;
  alt: string;
  description?: string;
};

interface Props {
  events: Event[];
}

export default function EventItems({ events = [] }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  const handleOpenModal = (event: Event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentEvent(null);
    setIsModalOpen(false);
  };

  const  background = (bg: string): string => {
    return ` background: ${bg}`
  }

  function formatDate(input: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}'`;
  }

  function formatModalDate(input: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month}`;
  }

  function hasDatePassed(dateString: string): boolean {
    const inputDate = new Date(dateString + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate < today;
  }

  return (
    <div className="events-wrapper mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div 
            className='event border-default card-md relative gap-6 justify-between' 
            key={event._key}
            style={{"backgroundColor": event.color.hex}}
          >
          <div className="text-wrapper flex flex-col gap-6">
            <div className='name-tags flex flex-col gap-2.5'>
                <h4>{formatDate(event.date)}</h4>
                {event.tags && (
                  <div className='event-tags flex flex-wrap items-center'> {
                    (event.tags).map((tag, i) => (
                      <div className='event-tag flex gap-1' key={`tag-` + i}>
                        {tag.icon && (
                          <Image
                            src={urlFor(tag.icon.asset._ref).url()}
                            alt={tag.name}
                            width={24}
                            height={24}
                            className='global-tag-icon'
                          />
                        )}
                        {tag.name && (<p className='text-sm uppercase'>{tag.name}</p>)}
                      </div>
                      ))
                    }
                  </div>
                )}
            </div>
            <div className='details'>
              <h5 className='line-clamp-2'>{event.name}</h5>
              <p>{event.location}</p>
              <p>{event.time}</p>
            </div>
              </div>

            <Image
              src={event.icon}
              width={240}
              height={240}
              alt="Event Type Icon"
              className="absolute left-1/2 top-1/2 -translate-x-2/4 -translate-y-2/4"
            />

            <div className='button-wrapper flex items-center gap-4'>
              {!hasDatePassed(event.date) && (
                <a target="_blank" href={event.url}>
                  <Button size="sm" className="relative">
                    RSVP
                  </Button>
                </a>
              )}
              
              <Button size="sm" className="relative" variant="ghost" onClick={() => handleOpenModal(event)}>
                Learn more
              </Button>
            </div>
        
          </div>
        ))}

        {isModalOpen && currentEvent && (
          <Modal onClose={handleCloseModal}>
            <div className='event-details mt-4 sm:flex sm:gap-4 md:gap-6'>
              <h2 className='max-w-[140px]'>{formatModalDate(currentEvent.date)}</h2>
              <div className="details-right">
                <h4 className='mt-2 sm:mt-0'>{currentEvent.name}</h4>
                <h5 className="mt-1">Location: {currentEvent.location}</h5>
                <h5 className="mt-1">Time: {currentEvent.time}</h5>
              </div>
            </div>
            
            <p className="sm:text-lg mt-4 text-sm">{currentEvent.description}</p>
            {!hasDatePassed(currentEvent.date) && (
                <a target="_blank" href={currentEvent.url} className="mt-4 md:mt-6 block">
                  <Button size="sm" className="relative">
                    RSVP
                  </Button>
                </a>
              )}
            
          </Modal>
        )}
      </div>
  )

}