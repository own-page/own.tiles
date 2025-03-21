'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DisplayOwnTiles from '@/components/TileDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  const showHeader = searchValue.trim() === '';

  return (
    <main>
      <div
        className="fixed inset-0 w-screen h-screen 
        bg-gradient-to-bl from-green-500 via-teal-700 to-blue-700 bg-fixed"
        aria-hidden="true"
      />
      <div
        className="m-auto max-w-xl w-full px-6 space-y-10
        data-[show-header=true]:animate-slideDown
        data-[show-header=false]:animate-slideUp
        transform-gpu will-change-[transform]
        group relative"
        data-show-header={showHeader}
      >
        <div className="sr-only">
          <h1>own.tiles - open source repository for grid-based web widgets</h1>
        </div>
        <SearchBar value={searchValue} setSearchValue={setSearchValue} />
        <div className="w-full">
          <Header showHeader={showHeader} />
        </div>
        <div
          className="absolute top-12 left-0 w-full"
          role="region"
          aria-label="Search results"
        >
          {<DisplayOwnTiles filter={searchValue} />}
          {!showHeader && <Footer className="p-2" />}
        </div>
      </div>

      {showHeader && <Footer className="fixed right-0 bottom-0 p-2" />}
    </main>
  );
}
