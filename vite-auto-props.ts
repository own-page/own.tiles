import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { type Plugin } from 'vite';
import { type ComponentDoc, withCompilerOptions } from 'react-docgen-typescript';

const docgenOptions = {
  shouldExtractValuesFromUnion: true,
  // shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true,
  // the page language comes from the renderer, it is not an editor setting
  propFilter: (prop: { name: string }) => prop.name !== 'language'
};

// docgen's default options plus baseUrl, so bare imports like 'types' resolve
// (otherwise props typed with an imported type come back empty). Not strict:
// with strictNullChecks optional props become `string | undefined` and show
// up in the editor as an "Undefined / String" picker.
const docgen = withCompilerOptions(
  {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.Latest,
    baseUrl: fileURLToPath(new URL('./src', import.meta.url))
  },
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
