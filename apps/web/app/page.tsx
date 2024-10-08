/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, createContext, useContext } from 'react';
import {
  GithubLogo,
  DiscordLogo,
  MagnifyingGlass,
  X,
  XLogo,
  Clipboard,
  SlidersHorizontal,
  Check
} from '@phosphor-icons/react/dist/ssr';
import OwnPageLogo from '../public/own.page_logo_bold.svg';
import { tiles } from 'own.tiles';

const ConfigureContext = createContext<{
  setConfigureTile: (name: string | null) => void;
}>({
  setConfigureTile: () => {}
});

const socials = [
  {
    name: 'own.page',
    url: 'https://own.page',
    icon: () => (
      <div className="size-6 flex items-center justify-center">
        <OwnPageLogo height={23} />
      </div>
    )
  },
  {
    name: 'Github',
    url: 'https://github.com/own-page/own.tiles',
    icon: GithubLogo
  },
  { name: 'Discord', url: 'https://discord.gg/GVz4ykbh6C', icon: DiscordLogo },
  { name: 'X', url: 'https://x.com/own_pages', icon: XLogo }
];

const P = (props: React.PropsWithChildren) => (
  <p className="text-white/70 text-sm font-medium pt-4">{props.children}</p>
);

type HeaderProps = {
  showHeader: boolean;
};

const Header = (props: HeaderProps) => (
  <header
    data-visible={props.showHeader}
    className="space-y-4 flex flex-col items-center justify-center 
    transition-all duration-500
    data-[visible=false]:opacity-80
    data-[visible=false]:blur-xl
    data-[visible=false]:pointer-events-none
    data-[visible=false]:select-none
    "
  >
    <h1 className="font-semibold text-7xl sm:text-8xl text-white">own.tiles</h1>
    <P>the open source repository for grid-based web widgets</P>
    <div className="flex gap-4">
      {socials.map((social) => (
        <a href={social.url} key={social.name}>
          <social.icon size={24} weight="fill" />
        </a>
      ))}
    </div>
    <P>gratefully funded by</P>
    <div>
      <a
        href="https://www.netidee.at/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/netidee_logo.svg"
          alt="netidee logo"
          width={128}
          height={32}
        />
      </a>
    </div>
  </header>
);

type SearchBarProps = {
  value: string;
  setSearchValue: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="flex items-center justify-center py-6">
      <div className="relative w-96">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={props.value}
          onChange={(e) => {
            props.setSearchValue(e.target.value);
          }}
          className="bg-white/10 px-5 py-3 w-full border border-white/80 rounded-full
             outline-none text-white placeholder:text-white/50 focus:ring-0 drop-shadow-xl"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
          onClick={() => {
            if (props.value) {
              props.setSearchValue('');
              // Autofocus the input after clearing
              inputRef.current.focus();
            }
          }}
          type="button"
          style={{ cursor: props.value ? 'pointer' : 'default' }}
        >
          {props.value ? (
            <X size={24} className="text-white" weight="bold" />
          ) : (
            <MagnifyingGlass size={24} className="text-white" weight="bold" />
          )}
        </button>
      </div>
    </div>
  );
};

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
  configure: boolean;
};

const TileDisplay = (props: TileDisplayProps) => {
  const Tile = tiles[props.name];

  const [isCopied, setIsCopied] = useState(false);
  const { setConfigureTile } = useContext(ConfigureContext);

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
      data-modal={props.configure}
    >
      <div className="text-xl font-semibold leading-none">{props.name}</div>
      <div className="absolute right-5 top-0 space-x-1">
        <TileDisplayButton
          Icon={isCopied ? Check : Clipboard}
          onClick={copyToClipboard}
        />
        <TileDisplayButton
          Icon={SlidersHorizontal}
          onClick={() => setConfigureTile(props.name)}
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
  configure: string | undefined;
};

const DisplayOwnTiles = (props: DisplayOwnTilesProps) => {
  if (props.filter.trim() === '') return null;

  const results = tileNames.filter((s) =>
    s.toLowerCase().includes(props.filter)
  );

  if (results.length === 0) {
    return <div className="w-full text-center">No tiles found</div>;
  }

  return (
    <>
      {results.map((e) => (
        <TileDisplay
          key={e}
          name={e}
          configure={props.configure === e.toLowerCase()}
        />
      ))}
    </>
  );
};

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [configureTile, setConfigureTile] = useState<string | null>(null);

  const showHeader = searchValue.trim() === '';

  const showModal = configureTile !== null;

  return (
    <ConfigureContext.Provider value={{ setConfigureTile }}>
      <div
        className="fixed inset-0 w-screen h-screen 
        bg-gradient-to-bl from-green-400 via-teal-400 to-blue-500 bg-fixed"
      />
      <div
        className="m-auto max-w-xl w-full px-6 space-y-10
        data-[show-header=true]:animate-slideDown
        data-[show-header=false]:animate-slideUp
        transform-gpu will-change-[transform]"
        data-show-header={showHeader}
      >
        <SearchBar value={searchValue} setSearchValue={setSearchValue} />
        <div className="w-full">
          <Header showHeader={showHeader} />
        </div>
        <div className="absolute top-12 left-0 w-full">
          <DisplayOwnTiles
            filter={searchValue}
            configure={configureTile ?? undefined}
          />
        </div>
      </div>
      {showModal && (
        <div className="w-full inset-0 fixed backdrop-blur-xl z-[1000]">
          <button
            className="absolute top-2 right-2 flex items-center justify-center p-2"
            onClick={() => setConfigureTile(null)}
          >
            <X size={24} weight="bold" />
          </button>
        </div>
      )}
    </ConfigureContext.Provider>
  );
}
