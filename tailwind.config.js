/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          accent: '#334155'
        },
        jme: {
          black: '#000000',
          purple: '#8B5CF6',
          cyan: '#22D3EE',
        },
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        gradient: 'gradient 6s ease infinite'
      }
    },
  },
  plugins: [],
};