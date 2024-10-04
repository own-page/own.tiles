import React from 'react';
import { RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to calendar */
  email?: string;
  /** Title of the calendar */
  title?: string;
  /** Theme */
  theme?: 'white' | 'dark';
  /** View of the calendar */
  view?: 'week' | 'month' | 'schedule';
};

const GOOGLE_CALENDAR_DOMAIN = 'calendar.google.com';

const parseLink = (rawLink: string) => {
  if (typeof rawLink !== 'string') {
    console.error('Invalid link provided:', rawLink);
    return '';
  }

  try {
    const url = new URL(rawLink, `https://${GOOGLE_CALENDAR_DOMAIN}`);

    if (url.hostname !== GOOGLE_CALENDAR_DOMAIN) {
      console.error('Not a valid Google Calendar link:', rawLink);
      return '';
    }

    return url.pathname;
  } catch (error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};

// link to the public austrian holidays calendar
const FALLBACK_LINK =
  'https://calendar.google.com/calendar/embed?src=en-gb.austrian%23holiday%40group.v.calendar.google.com&ctz=Europe%2FVienna';

export const GoogleCalendar = (props: Props) => {
  const useColor = props.theme === undefined || props.theme === 'white';
  const email = parseLink(props.email || FALLBACK_LINK);

  const themeStyle = useColor
    ? { filter: 'none' }
    : { filter: 'invert(90%) hue-rotate(180deg)' }; // hacky way to make the calendar dark mode

  return (
    <IFrame
      style={themeStyle}
      src={`https://calendar.google.com/calendar/embed?src=${email}`}
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

export const tile: RawTileInfo<'google-calendar', Props> = {
  name: 'google-calendar',
  license: { type: 'MIT', fullText: 'MIT' },
  origin: 'https://calendar.google.com/',
  minDimensions: {
    w: 4,
    h: 3
  },
  maxDimensions: (props) => {
    const link = parseLink(props.email || FALLBACK_LINK);
    return {
      w: Infinity,
      h: Infinity
    };
  },
  props: {
    email: { slowLoad: true },
    title: { slowLoad: true },
    theme: { slowLoad: true },
    view: { slowLoad: true }
  },
  Component: React.memo(GoogleCalendar)
};
