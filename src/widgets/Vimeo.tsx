import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to Vimeo video */
  link?: string;
  /** Color theme */
  theme?: 'light' | 'dark';
};

const VIMEO_DOMAINS = ['vimeo.com', 'player.vimeo.com'];

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink);

    if (!VIMEO_DOMAINS.some((domain) => url.hostname.includes(domain))) {
      console.error('Not a valid Vimeo link:', rawLink);
      return '';
    }

    // Extract video ID from URL
    const pathParts = url.pathname.split('/');
    const videoId = pathParts[pathParts.length - 1];

    if (!videoId || !/^\d+$/.test(videoId)) {
      console.error('No valid video ID found in the link:', rawLink);
      return '';
    }

    return videoId;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// Default video to show if none is provided
const FALLBACK_LINK = 'https://vimeo.com/824804225';

export const Vimeo = (props: Props) => {
  const videoId = parseLink(props.link || FALLBACK_LINK);
  const theme = props.theme || 'light';
  const colorParam = theme === 'dark' ? '?background=1' : '?background=0';

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={`https://player.vimeo.com/video/${videoId}${colorParam}`}
      width="100%"
      height="100%"
      allowFullScreen
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'vimeo', Props> = {
  name: 'vimeo',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'own.page',
    url: 'https://own.page'
  },
  accessibility: {
    rating: 'AA',
    standard: 'WCAG 2.1'
  },
  cookieInformaton: [
    {
      type: 'preferences',
      description:
        'Stores video playback preferences like volume, quality settings, and subtitle options.'
    },
    {
      type: 'analytics',
      description:
        'Collects data on viewing habits and player interactions to improve service quality.'
    },
    {
      type: 'necessary',
      description:
        'Essential for video playback functionality, session management, and player performance.'
    }
  ],
  origin: 'https://vimeo.com/',
  minDimensions: {
    w: 3,
    h: 2
  },
  maxDimensions: () => {
    return {
      w: Infinity,
      h: Infinity
    };
  },
  props: {
    link: { slowLoad: true },
    theme: { slowLoad: false }
  },
  Component: memo(Vimeo)
};
