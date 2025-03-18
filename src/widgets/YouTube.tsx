import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to playlist, artist, ... */
  link?: string;
  //   /** Theme */
  //   theme?: 'color' | 'dark';
};
const YOUTUBE_DOMAINS = ['www.youtube.com', 'youtu.be'];

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink);

    if (!YOUTUBE_DOMAINS.includes(url.hostname)) {
      console.error('Not a valid YouTube link:', rawLink);
      return '';
    }

    let videoId = '';
    if (url.hostname === 'youtu.be') {
      videoId = url.pathname.slice(1);
    } else {
      videoId = url.searchParams.get('v') || '';
    }

    if (!videoId) {
      console.error('No video ID found in the link:', rawLink);
      return '';
    }

    return videoId;
  } catch (_error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// put other easter-eggs here ;)
const FALLBACK_LINK = 'https://www.youtube.com/watch?v=3uFxiOo60MI';

export const YouTube = (props: Props) => {
  //   const useColor = props.theme === undefined || props.theme === 'color';
  //   const themeString = useColor ? '' : '&theme=0';
  const videoId = parseLink(props.link || FALLBACK_LINK);

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round 2.25rem)', border: 0 }}
      src={`https://www.youtube.com/embed/${videoId}`}
      width="100%"
      height="100%"
      allowFullScreen
      // sandbox="allow-scripts allow-forms allow-same-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      loading="lazy"
    />
  );
};

export const tile: RawTileInfo<'youtube', Props> = {
  name: 'youtube',
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
        'Stores video playback settings such as volume, subtitles, and autoplay preferences.'
    },
    {
      type: 'analytics',
      description:
        'Tracks user engagement and video performance for YouTube analytics.'
    },
    {
      type: 'necessary',
      description:
        'Used for security, session management, and video streaming stability.'
    }
  ],
  origin: 'https://www.youtube.com/',
  minDimensions: {
    w: 4,
    h: 3
  },
  props: {
    link: { slowLoad: true }
    // theme: { slowLoad: true }
  },
  Component: memo(YouTube)
};
