import {
  Check,
  Clipboard,
  SlidersHorizontal,
  Info
} from '@phosphor-icons/react/dist/ssr';
import { widgets as tiles } from '@own.page/own.tiles';
import { useState, forwardRef } from 'react';
import TileConfig from './TileConfig';

type TileDisplayButtonProps = {
  Icon: React.ElementType;
  onClick?: () => void;
  label: string;
};

const TileDisplayButton = forwardRef<HTMLButtonElement, TileDisplayButtonProps>(
  ({ Icon, onClick, label }, ref) => {
    return (
      <button
        ref={ref}
        className="hover:bg-white/20 p-1 rounded-md"
        onClick={onClick}
        aria-label={label}
      >
        <Icon size={20} weight="fill" />
      </button>
    );
  }
);

TileDisplayButton.displayName = 'TileDisplayButton';

type TileName = keyof typeof tiles;
const tileNames = Object.keys(tiles) as TileName[];

type TileDisplayProps = {
  name: TileName;
};
const TileDisplay = (props: TileDisplayProps) => {
  const Tile = tiles[props.name];

  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCookieInfo, setShowCookieInfo] = useState(false);

  const copyToClipboard = () => {
    setIsCopied(true);
    // navigator.clipboard.writeText(Tile.code);
    setTimeout(() => {
      setIsCopied(false);
    }, 300);
  };

  if (!Tile) return null;

  const getHeight = () => {
    const minDimensions = 'minDimensions' in Tile ? Tile.minDimensions : null;
    const height = minDimensions
      ? (typeof minDimensions === 'function'
          ? minDimensions({}).h
          : minDimensions.h) * 96
      : 288;
    return height;
  };

  const height = getHeight();

  return (
    <>
      <div
        className="my-4 px-5 py-5 space-y-5 bg-white/10 rounded-2xl relative text-white
     border border-white/20 data-[modal=true]:z-[1001]"
        role="region"
        aria-label={`${props.name} tile`}
      >
        <h2 className="text-xl font-semibold leading-none">{props.name}</h2>
        <div className="absolute right-5 top-0 space-x-1">
          <TileDisplayButton
            Icon={isCopied ? Check : Clipboard}
            onClick={copyToClipboard}
            label={`Copy ${props.name} tile code`}
          />
          <TileConfig
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            info={Tile}
            height={height}
          >
            <TileDisplayButton Icon={SlidersHorizontal} label={''} />
          </TileConfig>
        </div>
        <div
          className="overflow-hidden"
          style={{ height }}
          role="img"
          aria-label={`Preview of ${props.name} tile`}
        >
          <Tile.Component aria-label={`${props.name} tile content`} />
        </div>

        {/* Author, Accessibility and Cookie Information Footer */}
        <div className="flex flex-col text-white text-xs p-3 rounded-xl bg-black/15 backdrop-blur-sm font-mono ">
          {/* First row: Author and Accessibility */}
          <div className="flex items-center justify-start space-x-6 flex-wrap">
            {Tile.author && (
              <div className="flex items-center">
                <span className="text-white font-medium mr-1">Author:</span>
                <a
                  href={Tile.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white focus:outline-none focus:underline "
                >
                  {Tile.author.name}
                </a>
              </div>
            )}

            {Tile.accessibility && (
              <div className="flex items-center">
                <span className="text-white font-medium mr-1">
                  Accessibility:
                </span>
                <span className="text-white">
                  {Tile.accessibility.standard} {Tile.accessibility.rating}
                </span>
              </div>
            )}

            {Tile.license && (
              <div className="flex items-center">
                <span className="text-white font-medium mr-1">License:</span>
                <span className="text-white">{Tile.license.type}</span>
              </div>
            )}
          </div>

          {/* Second row: Cookies, Source */}
          <div className="flex items-center justify-start space-x-6 mt-2 flex-wrap">
            {Tile.cookieInformaton && Tile.cookieInformaton.length > 0 && (
              <div className="flex items-center">
                <span className="text-white font-medium mr-1">Cookies:</span>
                <div className="relative flex items-center">
                  <span className="text-white">
                    {Tile.cookieInformaton.map((c) => c.type).join(', ')}
                  </span>

                  <button
                    onClick={() => setShowCookieInfo(!showCookieInfo)}
                    onMouseEnter={() => setShowCookieInfo(true)}
                    onMouseLeave={() => setShowCookieInfo(false)}
                    className="hover:underline rounded-full"
                    aria-label="Show cookie information"
                    aria-expanded={showCookieInfo}
                  >
                    <Info
                      size={12}
                      className="ml-1 text-white"
                      aria-hidden="true"
                    />
                  </button>

                  {showCookieInfo && (
                    <div
                      className="absolute bottom-6 left-0 bg-black/90 p-3 rounded-lg text-white text-xs w-60 z-20 font-mono"
                      role="tooltip"
                      aria-live="polite"
                    >
                      {Tile.cookieInformaton.map((cookie, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <div className="font-medium capitalize">
                            {cookie.type}
                          </div>
                          <div className="text-white text-[10px]">
                            {cookie.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {Tile.origin && (
              <div className="flex items-center">
                <span className="text-white font-medium mr-1">Source:</span>

                <a
                  href={Tile.origin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white focus:outline-none focus:underline "
                  aria-label={`Source: ${new URL(Tile.origin).hostname}`}
                >
                  {new URL(Tile.origin).hostname}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

type DisplayOwnTilesProps = {
  filter: string;
};

const DisplayOwnTiles = (props: DisplayOwnTilesProps) => {
  if (props.filter.trim() === '') return null;

  const results = tileNames.filter((s) =>
    s.toLowerCase().includes(props.filter.toLowerCase())
  );

  if (results.length === 0) {
    return (
      <div className="w-full text-center m-4 text-white font-medium">
        No tiles found
      </div>
    );
  }

  return (
    <div role="region" aria-label="Tile search results">
      {results.map((e) => (
        <TileDisplay key={e} name={e} />
      ))}
    </div>
  );
};

export default DisplayOwnTiles;
