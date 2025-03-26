/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TileInfo } from '@own.page/own.tiles';
import Modal from './Modal';
import PropsForm from './PropsForm';
import { useState, useEffect, type SetStateAction, useRef } from 'react';
import { CaretDown, Code, Link } from '@phosphor-icons/react/dist/ssr';

/**
 * Waits a fixed amount of seconds and returns a promise that resolves after that time,
 * or rejects if another call to this function was made in the meantime.
 * So basically only the last call to this function (within the given time) will resolve.
 * @param timeInMilliseconds the time to wait in milliseconds
 */
export function useTimeout(timeInMilliseconds: number): () => Promise<void> {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return () => {
    return new Promise<void>((resolve) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(resolve, timeInMilliseconds);
    });
  };
}

type TileConfigProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  info: TileInfo;
  height: number;
  children?: React.ReactNode;
};

type ButtonProps = {
  Icon: React.ElementType;
  onClick: () => void;
  text?: string;
};

const Button = ({ Icon, onClick, text }: ButtonProps) => {
  return (
    <button
      className="bg-white/60 text-black/70 rounded-full 
      px-4 py-2 flex items-center space-x-2 text-sm relative group/button 
      hover:bg-white/80 active:bg-white/90 focus:outline-none"
      onClick={onClick}
      title={text}
      aria-label={text}
    >
      <Icon size={18} aria-hidden="true" />
      <span
        className="absolute top-10 z-10 -translate-x-1/2 bg-black/90
       text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 
       group-hover/button:opacity-100 transition-opacity pointer-events-none"
        role="tooltip"
      >
        {text}
      </span>
    </button>
  );
};

// Dropdown component for dimension selection
type DimensionDropdownProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const DimensionDropdown = ({
  label,
  value,
  onChange
}: DimensionDropdownProps) => {
  // Generate options from 1 to 5 plus Max
  const options = [1, 2, 3, 4, 5, 5.5, 6, 7, 8, 9, 10];
  // Convert units to pixels - special case for 5.5 units which is 528px
  const convertToPixels = (value: number) => (value === 5.5 ? 528 : value * 96);

  // Format option label
  const formatOptionLabel = (opt: number) => {
    if (opt === 5.5) return 'Default (528px)';
    return `${opt} unit${opt !== 1 ? 's' : ''} (${convertToPixels(opt)}px)`;
  };

  return (
    <div className="flex items-center">
      <label className="text-white mr-2 text-sm">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-36 h-[34px] pl-4 pr-8 bg-white/60 text-black/70 rounded-full text-sm appearance-none cursor-pointer focus:outline-none"
        aria-label={`Select ${label.toLowerCase()}`}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOptionLabel(opt)}
          </option>
        ))}
      </select>
      <CaretDown
        className="relative -left-7 text-black/70 pointer-events-none"
        weight="bold"
        size={16}
        aria-hidden="true"
      />
    </div>
  );
};

const TileConfig = (props: TileConfigProps) => {
  const [immediateProps, setImmediateProps] = useState({});
  const [debouncedProps, setDebouncedProps] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false); // loading state not used yet
  const [tileWidth, setTileWidth] = useState(5.5); // Default width (Max = 528px)
  const [tileHeight, setTileHeight] = useState(3); // Default height (3 units = 288px)
  const [didInitialize, setDidInitialize] = useState(false);

  const updateProps = (newProps: SetStateAction<{ [k: string]: any }>) => {
    setImmediateProps(newProps);
    setDebouncedProps(newProps);
  };

  const timeout = useTimeout(2000);

  const updateDebouncedProps = async (
    newProps: SetStateAction<{ [k: string]: any }>
  ) => {
    setImmediateProps(newProps);
    setLoading(true);
    timeout().then(() => {
      setDebouncedProps(newProps);
      setLoading(false);
    });
  };

  const createLink = (): string => {
    const host = window.location.origin;
    const link = `${host}/widgets/${props.info.name}?${new URLSearchParams(debouncedProps).toString()}`;
    return link;
  };

  const copyLinkToClipboard = () => {
    const link = createLink();
    navigator.clipboard.writeText(link);
  };

  const copyIframeToClipboard = () => {
    const link = createLink();
    const iframe = `<iframe src="${link}" width="100%" height="100%"></iframe>`;
    navigator.clipboard.writeText(iframe);
  };

  // Get min and max dimensions from tile info
  useEffect(() => {
    if (props.info.minDimensions && !didInitialize) {
      const minDims =
        typeof props.info.minDimensions === 'function'
          ? props.info.minDimensions({} as any)
          : props.info.minDimensions;

      // Always start with maximum width (5.5) and the minimum height from the tile
      setTileWidth(5.5);
      setTileHeight(minDims.h);
      setDidInitialize(true);
    }
  }, [props.info, didInitialize]);

  // Calculate dimensions in pixels
  const heightInPixels = tileHeight * 96;
  const widthInPixels = tileWidth === 5.5 ? 528 : tileWidth * 96;

  return (
    <Modal
      className="rounded-3xl bg-gray-50/20 backdrop-blur-xl border border-white/20"
      trigger={props.children}
    >
      <div className="max-w-xl flex flex-col m-auto p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <DimensionDropdown
                label="Width"
                value={tileWidth}
                onChange={setTileWidth}
              />
              <span className="text-white mr-4">×</span>
              <DimensionDropdown
                label="Height"
                value={tileHeight}
                onChange={setTileHeight}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={copyIframeToClipboard}
              Icon={Code}
              text="Copy iframe"
            />
            <Button
              onClick={copyLinkToClipboard}
              Icon={Link}
              text="Copy link"
            />
          </div>
        </div>

        <div
          className="w-full mt-6 overflow-hidden relative left-1/2 -translate-x-1/2"
          aria-label={`${props.info.name} tile preview`}
          style={{ height: heightInPixels, width: widthInPixels }}
        >
          <props.info.Component
            {...debouncedProps}
            {...('grid' in props.info.props
              ? {
                  grid: {
                    w: tileWidth === 5.5 ? 5.5 : tileWidth,
                    h: tileHeight,
                    x: 0,
                    y: 0
                  }
                }
              : {})}
          />
        </div>

        <div className="w-full h-1/3 mt-6">
          <h2 className="sr-only">Tile Configuration</h2>

          <PropsForm
            propsInfo={props.info.props}
            previewProps={immediateProps}
            setPreviewProps={updateProps}
            setDebouncedPreviewProps={updateDebouncedProps}
          />
        </div>
      </div>
    </Modal>
  );
};

export default TileConfig;
