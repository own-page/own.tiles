import { RawTileInfo } from 'types';
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
export declare const GoogleCalendar: (props: Props) => import("react/jsx-runtime").JSX.Element;
export declare const tile: RawTileInfo<'google-calendar', Props>;
export {};
