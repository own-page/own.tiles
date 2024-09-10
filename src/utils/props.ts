import { parse, type ComponentDoc } from 'react-docgen-typescript';
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
  componentPath: string,
  component: T
): PropsInfo<React.ComponentProps<T>> {
  const componentInfos = parse(componentPath);

  if (componentInfos.length === 0) {
    throw new Error(`No components found for ${component.name}`);
  }

  const componentName = component.name;
  const namedComponent = componentInfos.find(
    (info) => info.displayName === componentName
  );

  if (namedComponent) {
    return processComponentInfo(namedComponent);
  } else {
    throw new Error(
      `Component "${componentName}" not found in parsed information`
    );
  }
}

function processComponentInfo<T>(componentInfo: ComponentDoc): PropsInfo<T> {
  const result: PropsInfo<T> = {} as PropsInfo<T>;

  for (const [key, prop] of Object.entries(componentInfo.props)) {
    let type: string | string[];

    if (prop.type.name === 'union') {
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
