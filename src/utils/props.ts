import { parse, type ComponentDoc } from 'react-docgen-typescript';

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

export function getPropsInfo<T>(
  componentPath: string,
  componentName?: string
): PropsInfo<T> {
  const componentInfos = parse(componentPath);

  if (componentInfos.length === 0) {
    throw new Error(`No components found in ${componentPath}`);
  }

  // Look for the default export
  const defaultExport = componentInfos.find((info) => info.tags?.default);

  if (defaultExport) {
    return processComponentInfo(defaultExport);
  } else if (componentInfos.length === 1) {
    // If there's only one component and it's not a default export, use it
    return processComponentInfo(componentInfos[0]);
  } else if (!componentName) {
    // If there are multiple components, no default export, and no componentName provided, throw an error
    throw new Error(
      `No default export found in ${componentPath} and multiple components present. Please specify a component name.`
    );
  } else {
    // If componentName is provided, try to find the matching component
    const namedComponent = componentInfos.find(
      (info) => info.displayName === componentName
    );
    if (namedComponent) {
      return processComponentInfo(namedComponent);
    } else {
      throw new Error(
        `Component "${componentName}" not found in ${componentPath}`
      );
    }
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
