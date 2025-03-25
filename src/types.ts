import { type PropsInfo } from 'utils/props';

export type AccessibilityStandard = {
  rating: 'AAA' | 'AA' | 'A';
  standard: 'WCAG 2.0' | 'WCAG 2.1' | 'WCAG 2.2'; // soon WCAG 3.0
};

export type CookieInformation = {
  type: 'preferences' | 'necessary' | 'analytics';
  description: string;
};

export type Author = {
  name: string;
  url: string;
};

export type GridArea = {
  /** the horizontal position of the element (distance to the left side of the grid) */
  x: number;
  /** the vertical position of the element (distance to the top side of the grid) */
  y: number;
  /** the width of the element */
  w: number;
  /** the height of the element */
  h: number;

  /**
   * the z-index of the element, used for layering, currently unused, because it is fixed
   * @see mapZIndex
   */
  z?: number;
};

export type LicenseDescription = {
  type: string;
  fullText: string;
};

// type JSONSchema = any;

// export type TileInfo = {
//   name: string;
//   origin: string;
//   accessibility?: AccessibilityStandard;
//   cookieInformaton?: CookieInformation[];
//   license: LicenseDescription;
//   defaultProps: TileProps;
// };

export type TileDimensions = { w: number; h: number };

export type RawTileInfo<N extends Lowercase<string>, P extends object> = Omit<
  TileInfo<N, P>,
  'props'
> & {
  props?: {
    [K in keyof PropsInfo<P>]?: Partial<PropsInfo<P>[K]>;
  };
};

export type DimensionFunction<P> =
  | ((props: P) => TileDimensions)
  | TileDimensions;

export type TileInfo<
  N extends Lowercase<string> = Lowercase<string>,
  P extends object = object
> = {
  name: N;
  origin: string;
  author?: Author;
  accessibility?: AccessibilityStandard;
  cookieInformation?: CookieInformation[];
  license: LicenseDescription;
  props: PropsInfo<P>;
  minDimensions?: DimensionFunction<P>;
  maxDimensions?: DimensionFunction<P>;
  Component: React.ComponentType<P>;
};

// type CommonTileProps = {
//   style: React.CSSProperties;
// };

export type TilePosition = {
  x: number;
  y: number;
  width: number;
  height: number;
  z?: number;
};

// export type TileProps = {
//   info: TileInfo;
//   position: TilePosition;
//   style: React.CSSProperties;
//   '...customFields': unknown;
// };

// export type Tile = {
//   props: TileProps;
// };
