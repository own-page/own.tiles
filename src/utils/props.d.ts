import { ComponentType } from 'react';
export type PropInfo = {
    description: string;
    type: string | string[];
    required: boolean;
    defaultValue?: unknown;
    /** if true, a change in prop will result in a slow refresh (e.g. if iframe link is changed) */
    slowLoad: boolean;
};
export type PropsInfo<T> = {
    [K in keyof T]: PropInfo;
};
/** does one level deep merge of props */
export declare const mergeProps: (a: any, b: any) => {
    [k: string]: any;
};
export declare function isComplex(propInfo: PropInfo): boolean;
export declare function getPropsInfo<T extends ComponentType<any>>(componentInfo: any): PropsInfo<React.ComponentProps<T>>;
