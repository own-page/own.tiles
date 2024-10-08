export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translate(-50%, 0)' },
          '100%': { transform: 'translate(-50%, -50%)' }
        },
        slideUp: {
          '0%': { transform: 'translate(-50%, -50%)' },
          '100%': { transform: 'translate(-50%, 0)' }
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
