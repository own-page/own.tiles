import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to track, playlist, ... */
  link?: string;
  /** Color theme */
  theme?: 'light' | 'dark';
  /** Auto play */
  autoPlay?: boolean;
};

const SOUNDCLOUD_DOMAIN = 'soundcloud.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink, `https://${SOUNDCLOUD_DOMAIN}`);

    if (!url.hostname.includes(SOUNDCLOUD_DOMAIN)) {
      console.error('Not a valid Soundcloud link:', rawLink);
      return '';
    }

    // Extract the path for embedding
    return url.pathname;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

const FALLBACK_LINK =
  'https://soundcloud.com/carl-cox/sets/space-ibiza-25-dj-mix';

export const Soundcloud = (props: Props) => {
  const contentPath = parseLink(props.link || FALLBACK_LINK);
  const theme = props.theme || 'light';
  const autoPlay = props.autoPlay ?? false;

  const colorParams = theme === 'dark' ? 'color=%232d252d' : 'color=%23ff5500';
  const autoPlayParams = autoPlay ? 'auto_play=true' : 'auto_play=false';

  // Construct the parameters
  // const params = new URLSearchParams({
  //   color: theme === 'dark' ? '%232d252d' : '%23ff5500',
  //   auto_play: autoPlay ? 'true' : 'false'
  // });

  console.log(colorParams, autoPlayParams);

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={`https://w.soundcloud.com/player/?url=https%3A//soundcloud.com${contentPath}&${colorParams}&${autoPlayParams}`}
      width="100%"
      height="100%"
      frameBorder={0}
      allow="autoplay"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'soundcloud', Props> = {
  name: 'soundcloud',
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
        'Stores audio preferences like volume settings, playback mode, and quality preferences.'
    },
    {
      type: 'analytics',
      description:
        'Tracks music listening patterns and player interactions to improve recommendations.'
    },
    {
      type: 'necessary',
      description:
        'Essential for audio playback functionality, streaming quality, and player performance.'
    }
  ],
  origin: 'https://soundcloud.com/',
  minDimensions: {
    w: 3,
    h: 2
  },
  maxDimensions: (props) => {
    const contentPath = parseLink(props.link || FALLBACK_LINK);
    const isTrack = !contentPath.includes('/sets/'); // Sets are playlists in SoundCloud
    return {
      w: Infinity,
      h: isTrack ? 4 : Infinity
    };
  },
  props: {
    link: { slowLoad: true },
    theme: { slowLoad: false },
    autoPlay: { slowLoad: false }
  },
  Component: memo(Soundcloud)
};
