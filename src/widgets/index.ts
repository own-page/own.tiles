import './widgets.css';
import { tile as GitHub } from './GitHub';
import { tile as Spotify } from './Spotify';
import { tile as YouTube } from './YouTube';
import { tile as GoogleCalendar } from './GoogleCalendar';
import { tile as Eventbrite } from './Eventbrite';
import { TileInfo } from 'types';

const rawWidgets = {
  GitHub,
  Spotify,
  YouTube,
  GoogleCalendar,
  Eventbrite
} as const;

export const widgets = rawWidgets as unknown as {
  [key in keyof typeof rawWidgets]: TileInfo<
    Lowercase<key>,
    NonNullable<(typeof rawWidgets)[key]['props']>
  >;
};

export default widgets;
