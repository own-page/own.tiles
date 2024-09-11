import { ComponentType } from 'react';

export type PropInfo = {
  description: string;
  type: string | string[];
  required: boolean;
  defaultValue?: any;
};

export type PropsInfo<T> = {
  [K in keyof T]: PropInfo;
};

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

    if (prop.type.name === 'enum') {
      type = prop.type.value.map((v: any) => v.value.replace(/"/g, ''));
    } else if (prop.type.name === 'union') {
      type = prop.type.value.map((v: any) => v.name);
    } else if (
      ['boolean', 'number', 'string', 'object', 'function'].includes(
        prop.type.name
      )
    ) {
      type = prop.type.name;
    } else {
      type = 'string'; // Default to string for other types
    }

    result[key as keyof T] = {
      description: prop.description || '',
      type: type,
      required: prop.required || false,
      defaultValue: prop.defaultValue?.value
    };
  }

  return result;
}
