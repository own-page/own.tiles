import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { autoProps } from './vite-auto-props';
import { getPropsInfo } from './src/utils/props';

export default defineConfig({
  plugins: [
    autoProps({ getPropsInfo }),
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace('/dist/src/', '/dist/'),
        content
      })
    }),
    tsconfigPaths()
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'own.tiles',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)]
    },
    sourcemap: true,
    emptyOutDir: true
  }
});
