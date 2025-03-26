import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Calendly username or link */
  link?: string;
  /** Hide event details */
  hideEventDetails?: boolean;
};

const CALENDLY_DOMAIN = 'calendly.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    // Check if it's a full Calendly URL
    if (rawLink.includes(CALENDLY_DOMAIN)) {
      const url = new URL(rawLink);

      if (!url.hostname.includes(CALENDLY_DOMAIN)) {
        console.error('Not a valid Calendly link:', rawLink);
        return '';
      }

      // Remove the domain part and return the path
      return url.pathname.startsWith('/')
        ? url.pathname.substring(1)
        : url.pathname;
    }

    // Assume it's just a username or direct path
    return rawLink.startsWith('/') ? rawLink.substring(1) : rawLink;
  } catch (_error) {
    // If parsing as URL fails, assume it's a username
    return rawLink;
  }
};

const FALLBACK_LINK = 'own-page/30min';

export const Calendly = (props: Props) => {
  const path = parseLink(props.link || FALLBACK_LINK);
  const hideEventDetails = props.hideEventDetails || false;
  const hideEventDetailsParam = hideEventDetails
    ? 'hide_event_type_details=1'
    : 'hide_event_type_details=0';

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={`https://calendly.com/${path}?hide_gdpr_banner=1&${hideEventDetailsParam}`}
      width="100%"
      height="100%"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'calendly', Props> = {
  name: 'calendly',
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
      type: 'necessary',
      description: 'Essential cookies required for core website functionality.'
    },
    {
      type: 'performance',
      description: 'Anonymous analytics cookies to measure site performance.'
    },
    {
      type: 'functional',
      description: 'Enables enhanced website features and personalization.'
    },
    {
      type: 'targeting',
      description: 'Used by advertising partners for targeted ads across sites.'
    }
  ],
  origin: 'https://calendly.com/',
  minDimensions: {
    w: 2,
    h: 4
  },
  maxDimensions: () => {
    return {
      w: Infinity,
      h: Infinity
    };
  },
  props: {
    link: { slowLoad: true },
    hideEventDetails: { slowLoad: false }
  },
  Component: memo(Calendly)
};
