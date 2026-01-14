'use client';

import { memo, useEffect, useState } from 'react';
import { type RawTileInfo } from 'types';
import { InnerOwnTile } from 'InnerOwnTile';
import {
  Calendar,
  MapPin,
  Ticket,
  SpinnerGap
} from '@phosphor-icons/react/dist/ssr';

type Props = {
  /** Link to event page */
  link?: string;
  /** Title of the event */
  title?: string;
  /** Date and time of the event */
  date?: string;
  /** Location of the event */
  location?: string;
  /** Theme */
  theme?: 'light' | 'dark';
};

// Default background if no OpenGraph image is found
const DEFAULT_BACKGROUNDS = [
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
];

// Create a new interface for the OpenGraph data
interface OpenGraphData {
  imageUrl?: string;
  title?: string;
  date?: string;
}

// Update the function to return the simplified data structure
const extractOpenGraphData = async (url: string): Promise<OpenGraphData> => {
  try {
    if (!url) return {};

    // Call our API endpoint
    const apiUrl = `/api/get-opengraph?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error('OpenGraph API error:', await response.text());
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to extract OpenGraph data:', error);
    return {};
  }
};

// Format date in a nice way
const formatEventDate = (
  dateTimeStr: string
): { date: string; time: string; month: string; day: string; year: string } => {
  const dateTime = new Date(dateTimeStr);
  const month = dateTime.toLocaleString('en-US', { month: 'short' });
  const day = dateTime.getDate().toString();
  const year = dateTime.getFullYear().toString();
  const date = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  const time = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return { date, time, month, day, year };
};

// Theme styles
const getThemeStyles = (color: 'light' | 'dark') => {
  switch (color) {
    case 'light':
      return {
        container: 'bg-gray-900 text-white',
        dateBox: 'bg-white/10 text-white',
        title: 'text-white',
        details: 'text-white/80',
        button: 'bg-white/20 text-white hover:bg-white/30'
      };
    case 'dark':
    default:
      return {
        container: 'bg-white text-gray-900',
        dateBox: 'bg-black/90 text-white',
        title: 'text-gray-900',
        details: 'text-[#131313]',
        button: 'bg-black/90 text-white hover:bg-black/80'
      };
  }
};

// Get a random background if no OpenGraph image
const randomBackground =
  DEFAULT_BACKGROUNDS[Math.floor(Math.random() * DEFAULT_BACKGROUNDS.length)];

export const Event = (props: Props) => {
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [loadedLink, setLoadedLink] = useState<string>('');
  const [suggestedTitle, setSuggestedTitle] = useState<string | null>(null);
  const [suggestedDate, setSuggestedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const theme = props.theme || 'light';
  // If we have a suggested title from OpenGraph and no custom title, use the suggested one
  const title = props.title || suggestedTitle || 'Untitled Event';
  const link = props.link || '';
  const dateTime = props.date || suggestedDate || new Date().toISOString();
  const location = props.location || 'Location not specified';

  const { date, time, month, day } = formatEventDate(dateTime);

  // Only fetch the data when the link actually changes
  useEffect(() => {
    if (link && link !== loadedLink) {
      console.log('Fetching data for link:', link);
      setIsLoading(true);

      extractOpenGraphData(link)
        .then((data) => {
          // Handle image
          if (data.imageUrl) {
            setBgImage(data.imageUrl);
          }

          // Handle title
          if (data.title) {
            setSuggestedTitle(data.title);
          }

          // Handle date if available
          if (data.date) {
            try {
              const parsedDate = new Date(data.date);
              if (!isNaN(parsedDate.getTime())) {
                setSuggestedDate(data.date);
              }
            } catch (error) {
              console.error('Error parsing date from OpenGraph:', error);
            }
          }

          // Mark this link as processed
          setLoadedLink(link);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error loading OpenGraph data:', error);
          setIsLoading(false);
        });
    }
  }, [link, loadedLink, props]);

  const styles = getThemeStyles(theme);

  return (
    <InnerOwnTile
      className={`size-full overflow-hidden relative flex flex-col ${styles.container}`}
    >
      {/* Background image or gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : randomBackground,
          filter: 'blur(1px)',
          opacity: 0.6
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 flex flex-col items-center">
            <SpinnerGap
              size={32}
              className="animate-spin text-white mb-2"
              weight="bold"
            />
            <div className="text-white text-sm">Loading event data...</div>
          </div>
        </div>
      )}

      {/* Date box in top left */}
      <div className="h-full flex flex-col gap-2 justify-between">
        <div className="flex flex-row gap-4">
          <div
            className={`relative w-20 h-20 !aspect-square shrink-0 z-10 rounded-lg overflow-hidden ${styles.dateBox} shadow-lg flex flex-col items-center justify-center text-center`}
          >
            <div className="text-sm font-medium uppercase">{month}</div>
            <div className="text-2xl font-bold">{day}</div>
          </div>

          {/* Title */}
          <div className={`relative text-2xl font-bold ${styles.title}`}>
            {title}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Date and time */}
          <div
            className={`relative flex items-center ${styles.details}`}
            role="text"
            aria-label={`Date and time: ${date} at ${time}`}
          >
            <Calendar weight="duotone" className="mr-2" aria-hidden="true" />
            <span>
              {date} • {time}
            </span>
          </div>

          {/* Location */}
          <div
            className={`relative flex items-center ${styles.details}`}
            role="text"
            aria-label={`Location of the event: ${location}`}
          >
            <MapPin weight="duotone" className="mr-2" aria-hidden="true" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Tickets button */}
      <div className="absolute bottom-0 right-0 p-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center rounded-full px-5 py-2 mt-2 ${styles.button} transition-colors duration-200`}
          aria-label="Get tickets for this event"
        >
          <Ticket
            weight="duotone"
            className="mr-2"
            aria-hidden="true"
            aria-label="Link to tickets"
          />
          Tickets
        </a>
      </div>
    </InnerOwnTile>
  );
};

export const tile: RawTileInfo<'event', Props> = {
  name: 'event',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'own.page',
    url: 'https://own.page'
  },
  accessibility: {
    rating: 'AA',
    standard: 'WCAG 2.1'
  },
  cookieInformation: [
    {
      type: 'functional',
      description:
        'Third-party cookies may be set when loading event details from external URLs'
    }
  ],
  origin: '',
  minDimensions: {
    w: 3,
    h: 2
  },
  maxDimensions: {
    w: 6,
    h: 4
  },
  props: {
    link: { slowLoad: false },
    title: { slowLoad: false },
    date: { slowLoad: false, type: 'string' },
    location: { slowLoad: false },
    theme: { slowLoad: false, defaultValue: 'light' }
  },
  Component: memo(Event)
};
