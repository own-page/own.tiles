import {
  Check,
  Clipboard,
  SlidersHorizontal,
  Info
} from '@phosphor-icons/react/dist/ssr';
import { widgets as tiles } from 'own.tiles';
import 'own.tiles/style.css';
import { useState } from 'react';
import TileConfig from './TileConfig';

type TileDisplayButtonProps = {
  Icon: React.ElementType;
  onClick?: () => void;
};

const TileDisplayButton = (props: TileDisplayButtonProps) => {
  return (
    <button
      className="hover:bg-white/20 p-1 rounded-md"
      onClick={props.onClick}
    >
      <props.Icon size={20} weight="fill" />
    </button>
  );
};

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
      >
        <div className="text-xl font-semibold leading-none">{props.name}</div>
        <div className="absolute right-5 top-0 space-x-1">
          <TileDisplayButton
            Icon={isCopied ? Check : Clipboard}
            onClick={copyToClipboard}
          />
          <TileDisplayButton
            Icon={SlidersHorizontal}
            onClick={() => setIsOpen(true)}
          />
        </div>
        <div className="overflow-hidden" style={{ height }}>
          <Tile.Component />
        </div>

        {/* Author, Accessibility and Cookie Information Footer */}
        <div className="flex flex-col  text-white text-xs m-3 rounded-2xl backdrop-blur-sm font-mono">
          {/* First row: Author and Accessibility */}
          <div className="flex items-center justify-start space-x-6">
            {Tile.author && (
              <div className="flex items-center">
                <span className="opacity-70 mr-1">Author:</span>
                <a
                  href={Tile.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-100"
                >
                  {Tile.author.name}
                </a>
              </div>
            )}

            {Tile.accessibility && (
              <div className="flex items-center">
                <span className="opacity-70 mr-1">Accessibility:</span>
                <span className="opacity-100">
                  {Tile.accessibility.standard} {Tile.accessibility.rating}
                </span>
              </div>
            )}

            {Tile.license && (
              <div className="flex items-center">
                <span className="opacity-70 mr-1">License:</span>
                <span className="opacity-100">{Tile.license.type}</span>
              </div>
            )}
          </div>

          {/* Second row: Cookies, Source */}
          <div className="flex items-center justify-start space-x-6 mt-2">
            {Tile.cookieInformaton && Tile.cookieInformaton.length > 0 && (
              <div className="flex items-center">
                <span className="opacity-70 mr-1">Cookies:</span>
                <div className="relative flex items-center">
                  {Tile.cookieInformaton.map((c) => c.type).join(', ')}

                  <button
                    onClick={() => setShowCookieInfo(!showCookieInfo)}
                    onMouseEnter={() => setShowCookieInfo(true)}
                    onMouseLeave={() => setShowCookieInfo(false)}
                    className=" opacity-100 hover:underline"
                  >
                    <Info size={12} className="ml-1" />
                  </button>

                  {showCookieInfo && (
                    <div className="absolute bottom-6 left-0 bg-black/90 p-3 rounded-lg text-white text-xs w-60 z-20 font-mono">
                      {Tile.cookieInformaton.map((cookie, i) => (
                        <div key={i} className="mb-2 last:mb-0">
                          <div className="font-medium capitalize">
                            {cookie.type}
                          </div>
                          <div className="text-white/70 text-[10px]">
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
                <span className="opacity-70 mr-1">Source:</span>

                <a
                  href={Tile.origin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline opacity-100"
                >
                  {new URL(Tile.origin).hostname}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <TileConfig
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        info={Tile}
        height={height}
      />
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
    return <div className="w-full text-center m-4">No tiles found</div>;
  }

  return results.map((e) => <TileDisplay key={e} name={e} />);
};

export default DisplayOwnTiles;
