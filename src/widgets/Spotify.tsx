import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to playlist, artist, ... */
  link?: string;
  /** Theme */
  theme?: 'color' | 'dark';
};

const SPOTIFY_DOMAIN = 'open.spotify.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink, `https://${SPOTIFY_DOMAIN}`);

    if (url.hostname !== SPOTIFY_DOMAIN) {
      console.error('Not a valid Spotify link:', rawLink);
      return '';
    }

    return url.pathname;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// put other easter-eggs here ;)
const FALLBACK_LINK =
  'https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u?si=laPgYvLDR8Gh0fPa3M2mFw';

export const Spotify = (props: Props) => {
  const useColor = props.theme === undefined || props.theme === 'color';
  const themeString = useColor ? '' : '&theme=0';
  const link = parseLink(props.link || FALLBACK_LINK);

  const clipPathStyle = link.startsWith('/track')
    ? { clipPath: 'inset(0 0 8px 0 round var(--tile-radius))' } // this is a hack because spotify embeds of tracks have white background
    : { clipPath: 'inset(0 round var(--tile-radius))' };

  const linkType = link.split('/')[1] || 'content'; // album, track, playlist, etc.
  const title = `Spotify ${linkType}`;

  return (
    <IFrame
      style={{ ...clipPathStyle, border: 0 }}
      src={`https://open.spotify.com/embed${link}?utm_source=generator${themeString}`}
      width="100%"
      height="100%"
      allowFullScreen
      // sandbox="allow-scripts allow-forms allow-same-origin"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      title={title}
      aria-label={`Spotify ${linkType} player`}
    />
  );
};

export const tile: RawTileInfo<'spotify', Props> = {
  name: 'spotify',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'own.page',
    url: 'https://own.page'
  },
  accessibility: {
    // not certain about this
    rating: 'A',
    standard: 'WCAG 2.1'
  },
  cookieInformation: [
    {
      type: 'preferences',
      description:
        'Stores user preferences like volume settings, playback options, and saved preferences across sessions.'
    },
    {
      type: 'analytics',
      description:
        'Tracks user interaction with the embedded player, providing data for Spotify to improve its services and user experience.'
    },
    {
      type: 'necessary',
      description:
        'Essential for maintaining session integrity, enabling playback, and ensuring the Spotify player functions correctly on embedded pages.'
    }
  ],
  origin: 'https://spotify.com/',
  minDimensions: {
    w: 3,
    h: 4
  },
  maxDimensions: (props) => {
    const link = parseLink(props.link || FALLBACK_LINK);
    return {
      w: Infinity,
      h: link.startsWith('/track') ? 4 : Infinity
    };
  },
  props: {
    link: { slowLoad: true },
    theme: { slowLoad: true }
  },
  Component: memo(Spotify)
};
