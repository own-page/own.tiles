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

  return (
    <IFrame
      style={clipPathStyle}
      src={`https://open.spotify.com/embed${link}?utm_source=generator${themeString}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      // sandbox="allow-scripts allow-forms allow-same-origin"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'spotify', Props> = {
  name: 'spotify',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://spotify.com/',
  minDimensions: {
    w: 1,
    h: 1
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
