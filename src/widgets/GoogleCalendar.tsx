import React from 'react';
import { RawTileInfo } from 'types';
import IFrame from 'utils/IFrame';

type Props = {
  /** Link to calendar */
  link?: string;
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
