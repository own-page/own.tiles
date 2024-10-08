import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translate(0, 0%)' },
          '100%': { transform: 'translate(0, 50%)' }
        },
        slideUp: {
          '0%': { transform: 'translate(0, 50%)' },
          '100%': { transform: 'translate(0, 0%)' }
        }
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.5s ease-out forwards'
      }
    }
  },
  plugins: []
};
export default config;
