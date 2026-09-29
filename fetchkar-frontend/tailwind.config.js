/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F8F6FA', // Calm, very light royal purple tint
        foreground: '#1E1B4B', // Deep indigo text
        sidebar: '#2E1065', // Deep royal purple sidebar
        'sidebar-border': '#4C1D95',
        border: '#EDE9FE', // Light purple borders
        muted: '#F5F3FF', // Very light purple for muted areas
        'muted-foreground': '#6D28D9', // Medium violet for secondary text
        card: '#FFFFFF', // Pure white cards
        accent: 'var(--agency-color, #7C3AED)', // Royal Violet primary buttons
        'accent-hover': 'var(--agency-color-hover, #6D28D9)',
        'accent-foreground': '#FFFFFF',
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6'
        }
      },
      boxShadow: {
        'card': '0 4px 24px -6px rgba(124, 58, 237, 0.08), 0 2px 8px -2px rgba(124, 58, 237, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)', 
        'card-hover': '0 20px 40px -8px rgba(124, 58, 237, 0.15), 0 8px 16px -4px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'sm': '0 2px 4px rgba(124, 58, 237, 0.04)',
        'glow': '0 0 20px rgba(124, 58, 237, 0.4)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
      }
    },
  },
  plugins: [],
}
