'use client';

import { type FC, type IframeHTMLAttributes, useEffect, useState } from 'react';

type ChromHackProps = {
  /** callback that is called once on startup */
  loadProp: () => void;
};

function useOnce(f: () => void) {
  useEffect(() => {
    f();
  }, []);
}

/**
 * Chrome hack that solved the following bug:
 * Chrome has the problem that it does not utilize the onLoad prop, 
 ' therefore we have to introduce a side-effect sadly
 * @param props @see ChromHackProps
 */
const ChromeHack = (props: ChromHackProps) => {
  useOnce(props.loadProp);
  return <></>;
};

const IFrame: FC<IframeHTMLAttributes<HTMLIFrameElement>> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const loaded = () => {
    setIsLoaded(true);
  };

  // Ensure iframe has proper accessibility attributes
  const enhancedProps = {
    ...props,
    title: props.title || 'Embedded content', // Default title if none provided
    'aria-label': props['aria-label'] || props.title || 'Embedded content' // Use title as fallback for aria-label
  };

  return (
    <>
      <iframe
        {...enhancedProps}
        onLoad={loaded}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          ...props.style
        }}
        loading="lazy"
      >
        <ChromeHack loadProp={loaded} />
      </iframe>
    </>
  );
};

export default IFrame;
