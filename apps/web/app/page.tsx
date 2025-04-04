'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DisplayOwnTiles from '@/components/TileDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [showAll, setShowAll] = useState(false);

  const showHeader = searchValue.trim() === '' && !showAll;

  return (
    <main>
      <div
        className="fixed inset-0 w-screen h-screen 
        bg-gradient-to-bl  from-[#535cb1] to-[#009258] bg-fixed"
        aria-hidden="true"
      />
      <div
        className="m-auto max-w-xl w-full px-6 space-y-4
        data-[show-header=true]:animate-slideDown
        data-[show-header=false]:animate-slideUp
        transform-gpu will-change-[transform]
        group relative"
        data-show-header={showHeader}
      >
        <div className="sr-only">
          <h1>own.tiles - open source repository for grid-based web widgets</h1>
        </div>
        <SearchBar
          value={searchValue}
          setSearchValue={setSearchValue}
          showAll={showAll}
          setShowAll={setShowAll}
        />
        <div className="w-full">
          <Header showHeader={showHeader} />
        </div>
        <div
          className="absolute top-24 sm:top-16 left-0 w-full"
          role="region"
          aria-label="Search results"
        >
          {<DisplayOwnTiles filter={searchValue} showAll={showAll} />}
          {!showHeader && <Footer className="p-2 absolute right-0" />}
        </div>
      </div>

      {showHeader && <Footer className="fixed right-0 bottom-0 p-2" />}
    </main>
  );
}
