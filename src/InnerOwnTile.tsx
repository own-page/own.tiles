import {
  type ComponentPropsWithRef,
  type ElementType,
  type PropsWithChildren
} from 'react';

type InnerOwnTileProps<T extends ElementType = 'div'> = {
  Component?: T;
  className?: string;
} & ComponentPropsWithRef<T>;

// This is not needed nor compulsory for OwnTiles to have! just a nice helper to get equal design
// TODO: probably transition padding and border radius to use variables that are defined in the style
export const InnerOwnTile = <T extends ElementType = 'div'>({
  Component = 'div' as T, // Default to 'div'
  children,
  className,
  ...rest
}: PropsWithChildren<InnerOwnTileProps<T>>) => {
  return (
    <Component
      // this p-4 gap here is inside the element (e.g. so that text has border until edge of tile)
      className={
        `p-4 rounded-[2.25rem] w-full h-full overflow-hidden relative ` +
        (className || '')
      }
      {...rest}
    >
      {children}
    </Component>
  );
};
