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

export default SearchBar;
