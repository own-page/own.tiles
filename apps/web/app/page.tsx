'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  GithubLogo,
  DiscordLogo,
  MagnifyingGlass,
  X,
  XLogo
} from '@phosphor-icons/react/dist/ssr';
import { Plus_Jakarta_Sans } from 'next/font/google';
import OwnPageLogo from '../public/own.page_logo_bold.svg';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap'
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
    "
  >
    <h1 className="font-semibold text-8xl text-white">own.tiles</h1>
    <P>the open source repository for grid-based web widgets</P>
    <div className="flex gap-4">
      {socials.map((social) => (
        <a href={social.url} key={social.name}>
          {/* <div className="size-6 bg-red-500"> */}
          <social.icon size={24} weight="fill" />
          {/* </div> */}
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
  onSearch: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-96">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            props.onSearch(e.target.value);
          }}
          className="bg-white/10 px-5 py-3 w-full border border-white/80 rounded-full
             outline-none text-white placeholder:text-white/50 focus:ring-0 drop-shadow-xl"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
          onClick={() => {
            if (searchValue) {
              setSearchValue('');
              props.onSearch('');
              // Autofocus the input after clearing
              inputRef.current.focus();
            }
          }}
          type="button"
          style={{ cursor: searchValue ? 'pointer' : 'default' }}
        >
          {searchValue ? (
            <X size={24} className="text-white" weight="bold" />
          ) : (
            <MagnifyingGlass size={24} className="text-white" weight="bold" />
          )}
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [showHeader, setShowHeader] = useState(true);

  const handleSearch = (value: string) => {
    setShowHeader(value.trim() === '');
  };

  return (
    <div
      className={`w-screen h-screen 
    flex flex-col items-center justify-center
    space-y-16
    bg-gradient-to-bl from-green-400 via-teal-400 to-blue-500 
    ${plus_jakarta_sans.className}`}
    >
      <SearchBar onSearch={handleSearch} />
      <Header showHeader={showHeader} />
    </div>
  );
}
