import React from 'react';
import { RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Email address to calendar */
  email?: string;
  /** Title of the calendar */
  title?: string;
  /** Theme */
  theme?: 'white' | 'dark';
  /** View */
  view?: 'week' | 'month' | 'schedule';
};

const GOOGLE_CALENDAR_DOMAIN = 'calendar.google.com';

const parseEmail = (rawEmail: string) => {
  if (typeof rawEmail !== 'string') {
    console.error('Invalid email provided:', rawEmail);
    return '';
  }

  try {
    // Simple regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      console.error('Invalid email format:', rawEmail);
      return '';
    }

    // Assuming the email is valid, return it directly
    return rawEmail;
  } catch (error) {
    console.error('Unexpected error during email validation:', error);
    return '';
  }
};

// email address to the public austrian holidays calendar
const FALLBACK_EMAIL = 'en-gb.austrian#holiday@group.v.calendar.google.com';

export const GoogleCalendar = (props: Props) => {
  const useColor = props.theme === undefined || props.theme === 'white';
  const email = parseEmail(props.email || FALLBACK_EMAIL);
  const view = props.view || 'week';
  const title = props.title || 'My Calendar';

  const themeStyle = useColor
    ? { filter: 'none' }
    : { filter: 'invert(90%) hue-rotate(180deg)' }; // hacky way to make the calendar dark mode

  return (
    <IFrame
      style={themeStyle}
      src={`https://${GOOGLE_CALENDAR_DOMAIN}/calendar/embed?src=${email}&mode=${view}&title=${title}&showPrint=0&showTz=0&showDate=0&showTabs=0&showCalendars=0`}
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
  maxDimensions: () => {
    //const email = parseLink(props.email || FALLBACK_LINK);
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
