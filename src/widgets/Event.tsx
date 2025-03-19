import { memo, useEffect, useState } from 'react';
import { type RawTileInfo } from 'types';
import { InnerOwnTile } from 'InnerOwnTile';
import { Calendar, MapPin, Ticket } from '@phosphor-icons/react/dist/ssr';

type Props = {
  /** Link to event page */
  link?: string;
  /** Title of the event */
  title?: string;
  /** Date and time of the event (ISO string) */
  dateTime?: string;
  /** Location of the event */
  location?: string;
  /** Color scheme */
  color?: 'light' | 'dark';
};

// Default background if no OpenGraph image is found
const DEFAULT_BACKGROUNDS = [
  'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
];

// OpenGraph image extractor
const extractOpenGraphImage = async (): Promise<string | null> => {
  try {
    // This would need a proxy service in production to avoid CORS
    // For now, we'll use a mock implementation
    return null;
  } catch (error) {
    console.error('Failed to extract OpenGraph image:', error);
    return null;
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
        details: 'text-gray-700',
        button: 'bg-black/90 text-white hover:bg-black/80'
      };
  }
};

// Get a random background if no OpenGraph image
const randomBackground =
  DEFAULT_BACKGROUNDS[Math.floor(Math.random() * DEFAULT_BACKGROUNDS.length)];

export const Event = (props: Props) => {
  const [bgImage, setBgImage] = useState<string | null>(
    'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F985756363%2F2292945685473%2F1%2Foriginal.20250317-173253?crop=focalpoint&fit=crop&w=600&auto=format%2Ccompress&q=75&sharp=10&fp-x=0.5&fp-y=0.116279069767&s=33a364caf9cf812479c872dd71ba5c1a'
  );

  const color = props.color || 'light';
  const title = props.title || 'Untitled Event';
  const link = props.link || '';
  const dateTime = props.dateTime || new Date().toISOString();
  const location = props.location || 'Location not specified';

  const { date, time, month, day } = formatEventDate(dateTime);

  useEffect(() => {
    if (link) {
      extractOpenGraphImage().then((imageUrl) => {
        setBgImage(imageUrl);
      });
    }
  }, [link]);

  const styles = getThemeStyles(color);

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

      {/* Date box in top left */}
      <div className="h-full flex flex-col gap-2 justify-between">
        <div className="flex flex-row gap-4">
          <div
            className={`relative z-10 rounded-lg overflow-hidden ${styles.dateBox} shadow-lg flex flex-col items-center justify-center text-center`}
            style={{ width: '4rem', height: '4.5rem' }}
          >
            <div className="text-sm font-medium uppercase">{month}</div>
            <div className="text-2xl font-bold">{day}</div>
          </div>

          {/* Title */}
          <div className={`relative text-2xl font-bold ${styles.title} mb-2`}>
            {title}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Date and time */}
          <div className={`relative flex items-center ${styles.details}`}>
            <Calendar weight="duotone" className="mr-2" />
            <div>
              {date} • {time}
            </div>
          </div>

          {/* Location */}
          <div className={`relative flex items-center ${styles.details}`}>
            <MapPin weight="duotone" className="mr-2" />
            <div>{location}</div>
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
        >
          <Ticket weight="duotone" className="mr-2" />
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
  cookieInformaton: [],
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
    dateTime: { slowLoad: false },
    location: { slowLoad: false },
    color: { slowLoad: false, defaultValue: 'light' }
  },
  Component: memo(Event)
};
