import { ComponentPropsWithRef, ElementType, PropsWithChildren } from 'react';
type InnerOwnTileProps<T extends ElementType = 'div'> = {
    Component?: T;
    className?: string;
} & ComponentPropsWithRef<T>;
export declare const InnerOwnTile: <T extends ElementType = "div">({ Component, children, className, ...rest }: PropsWithChildren<InnerOwnTileProps<T>>) => import("react/jsx-runtime").JSX.Element;
export {};
