import { ComponentType } from 'react';

export type PropInfo = {
  description: string;
  type: string | string[];
  required: boolean;
  defaultValue?: any;
  /** if true, a change in prop will result in a slow refresh (e.g. if iframe link is changed) */
  slowLoad: boolean;
};

export type PropsInfo<T> = {
  [K in keyof T]: PropInfo;
};

/** does one level deep merge of props */
export const mergeProps = (a: any, b: any) =>
  Object.fromEntries(
    Object.entries({ ...a, ...b }).map(([k, v]) => [
      k,
      typeof v === 'object' && v ? { ...a[k], ...v } : v
    ])
  );

export function isComplex(propInfo: PropInfo): boolean {
  return propInfo.type === 'object' || propInfo.type === 'function';
}

export function getPropsInfo<T extends ComponentType<any>>(
  componentInfo: any
): PropsInfo<React.ComponentProps<T>> {
  return processComponentInfo(componentInfo[0]);
}

function processComponentInfo<T>(componentInfo: any): PropsInfo<T> {
  const result: PropsInfo<T> = {} as PropsInfo<T>;

  for (const [key, prop] of Object.entries(componentInfo.props) as [
    string,
    any
  ][]) {
    let type: string | string[];

    if (prop.type.raw === 'boolean') {
      type = 'boolean';
    } else if (prop.type.name === 'enum') {
      type = prop.type.value.map((v: any) => v.value.replace(/"/g, ''));
    } else if (
      ['number', 'string', 'object', 'function'].includes(prop.type.name)
    ) {
      type = prop.type.name;
    } else {
      continue; // skip unknown types
    }

    result[key as keyof T] = {
      description: prop.description || '',
      type: type,
      required: prop.required || false,
      defaultValue: prop.defaultValue?.value,
      ogInfo: prop
    } as any;
  }

  return result;
}
