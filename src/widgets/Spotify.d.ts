import { RawTileInfo } from 'types';
type Props = {
    /** Link to playlist, artist, ... */
    link?: string;
    /** Theme */
    theme?: 'color' | 'dark';
};
export declare const Spotify: (props: Props) => import("react/jsx-runtime").JSX.Element;
export declare const tile: RawTileInfo<'spotify', Props>;
export {};
