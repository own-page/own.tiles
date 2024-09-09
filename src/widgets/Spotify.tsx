// import { InnerOwnTile } from '../InnerOwnTile';
import React from 'react';
import { TileInfo } from '../OwnTiles';
// import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';

type Props = {
  //   username: string;
  link?: string;
  useColor?: boolean | string;
  grid?: any;
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
  } catch (error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// put other easter-eggs here ;)
const FALLBACK_LINK =
  'https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u?si=laPgYvLDR8Gh0fPa3M2mFw';

const Spotify: React.FC<Props> = (props) => {
  const useColor =
    typeof props.useColor === 'string'
      ? props.useColor.toLowerCase() === 'true'
      : (props.useColor ?? true);
  const themeString = useColor ? '' : '&theme=0';
  const link = parseLink(props.link || FALLBACK_LINK);

  const clipPathStyle = link.startsWith('/track')
    ? { clipPath: 'inset(0 0 8px 0 round 2.25rem)' } // this is a hack because spotify embeds of tracks have white background
    : { clipPath: 'inset(0 round 2.25rem)' };

  return (
    <iframe
      style={clipPathStyle}
      src={`https://open.spotify.com/embed${link}?utm_source=generator${themeString}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

const tile: TileInfo<'spotify', Props> = {
  name: 'spotify',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://spotify.com/',
  minDimensions: {
    w: 3,
    h: 4
  },
  props: {
    useColor: 'Color?',
    link: 'Spotify link'
  },
  Component: React.memo(Spotify)
};

export default tile;
