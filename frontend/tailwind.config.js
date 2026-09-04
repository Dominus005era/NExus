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
        "background": "#131313",
        "surface-dark": "#131314",
        "surface": "#131313",
        "surface-card": "#1E1F20",
        "surface-capsule": "#282A2C",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1b1b1c",
        "surface-container": "#202020",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353535",
        "surface-bright": "#393939",
        "code-surface": "#0F0F10",
        "reasoning-accent": "#A8C7FA",
        "primary-container": "#c2e7ff",
        "on-primary-fixed": "#001e2c",
        "secondary": "#b2c5ff",
        "secondary-container": "#0054cd",
        "secondary-fixed-dim": "#b2c5ff",
        "text-primary": "#E3E3E3",
        "text-secondary": "#C4C7C5",
        "text-muted": "#747775",
        "border-subtle": "rgba(255, 255, 255, 0.08)",
        "border-hover": "rgba(255, 255, 255, 0.16)",
      },
      spacing: {
        "sidebar-collapsed": "4.25rem",
        "sidebar-expanded": "17.5rem",
        "chat-max-width": "50rem",
        "prompt-max-width": "52rem",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
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
