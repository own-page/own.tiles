import { memo } from 'react';
import { QrCodeIcon } from '@phosphor-icons/react/dist/ssr';
import { QRCodeSVG } from 'qrcode.react';
import { InnerOwnTile } from 'InnerOwnTile';
import { type RawTileInfo } from 'types';

type Props = {
  /** Which kind of URL should the QR code use */
  targetType?: 'internal' | 'external';
  /** External URL to encode */
  link?: string;
  /** Show the resolved URL label */
  showLink?: boolean;
  /** Runtime-only resolved current page URL */
  _currentPageUrl?: string;
  /** Runtime-only resolved current page label */
  _currentPageLabel?: string;
};

const DEFAULT_URL = 'https://own.page';

const normalizeExternalUrl = (value?: string) => {
  const trimmed = value?.trim();

  if (!trimmed) return DEFAULT_URL;

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString();
  } catch (_error) {
    return withProtocol;
  }
};

const toDisplayLabel = (value?: string) =>
  (value || DEFAULT_URL)
    .replace(/^[a-z]+:\/\//i, '')
    .replace(/\/$/, '');

const resolveQrData = (props: Props) => {
  if (props.targetType === 'external') {
    const url = normalizeExternalUrl(props.link);
    return {
      url,
      label: toDisplayLabel(url)
    };
  }

  const url = props._currentPageUrl || DEFAULT_URL;
  return {
    url,
    label: props._currentPageLabel || toDisplayLabel(url)
  };
};

export const QRCode = (props: Props) => {
  const showLink = props.showLink ?? true;
  const { url, label } = resolveQrData(props);

  return (
    <InnerOwnTile className="flex size-full flex-col overflow-hidden bg-white p-4 text-black">
      <div className="absolute left-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-black/90 p-2 text-white">
        <QrCodeIcon size={'100%'} />
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center pt-6">
        <div className="w-full max-w-[12rem] rounded-[calc(var(--tile-radius)*0.55)] bg-white p-3 shadow-[0_18px_60px_rgba(15,23,42,0.12)]">
          <QRCodeSVG
            value={url}
            size={512}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
            includeMargin={true}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {showLink && (
        <div className="pointer-events-none z-10 mt-3 flex justify-center">
          <div
            className="max-w-full rounded-full bg-black px-4 py-2 text-center font-['Plus_Jakarta_Sans'] text-sm font-medium text-white"
            title={label}
          >
            <span className="block max-w-full truncate">{label}</span>
          </div>
        </div>
      )}
    </InnerOwnTile>
  );
};

export const tile: RawTileInfo<'qr-code', Props> = {
  name: 'qr-code',
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
      type: 'no cookies',
      description: 'This QR code widget is rendered locally and does not use cookies.'
    }
  ],
  origin: 'https://own.page/',
  minDimensions: {
    w: 2,
    h: 2
  },
  maxDimensions: {
    w: 4,
    h: 4
  },
  props: {
    targetType: {
      slowLoad: false,
      defaultValue: 'internal'
    },
    link: {
      slowLoad: false
    },
    showLink: {
      slowLoad: false,
      defaultValue: true
    },
    _currentPageUrl: {
      slowLoad: false,
      render: false
    },
    _currentPageLabel: {
      slowLoad: false,
      render: false
    }
  },
  Component: memo(QRCode)
};
