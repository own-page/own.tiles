export type AccessibilityStandard = {
  rating: 'AAA' | 'AA' | 'A';
  standard: 'WCAG 2.0' | 'WCAG 2.1' | 'WCAG 2.2'; // soon WCAG 3.0
};

export type CookieInformation = {
  type: 'preferences' | 'necessary' | 'analytics';
  description: string;
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

type PropsInfo<P extends object> = {
  [k in keyof P]: string;
};

export type TileInfo<N extends Lowercase<string>, P extends object> = {
  name: N;
  origin: string;
  accessibility?: AccessibilityStandard;
  cookieInformaton?: CookieInformation[];
  license: LicenseDescription;
  props: PropsInfo<P>;
  minDimensions?: { w: number; h: number };
  Component: React.FC<P>;
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
