import { Plugin } from 'vite';
// import path from 'path';
import { parse } from 'react-docgen-typescript';

const docgenOptions = {
  shouldExtractValuesFromUnion: true,
  // shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true
};

export function autoProps(options: {
  getPropsInfo: Function;
  debug?: boolean;
}): Plugin {
  return {
    name: 'auto-props',
    transform(code, id) {
      if (id.endsWith('.tsx') && id.includes('/widgets/')) {
        const parsedInfo = parse(id, docgenOptions);
        const propsInfo = options.getPropsInfo(parsedInfo);

        const tileModification = `
          ${code}
          if (tile) {
            tile.props = ${JSON.stringify(propsInfo, null, 2)};
          }
        `;

        return {
          code: tileModification,
          map: null // Vite will generate the sourcemap automatically
        };
      }
    }
  };
}
