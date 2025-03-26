import { MagnifyingGlass, X, List } from '@phosphor-icons/react/dist/ssr';
import { useRef } from 'react';

type SearchBarProps = {
  value: string;
  setSearchValue: (value: string) => void;
  showAll: boolean;
  setShowAll: (value: boolean) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-center ">
      <div className="relative w-full sm:w-96">
        <label htmlFor="search-input" className="sr-only">
          Search for tiles
        </label>
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          placeholder="Search for tiles"
          value={props.value}
          onChange={(e) => {
            props.setSearchValue(e.target.value);
            if (e.target.value === '') {
              props.setShowAll(false);
            }
          }}
          className="bg-white/10 px-5 py-3 w-full border border-white/90 rounded-full
             !outline-none text-white placeholder:text-white/80 focus:!ring-0 drop-shadow-xl focus:outline-white focus:border-white"
          aria-label="Search for tiles"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-transparent border-none rounded-full"
          onClick={() => {
            if (props.value) {
              props.setSearchValue('');
              // Autofocus the input after clearing
              inputRef.current.focus();
              props.setShowAll(false);
            }
          }}
          type="button"
          aria-label={props.value ? 'Clear search' : 'Search'}
          style={{ cursor: props.value ? 'pointer' : 'default' }}
        >
          {props.value ? (
            <X
              size={24}
              className="text-white"
              weight="bold"
              aria-hidden="true"
            />
          ) : (
            <MagnifyingGlass
              size={24}
              className="text-white"
              weight="bold"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <button
        className={`ml-3 px-5 py-3 rounded-full border border-white/90 flex items-center text-white ${
          props.showAll ? 'bg-white/30' : 'bg-white/10'
        } hover:bg-white/20 transition-colors`}
        onClick={() => {
          props.setShowAll(!props.showAll);
          if (!props.showAll) {
            props.setSearchValue('');
          }
        }}
        type="button"
        aria-label={props.showAll ? 'Hide all tiles' : 'Show all tiles'}
      >
        {props.showAll ? (
          <>
            <X size={24} className="" weight="bold" aria-hidden="true" />
            <span className="ml-1">Hide all</span>
          </>
        ) : (
          <>
            <List size={24} className="" weight="bold" aria-hidden="true" />
            <span className="ml-1">Show all</span>
          </>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
