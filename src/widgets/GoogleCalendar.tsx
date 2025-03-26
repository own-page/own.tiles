import { memo } from 'react';
import { type RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';
import { InnerOwnTile } from 'InnerOwnTile';

type Props = {
  /** Calendar ID (email) */
  email?: string;
  /** Title of the calendar */
  title?: string;
  /** Theme */
  theme?: 'white' | 'dark';
  /** View */
  view?: 'week' | 'month' | 'agenda';
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
const FALLBACK_EMAIL = 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com';

export const GoogleCalendar = (props: Props) => {
  const useColor = props.theme === undefined || props.theme === 'white';
  const email = parseEmail(props.email || FALLBACK_EMAIL);
  const view = props.view || 'week';
  const title = props.title || 'My Calendar';

  const themeStyle = useColor
    ? { filter: 'none' }
    : { filter: 'invert(90%) hue-rotate(180deg)' }; // hacky way to make the calendar dark mode

  return (
    <InnerOwnTile
      className="size-full px-4 pt-10 overflow-clip relative bg-white"
      style={themeStyle}
    >
      <div
        className={`text-[#0a0909c4]
        absolute left-1/2 -translate-x-1/2 top-0 z-10
        flex-center px-5 h-10 content-center
        font-['Plus_Jakarta_Sans'] font-medium text-base`}
      >
        {title}
      </div>
      <IFrame
        src={`https://${GOOGLE_CALENDAR_DOMAIN}/calendar/embed?src=${email}&bgColor=ffffff&mode=${view}&showTitle=0&showPrint=0&showTz=0&showDate=0&showTabs=0&showCalendars=0`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        className="rounded-3xl"
        // sandbox="allow-scripts allow-forms allow-same-origin"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </InnerOwnTile>
  );
};

export const tile: RawTileInfo<'googlecalendar', Props> = {
  name: 'googlecalendar',
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
        'Essential for authentication, session management, and maintaining calendar functionality.'
    },
    {
      type: 'preferences',
      description:
        'Stores calendar view preferences such as timezone, display settings, and language preferences.'
    },
    {
      type: 'analytics',
      description:
        'Tracks user interaction and calendar usage patterns to improve service quality.'
    }
  ],
  origin: 'https://calendar.google.com/',
  minDimensions: {
    w: 4,
    h: 4
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
    title: { slowLoad: false },
    theme: { slowLoad: false },
    view: { slowLoad: true }
  },
  Component: memo(GoogleCalendar)
};
