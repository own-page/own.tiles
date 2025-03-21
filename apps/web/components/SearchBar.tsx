import { MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr';
import { useRef } from 'react';

type SearchBarProps = {
  value: string;
  setSearchValue: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <div className="flex items-center justify-center py-6">
      <div className="relative w-96">
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
          }}
          className="bg-black/60 px-5 py-3 w-full border border-white/90 rounded-full
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
    </div>
  );
};

export default SearchBar;
