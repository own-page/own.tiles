import React from 'react';
import { RawTileInfo } from 'types';

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
  } catch (error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// put other easter-eggs here ;)
const FALLBACK_LINK = 'https://www.youtube.com/watch?v=5jceNNZD4oY';

export const YouTube = (props: Props) => {
  //   const useColor = props.theme === undefined || props.theme === 'color';
  //   const themeString = useColor ? '' : '&theme=0';
  const videoId = parseLink(props.link || FALLBACK_LINK);

  return (
    <iframe
      style={{ clipPath: 'inset(0 round 2.25rem)' }}
      src={`https://www.youtube.com/embed/${videoId}`}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen
      // sandbox="allow-scripts allow-forms allow-same-origin"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  );
};

export const tile: RawTileInfo<'youtube', Props> = {
  name: 'youtube',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://www.youtube.com/',
  minDimensions: {
    w: 3,
    h: 4
  },
  props: {
    link: { slowLoad: true }
    // theme: { slowLoad: true }
  },
  Component: React.memo(YouTube)
};
