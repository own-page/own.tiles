import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to playlist, artist, ... */
  link?: string;
  //   /** Theme */
  //   theme?: 'color' | 'dark';
};
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'youtu.be',
  'youtube-nocookie.com'
]);

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink);
    const host = url.hostname.replace(/^(www\.|m\.|music\.)/, '').toLowerCase();

    if (!YOUTUBE_HOSTS.has(host)) {
      console.error('Not a valid YouTube link:', rawLink);
      return '';
    }

    const segments = url.pathname.split('/').filter(Boolean);
    let videoId = '';

    if (host === 'youtu.be') {
      videoId = segments[0] || '';
    } else if (segments[0] === 'shorts' || segments[0] === 'embed' || segments[0] === 'v' || segments[0] === 'live') {
      videoId = segments[1] || '';
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

// Parse YouTube `t` param into seconds. Accepts `90`, `90s`, `1m30s`, `1h2m3s`.
const parseStartSeconds = (rawLink: string): number | null => {
  const match = rawLink.match(/[?&]t=([^&#]+)/);
  if (!match) return null;
  const raw = decodeURIComponent(match[1]);
  if (/^\d+$/.test(raw)) return parseInt(raw, 10);
  const re = /(\d+)\s*([hms])/gi;
  let total = 0;
  let found = false;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    found = true;
    const n = parseInt(m[1], 10);
    const unit = m[2].toLowerCase();
    total += unit === 'h' ? n * 3600 : unit === 'm' ? n * 60 : n;
  }
  return found ? total : null;
};

// put other easter-eggs here ;)
const FALLBACK_LINK = 'https://www.youtube.com/watch?v=3uFxiOo60MI';

export const YouTube = (props: Props) => {
  //   const useColor = props.theme === undefined || props.theme === 'color';
  //   const themeString = useColor ? '' : '&theme=0';
  const videoId = parseLink(props.link || FALLBACK_LINK);
  const startSeconds = parseStartSeconds(props.link || '');
  const startParam = startSeconds !== null ? `?start=${startSeconds}` : '';

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={`https://www.youtube.com/embed/${videoId}${startParam}`}
      width="100%"
      height="100%"
      allowFullScreen
      // sandbox="allow-scripts allow-forms allow-same-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      loading="lazy"
      title="YouTube video player"
      aria-label="YouTube video content"
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
  cookieInformation: [
    {
      type: 'necessary',
      description:
        'Used for security, session management, and video streaming stability.'
    },
    {
      type: 'preferences',
      description:
        'Stores video playback settings such as volume, subtitles, and autoplay preferences.'
    },
    {
      type: 'analytics',
      description:
        'Tracks user engagement and video performance for YouTube analytics.'
    }
  ],
  origin: 'https://www.youtube.com/',
  minDimensions: {
    w: 2,
    h: 2
  },
  props: {
    link: { slowLoad: true }
    // theme: { slowLoad: true }
  },
  Component: memo(YouTube)
};
