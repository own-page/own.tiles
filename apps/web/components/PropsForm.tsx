/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  User,
  X,
  CaretDown,
  Link,
  Palette,
  Calendar,
  MapPin
} from '@phosphor-icons/react';
import { useEffect, useRef } from 'react';
import type { PropInfo, PropsInfo } from 'own.tiles';

const mapComponents = {
  username: <User weight="bold" />,
  link: <Link weight="bold" />,
  theme: <Palette weight="bold" />,
  date: <Calendar weight="bold" />,
  location: <MapPin weight="bold" />
};

const TextInput: React.FC<{
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  label?: string;
  index: number;
}> = ({ id, value, setValue, placeholder, label }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // The paste event handler should only apply when the input is focused
    const handlePaste = () => {
      // Only handle paste events when this specific input is focused
      if (inputRef.current && document.activeElement === inputRef.current) {
        // No need to preventDefault - let the normal paste behavior work
        // e.preventDefault();
        // const pastedText = e.clipboardData?.getData('text');
        // if (pastedText) {
        //   setValue(pastedText);
        // }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [setValue]);

  const displayLabel = label || placeholder;

  return (
    <>
      <div className="relative rounded-full bg-black/40 px-2 py-0 cursor-text h-10 flex items-center w-72">
        <label htmlFor={`input-${id}`} className="sr-only">
          {displayLabel}
        </label>
        <div
          className="absolute inset-y-0 left-3 flex items-center text-white"
          aria-hidden="true"
        >
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <input
          ref={inputRef}
          id={`input-${id}`}
          type="text"
          className="bg-transparent text-white text-left px-7 py-1 focus:outline-none w-full h-full placeholder:text-white/80 rounded-full"
          placeholder={displayLabel}
          onFocus={(e) => {
            e.target.placeholder = '';
          }}
          onBlur={(e) => {
            e.target.placeholder = displayLabel;
          }}
          value={value}
          maxLength={256}
          onChange={(e) => setValue(e.target.value)}
          onPaste={() => {
            // Let the default paste behavior work
          }}
          aria-label={displayLabel}
        />
        {value && (
          <button
            className="relative right-1 text-white/70 hover:text-white focus:outline-none rounded-full"
            onClick={() => setValue('')}
            aria-label={`Clear ${displayLabel}`}
            type="button"
          >
            <X size={16} weight="bold" />
          </button>
        )}
      </div>
    </>
  );
};

const Toggle: React.FC<{
  id: string;
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
}> = ({ id, value, setValue, label }) => {
  const displayLabel = label || id;
  const toggleId = `toggle-${id}`;

  return (
    <>
      <div className="relative rounded-full px-2 py-0 h-10 flex items-center w-72">
        <div
          className="absolute inset-y-0 left-3 flex items-center text-white"
          aria-hidden="true"
        >
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <label
          htmlFor={toggleId}
          className="text-white text-left px-7 py-1 cursor-pointer"
        >
          {displayLabel}
        </label>
        <div className="absolute right-3 flex items-center">
          <input
            id={toggleId}
            type="checkbox"
            checked={value}
            onChange={(e) => setValue(e.target.checked)}
            className="sr-only peer"
            aria-label={displayLabel}
          />
          <div
            className={`
              cursor-pointer w-11 h-6
              rounded-full peer
              bg-black/30
              border-black/20
              transition duration-200 ease-in-out

              hover:outline-none
              hover:ring-4
              hover:ring-white/20

              peer-checked:after:translate-x-full
              rtl:peer-checked:after:-translate-x-full
              peer-checked:after:border-white
              peer-checked:bg-white/50

              after:content-['']
              after:absolute
              after:top-[2px]
              after:start-[2px]
              after:bg-white
              after:border-white/20
              after:border
              after:rounded-full
              after:h-5
              after:w-5
              after:transition-all
              after:duration-200
              after:ease-in-out
            `}
          ></div>
        </div>
      </div>
    </>
  );
};

const Dropdown: React.FC<{
  id: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  options: any[];
  label?: string;
}> = ({ id, value, setValue, options, label }) => {
  const currentValue = value || options[0];
  const displayLabel = label || id;
  const selectId = `select-${id}`;

  return (
    <>
      <div className="relative rounded-full px-2 py-0 h-10 flex items-center w-72">
        <div
          className="absolute inset-y-0 left-3 flex items-center text-white"
          aria-hidden="true"
        >
          {id in mapComponents && (mapComponents as any)[id]}
        </div>
        <label htmlFor={selectId} className="text-white text-left px-7 py-1">
          {displayLabel}
        </label>
        <div className="absolute right-3 flex items-center">
          <select
            id={selectId}
            value={currentValue}
            onChange={(e) => setValue(e.target.value)}
            className="w-32 h-8 pl-4 pr-8 text-black/70 bg-white/60 rounded-full appearance-none cursor-pointer "
            aria-label={displayLabel}
          >
            {options.map((option) => (
              <option key={option} value={option} className="bg-white">
                {option}
              </option>
            ))}
          </select>
          <CaretDown
            className="absolute right-3 text-black/70 pointer-events-none"
            weight="bold"
            size={16}
            aria-hidden="true"
          />
        </div>
      </div>
    </>
  );
};

const getComponent = (
  type: PropInfo['type']
): React.ComponentType<any> | null => {
  if (type === 'string') return TextInput;
  if (type === 'boolean') return Toggle;
  if (Array.isArray(type)) return Dropdown;
  return null;
};

const PropInput: React.FC<{
  id: string;
  value: any;
  info: PropInfo;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  index: number;
}> = (props) => {
  const Component = getComponent(props.info.type);

  if (!Component) return null;

  const currentValue = props.value ?? props.info.defaultValue;

  return (
    <div className="flex items-center justify-center z-[10000] my-2">
      <Component
        id={props.id}
        value={currentValue}
        setValue={props.setValue}
        label={props.info.description}
        placeholder={props.info.type === 'string' ? props.id : undefined}
        options={Array.isArray(props.info.type) ? props.info.type : undefined}
        index={props.index}
      />
    </div>
  );
};

type Props<P> = {
  propsInfo: PropsInfo<P>;
  previewProps: Record<string, any>;
  setPreviewProps: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setDebouncedPreviewProps: React.Dispatch<
    React.SetStateAction<Record<string, any>>
  >;
};

const PropsForm = <P,>(props: Props<P>) => {
  return (
    <div role="form" aria-label="Tile configuration">
      {Object.entries(props.propsInfo).map(([k, v], index) => (
        <PropInput
          key={k}
          id={k}
          value={props.previewProps[k] ?? ''}
          info={v as PropInfo}
          setValue={(newValue) => {
            const setter = (v as PropInfo).slowLoad
              ? props.setDebouncedPreviewProps
              : props.setPreviewProps;
            setter((p) => ({
              ...p,
              [k]: newValue
            }));
          }}
          index={index}
        />
      ))}
    </div>
  );
};

export default PropsForm;
