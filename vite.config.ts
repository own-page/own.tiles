import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default defineConfig({
  plugins: [
    {
      name: 'generate-props-info',
      async buildStart() {
        console.log('Generating props info...');
        try {
          await execAsync('npm run generate-props-info');
          console.log('Props info generated successfully.');
        } catch (error) {
          console.error('Error generating props info:', error);
        }
      }
    },
    react(),
    dts(),
    tsconfigPaths()
  ],
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
