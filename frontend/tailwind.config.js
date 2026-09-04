/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
        },
        nexus: {
          bg: '#0a0d14',
          card: '#111726',
          border: '#1e293b',
          accent: '#3b82f6',
          glow: '#60a5fa',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-particle': 'flow 2s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateX(0%)', opacity: '0.2' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0.2' },
        }
      }
    },
  },
  plugins: [],
}
