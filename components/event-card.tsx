"use client"

import { ButtonTwo, Button } from "@/components/ui/buttons"
import Link from "next/link"
import Image from 'next/image'
import urlFor from '@/lib/urlfor'

type Tag = {
  icon?: {
    asset: {
      _ref: string;
    };
  };
  name: string;
}

type SingleEvent = {
  _key: string;
  date: string;
  tags?: Tag[];
  name: string;
  location: string;
  time: string;
  url: string;
  color: {
    hex: string;
  };
  icon: string;
}

type EventProps = {
  events: SingleEvent[];
};

export function EventCard({ events }: EventProps) {
  function formatDate(input: string): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);
    return `${day} ${month} ${year}'`;
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
            className='event border-default card-md relative gap-6' 
            key={event._key}
            style={{"backgroundColor": event.color.hex}}
          >
            <div className='text-wrapper'>
              <div className='name-tags flex flex-col gap-2.5'>
                <h4 className='line-clamp-2'>{formatDate(event.date)}</h4>
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
                <h5>{event.name}</h5>
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
                <Link href={event.url}>
                  <Button size="sm" className="relative">
                    RSVP
                  </Button>
                </Link>
              )}
              
              <Button size="sm" className="relative" variant="ghost">
                Learn more
              </Button>
            </div>
        
          </div>
        ))}
      </div>
  )
}
