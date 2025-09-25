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
  /** Pre-resolved official SoundCloud embed url (set by editor on input) */
  embedSrc?: string;
};

const SOUNDCLOUD_DOMAIN = 'soundcloud.com';

const FALLBACK_LINK =
  'https://soundcloud.com/carl-cox/sets/permission-to-smoke';

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

const resolveInputLink = async (value: string) => {
  try {
    const rawLink = (value as string) || FALLBACK_LINK;
    const resolvedLink = await fetch(
      `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(rawLink)}`
    );
    if (!resolvedLink.ok)
      throw new Error(`oEmbed failed: ${resolvedLink.status}`);

    const data = await resolvedLink.json();
    const iFrameSrc =
      typeof data.html === 'string' ? data.html.match(/src="([^"]+)"/) : null;

    if (!iFrameSrc) throw new Error('No iframe src in oEmbed response');

    const url = new URL(iFrameSrc[1]);
    return { embedSrc: url.toString() };
  } catch (error) {
    return {};
  }
};

const constructSrc = (embedSrc: string, autoPlay: boolean, theme: string) => {
  try {
    const url = new URL(embedSrc);
    const searchParams = url.searchParams;

    searchParams.set('auto_play', autoPlay ? 'true' : 'false');
    searchParams.set('color', theme === 'dark' ? '%232d252d' : '%23ff5500');

    url.search = searchParams.toString();
    return url.toString();
  } catch (error) {
    return embedSrc;
  }
};

export const SoundCloud = (props: Props) => {
  const theme = props.theme || 'light';
  const autoPlay = props.autoPlay ?? false;

  const src = props.embedSrc
    ? constructSrc(props.embedSrc, autoPlay, theme)
    : `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2052945276&color=%23ff5500&auto_play=false`;

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={src}
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
  cookieInformation: [
    {
      type: 'necessary',
      description:
        'Essential for authentication, security, fraud prevention and core platform functionality.'
    },
    {
      type: 'functional',
      description:
        'Enables enhanced features and personalization including user preferences and content settings.'
    },
    {
      type: 'analytics',
      description:
        'Tracks usage patterns and performance metrics to improve platform experience.'
    },
    {
      type: 'targeting',
      description:
        'Used for personalized advertising and content recommendations across platforms.'
    }
  ],
  origin: 'https://soundcloud.com/',
  minDimensions: {
    w: 4,
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
    link: {
      slowLoad: true,
      onInput: async ({ value }) => {
        return await resolveInputLink(value as string);
      }
    },
    theme: { slowLoad: false },
    autoPlay: { slowLoad: false },
    embedSrc: { render: false }
  },
  Component: memo(SoundCloud)
};
