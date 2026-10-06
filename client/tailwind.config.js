/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Winter Mountain Design System
        alpenglow: '#FADADD',
        'glacial-sky': '#C2D6EC',
        'frosty-slate': '#94A9D0',
        'fjord-blue': '#4A6D99',
        'midnight-abyss': '#223354',
        // Semantic
        brand: {
          50: '#F0F5FB',
          100: '#C2D6EC',
          200: '#94A9D0',
          300: '#4A6D99',
          400: '#3A5A82',
          500: '#2C4869',
          600: '#223354',
          700: '#1A2740',
          800: '#121C2E',
          900: '#0A1019',
        },
        accent: '#FADADD',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.15', fontWeight: '700' }],
        'hero-mobile': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      backgroundImage: {
        'winter-gradient': 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 50%, #C2D6EC 100%)',
        'hero-gradient': 'linear-gradient(to bottom, rgba(34,51,84,0.40), rgba(34,51,84,0.75))',
        'card-gradient': 'linear-gradient(145deg, #FFFFFF 0%, #F7FAFC 100%)',
        'btn-gradient': 'linear-gradient(135deg, #4A6D99 0%, #223354 100%)',
      },
      boxShadow: {
        'card': '0 10px 25px -5px rgba(34,51,84,0.08), 0 4px 10px -3px rgba(34,51,84,0.04)',
        'card-hover': '0 20px 40px -8px rgba(34,51,84,0.15), 0 8px 16px -4px rgba(34,51,84,0.08)',
        'btn': '0 4px 14px rgba(74,109,153,0.35)',
        'glass': '0 8px 32px rgba(34,51,84,0.12)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'score-fill': 'scoreFill 1.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scoreFill: {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--dash-offset)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      maxWidth: {
        'container': '1280px',
      },
      borderRadius: {
        'xl2': '20px',
      },
    },
  },
  plugins: [],
}
