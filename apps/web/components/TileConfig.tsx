/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TileInfo } from 'own.tiles';
import Modal from './Modal';
import { PropsForm } from './PropsForm';
import { useState, useEffect, SetStateAction, useRef } from 'react';

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

  return (
    <>
      {props.isOpen && (
        <Modal
          className="rounded-3xl bg-gray-50/20 backdrop-blur-xl border border-white/20"
          isOpen={props.isOpen}
          onClose={() => props.setIsOpen(false)}
        >
          <div className="max-w-xl flex flex-col m-auto p-6">
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
