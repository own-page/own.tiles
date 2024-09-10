import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), dts(), tsconfigPaths()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'own.tiles',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es']
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        globals: {
          react: 'React'
        },
        assetFileNames: (assetInfo) => {
          return assetInfo.name === 'style.css'
            ? 'style.css'
            : assetInfo.name || 'unknown';
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  }
});
