import { type Plugin } from 'vite';
import { type ComponentDoc, parse } from 'react-docgen-typescript';

const docgenOptions = {
  shouldExtractValuesFromUnion: true,
  // shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true
};

export function autoProps(options: {
  getPropsInfo: (info: ComponentDoc[]) => object;
  debug?: boolean;
}): Plugin {
  return {
    name: 'auto-props',
    transform(code, id) {
      if (id.endsWith('.tsx') && id.includes('/widgets/')) {
        const parsedInfo = parse(id, docgenOptions);
        const propsInfo = options.getPropsInfo(parsedInfo);

        const tileModification = `
          import { mergeProps } from 'utils/props';
          ${code}
          if (tile) {
            tile.props = mergeProps(tile.props, ${JSON.stringify(propsInfo)});
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
