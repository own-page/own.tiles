/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TileInfo } from 'own.tiles';
import Modal from './Modal';
import PropsForm from './PropsForm';
import { useState, useEffect, type SetStateAction, useRef } from 'react';
import { Code, Link } from '@phosphor-icons/react/dist/ssr';

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
};

type ButtonProps = {
  Icon: React.ElementType;
  onClick: () => void;
  text?: string;
};

const Button = ({ Icon, onClick, text }: ButtonProps) => {
  return (
    <button
      className="bg-white/50 text-black/50 rounded-full 
      px-4 py-2 flex items-center space-x-2 text-sm relative group/button 
      hover:bg-white/70 active:bg-white/90"
      onClick={onClick}
      title={text}
    >
      <Icon size={18} />
      <span
        className="absolute top-10 z-10 -translate-x-1/2 bg-black/75
       text-white px-2 py-1 rounded-md text-xs whitespace-nowrap opacity-0 
       group-hover/button:opacity-100 transition-opacity pointer-events-none"
      >
        {text}
      </span>
    </button>
  );
};

const TileConfig = (props: TileConfigProps) => {
  const [immediateProps, setImmediateProps] = useState({});
  const [debouncedProps, setDebouncedProps] = useState({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false); // loading state not used yet

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

  return (
    <>
      {props.isOpen && (
        <Modal
          className="rounded-3xl bg-gray-50/20 backdrop-blur-xl border border-white/20"
          isOpen={props.isOpen}
          onClose={() => props.setIsOpen(false)}
        >
          <div className="max-w-xl flex flex-col m-auto p-6">
            <div className="flex items-center justify-end space-x-2">
              <Button
                onClick={copyLinkToClipboard}
                Icon={Code}
                text="Copy link"
              />
              <Button
                onClick={copyIframeToClipboard}
                Icon={Link}
                text="Copy iframe"
              />
            </div>

            <div className="w-full h-2/3 mt-6">
              <div className="overflow-hidden" style={{ height: props.height }}>
                <props.info.Component {...debouncedProps} />
              </div>
            </div>

            <div className="w-full h-1/3 mt-6">
              <PropsForm
                propsInfo={props.info.props}
                previewProps={immediateProps}
                setPreviewProps={updateProps}
                setDebouncedPreviewProps={updateDebouncedProps}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TileConfig;
