import { fileURLToPath } from 'node:url';
import { type Plugin } from 'vite';
import { type ComponentDoc, withCustomConfig } from 'react-docgen-typescript';

const docgenOptions = {
  shouldExtractValuesFromUnion: true,
  // shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true,
  // the page language comes from the renderer, it is not an editor setting
  propFilter: (prop: { name: string }) => prop.name !== 'language'
};

// the tsconfig resolves bare imports like 'types'; without it, props typed
// with an imported type come back empty and the editor shows no fields
const docgen = withCustomConfig(
  fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
  docgenOptions
);

export function autoProps(options: {
  getPropsInfo: (info: ComponentDoc[]) => object;
  debug?: boolean;
}): Plugin {
  return {
    name: 'auto-props',
    transform(code, id) {
      if (id.endsWith('.tsx') && id.includes('/widgets/')) {
        const parsedInfo = docgen.parse(id);
        const propsInfo = options.getPropsInfo(parsedInfo);

        if (Object.keys(propsInfo).length === 0) {
          throw new Error(`auto-props: no editor props found in ${id}`);
        }

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
