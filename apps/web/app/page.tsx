'use client';

import React, { useState, createContext } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DisplayOwnTiles from '@/components/TileDisplay';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const showHeader = searchValue.trim() === '';

  return (
    <>
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
          <DisplayOwnTiles filter={searchValue} />
        </div>
      </div>
    </>
  );
}
