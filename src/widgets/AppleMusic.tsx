import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to album, playlist, artist, ... */
  link?: string;
};

const APPLE_MUSIC_EMBED_HOST = 'embed.music.apple.com';
const APPLE_MUSIC_HOST = 'music.apple.com';

const FALLBACK_LINK =
  'https://embed.music.apple.com/at/album/today-at-apple-berlin-dj-mix/1874091108?l=en-GB';

const toEmbedUrl = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid Apple Music link provided:', rawLink);
    return FALLBACK_LINK;
  }

  try {
    const url = new URL(rawLink, `https://${APPLE_MUSIC_HOST}`);
    const hostname = url.hostname.toLowerCase();

    if (hostname === APPLE_MUSIC_EMBED_HOST) {
      return url.toString();
    }

    if (hostname === APPLE_MUSIC_HOST || hostname === `www.${APPLE_MUSIC_HOST}`) {
      url.hostname = APPLE_MUSIC_EMBED_HOST;
      return url.toString();
    }

    console.error('Not a valid Apple Music link:', rawLink);
    return FALLBACK_LINK;
  } catch (_error) {
    console.error('Invalid Apple Music URL:', rawLink);
    return FALLBACK_LINK;
  }
};

export const AppleMusic = (props: Props) => {
  const src = toEmbedUrl(props.link || FALLBACK_LINK);

  return (
    <IFrame
      style={{ clipPath: 'inset(0 round var(--tile-radius))', border: 0 }}
      src={src}
      width="100%"
      height="100%"
      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      loading="lazy"
      title="Apple Music player"
      aria-label="Apple Music player"
    />
  );
};

export const tile: RawTileInfo<'apple-music', Props> = {
  name: 'apple-music',
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
        'Essential for Apple Music playback functionality, authentication flow, and media streaming.'
    },
    {
      type: 'preferences',
      description:
        'Stores player preferences and localization settings for embedded Apple Music content.'
    },
    {
      type: 'analytics',
      description:
        'May collect usage and interaction signals to improve embed performance and recommendations.'
    }
  ],
  origin: 'https://music.apple.com/',
  minDimensions: {
    w: 4,
    h: 2
  },
  maxDimensions: () => {
    return {
      w: Infinity,
      h: Infinity
    };
  },
  props: {
    link: { slowLoad: true }
  },
  Component: memo(AppleMusic)
};
