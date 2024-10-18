import { GridArea, RawTileInfo } from 'types';
type Props = {
    /** GitHub username */
    username: string;
    /** Show username */
    showUsername: boolean;
    grid?: GridArea;
};
export declare const GitHub: (props: Props) => import("react/jsx-runtime").JSX.Element;
export declare const tile: RawTileInfo<'github', Props>;
export {};
