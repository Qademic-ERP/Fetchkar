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
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F0F3F9', 
        foreground: '#374151',
        sidebar: '#FFFFFF', 
        'sidebar-border': '#E5E7EB',
        border: '#E5E7EB', 
        muted: '#F9FAFB', 
        'muted-foreground': '#9CA3AF', 
        card: '#FFFFFF', 
        accent: 'var(--agency-color, #38BDF8)', // Light blue pastel
        'accent-hover': 'var(--agency-color-hover, #0EA5E9)',
        'accent-foreground': '#FFFFFF',
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        status: {
          success: '#34D399',
          warning: '#FBBF24',
          danger: '#FB7185',
          info: '#38BDF8'
        }
      },
      boxShadow: {
        'card': '8px 8px 16px rgba(163, 177, 198, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)', 
        'card-hover': '12px 12px 20px rgba(163, 177, 198, 0.4), -12px -12px 20px rgba(255, 255, 255, 1)',
        'sm': '4px 4px 8px rgba(163, 177, 198, 0.2), -4px -4px 8px rgba(255, 255, 255, 0.6)',
        'glow': '0 0 20px rgba(56, 189, 248, 0.4)',
        'clay': '8px 8px 16px rgba(163,177,198,0.4), -8px -8px 16px rgba(255,255,255,0.9), inset -4px -4px 8px rgba(163,177,198,0.2), inset 4px 4px 8px rgba(255,255,255,0.6)',
        'clay-active': 'inset 6px 6px 12px rgba(163,177,198,0.4), inset -6px -6px 12px rgba(255,255,255,0.9)',
        'clay-btn': '6px 6px 12px rgba(163,177,198,0.5), -6px -6px 12px rgba(255,255,255,0.9), inset -4px -4px 8px rgba(0,0,0,0.05), inset 4px 4px 8px rgba(255,255,255,0.6)',
        'clay-btn-active': 'inset 4px 4px 8px rgba(0,0,0,0.1), inset -4px -4px 8px rgba(255,255,255,0.6)',
        'clay-input': 'inset 4px 4px 8px rgba(163,177,198,0.3), inset -4px -4px 8px rgba(255,255,255,0.8)'
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
        'pastel-gradient': 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      }
    },
  },
  plugins: [],
}
