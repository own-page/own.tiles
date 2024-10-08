import {
  Check,
  Clipboard,
  SlidersHorizontal
} from '@phosphor-icons/react/dist/ssr';
import { tiles } from 'own.tiles';
import { useState } from 'react';

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

const tileNames = Object.keys(tiles);

type TileDisplayProps = {
  name: string;
  //   configure: boolean;
};

const TileDisplay = (props: TileDisplayProps) => {
  const Tile = tiles[props.name];

  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    setIsCopied(true);
    // navigator.clipboard.writeText(Tile.code);
    setTimeout(() => {
      setIsCopied(false);
    }, 300);
  };

  if (!Tile) return null;

  const getHeight = () => {
    if ('minDimensions' in Tile) {
      const dimensions =
        typeof Tile.minDimensions === 'function'
          ? (Tile.minDimensions as () => { h: number })()
          : Tile.minDimensions;
      return (dimensions as { h: number }).h * 96;
    }
    return 288; // Default height in pixels
  };

  return (
    <div
      className="my-4 px-5 py-5 space-y-5 bg-white/10 rounded-2xl relative text-white
     border border-white/20 data-[modal=true]:z-[1001]"
      //   data-modal={props.configure}
    >
      <div className="text-xl font-semibold leading-none">{props.name}</div>
      <div className="absolute right-5 top-0 space-x-1">
        <TileDisplayButton
          Icon={isCopied ? Check : Clipboard}
          onClick={copyToClipboard}
        />
        <TileDisplayButton
          Icon={SlidersHorizontal}
          //   onClick={() => setConfigureTile(props.name)}
        />
      </div>
      <div
        className="overflow-hidden"
        style={{
          height: getHeight()
        }}
      >
        <Tile.Component />
      </div>
    </div>
  );
};

type DisplayOwnTilesProps = {
  filter: string;
};

const DisplayOwnTiles = (props: DisplayOwnTilesProps) => {
  if (props.filter.trim() === '') return null;

  const results = tileNames.filter((s) =>
    s.toLowerCase().includes(props.filter)
  );

  if (results.length === 0) {
    return <div className="w-full text-center m-4">No tiles found</div>;
  }

  return results.map((e) => <TileDisplay key={e} name={e} />);
};

export default DisplayOwnTiles;
