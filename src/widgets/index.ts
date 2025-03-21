import './widgets.css';
import { tile as GitHub } from './GitHub';
import { tile as Spotify } from './Spotify';
import { tile as YouTube } from './YouTube';
import { tile as GoogleCalendar } from './GoogleCalendar';
import { tile as Vimeo } from './Vimeo';
import { tile as Calendly } from './Calendly';
import { tile as Deezer } from './Deezer';
import { tile as Clock } from './Clock';
import { tile as Event } from './Event';
import { tile as Soundcloud } from './Soundcloud';
import { type TileInfo } from 'types';

const rawWidgets = {
  GitHub,
  Spotify,
  YouTube,
  GoogleCalendar,
  Vimeo,
  Calendly,
  Deezer,
  Clock,
  Soundcloud,
  Event
} as const;

export const widgets = rawWidgets as unknown as {
  [key in keyof typeof rawWidgets]: TileInfo<
    (typeof rawWidgets)[key]['name'],
    NonNullable<(typeof rawWidgets)[key]['props']>
  >;
};

export default widgets;
