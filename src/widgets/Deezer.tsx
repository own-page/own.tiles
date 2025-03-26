import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to track, playlist, ... */
  link?: string;
  /** Color theme */
  theme?: 'light' | 'dark' | 'auto';
  /** Hide tracklist */
  hideTracklist?: boolean;
};

const DEEZER_DOMAIN = 'deezer.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink, `https://${DEEZER_DOMAIN}`);

    if (!url.hostname.includes(DEEZER_DOMAIN)) {
      console.error('Not a valid Deezer link:', rawLink);
      return '';
    }

    // Extract type and ID from URL path
    const pathParts = url.pathname.split('/');
    if (pathParts.length < 3) {
      console.error('Invalid Deezer URL format:', rawLink);
      return '';
    }

    const partLength = pathParts.length;

    const contentType = pathParts[partLength - 2]; // track, album, playlist, etc.
    const contentId = pathParts[partLength - 1];

    return `${contentType}/${contentId}`;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

const FALLBACK_LINK = 'https://www.deezer.com/us/playlist/1479458365';

export const Deezer = (props: Props) => {
  const contentPath = parseLink(props.link || FALLBACK_LINK);
  const theme = props.theme || 'auto';
  const hideTracklist = props.hideTracklist ?? false;
  const hideTracklistParam = hideTracklist
    ? 'tracklist=false'
    : 'tracklist=true';

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={`https://widget.deezer.com/widget/${theme}/${contentPath}?${hideTracklistParam}`}
      width="100%"
      height="100%"
      frameBorder={0}
      allow="accelerometer; encrypted-media; gyroscope; clipboard-write;"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'deezer', Props> = {
  name: 'deezer',
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
      description:
        'Essential for audio playback functionality, streaming quality, and player performance.'
    },
    {
      type: 'preferences',
      description:
        'Stores audio preferences like volume settings, playback mode, and quality preferences.'
    },
    {
      type: 'analytics',
      description:
        'Tracks music listening patterns and player interactions to improve recommendations.'
    }
  ],
  origin: 'https://www.deezer.com/',
  minDimensions: {
    w: 3,
    h: 2
  },
  maxDimensions: (props) => {
    const contentPath = parseLink(props.link || FALLBACK_LINK);
    const isTrack = contentPath.startsWith('track/');
    return {
      w: Infinity,
      h: isTrack ? 4 : Infinity
    };
  },
  props: {
    link: { slowLoad: true },
    theme: { slowLoad: false },
    hideTracklist: { slowLoad: false }
  },
  Component: memo(Deezer)
};
