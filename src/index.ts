export * from 'InnerOwnTile';
export * from 'types';
export * from 'utils/props';

import { RawTileInfo } from 'types';
import * as widgets from 'widgets';
export * from 'widgets';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tiles: { [key: string]: RawTileInfo<Lowercase<string>, any> } = widgets;

export { tiles };
