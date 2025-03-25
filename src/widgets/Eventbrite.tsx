import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to Eventbrite event */
  link?: string;
};

const EVENTBRITE_DOMAIN = 'eventbrite.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink, `https://${EVENTBRITE_DOMAIN}`);

    if (!url.hostname.includes(EVENTBRITE_DOMAIN)) {
      console.error('Not a valid Eventbrite link:', rawLink);
      return '';
    }

    return url.pathname;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

const FALLBACK_LINK = 'https://www.eventbrite.com/e/sample-event-1234567890';

export const Eventbrite = (props: Props) => {
  const link = parseLink(props.link || FALLBACK_LINK);

  return (
    <IFrame
      style={{ border: 0 }}
      src={`https://www.eventbrite.com/e${link}`}
      width="100%"
      height="100%"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'eventbrite', Props> = {
  name: 'eventbrite',
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
      type: 'preferences',
      description:
        'Stores event display preferences and user interface settings for a personalized experience.'
    },
    {
      type: 'analytics',
      description:
        'Tracks user interaction with events to improve service quality and event recommendations.'
    },
    {
      type: 'necessary',
      description:
        'Essential for event display functionality, session management, and ensuring the embedded event information loads correctly.'
    }
  ],
  origin: 'https://eventbrite.com/',
  minDimensions: {
    w: 4,
    h: 2
  },
  maxDimensions: () => {
    // const link = parseLink(props.link || FALLBACK_LINK);
    return {
      w: Infinity,
      h: Infinity
    };
  },
  props: {
    link: { slowLoad: true }
  },
  Component: memo(Eventbrite)
};
