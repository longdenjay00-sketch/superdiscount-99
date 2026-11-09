/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          pink: '#E1306C',
          purple: '#C13584',
          orange: '#F56040',
          yellow: '#FCAF45',
          blue: '#405DE6'
        },
        discount: {
          neon: '#10B981',
          crimson: '#EF4444',
          gold: '#F59E0B',
          dark: '#0F172A',
          card: '#1E293B',
          border: '#334155'
        }
      },
      aspectRatio: {
        square: '1 / 1',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
