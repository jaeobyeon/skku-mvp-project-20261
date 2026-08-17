/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'Noto Sans KR', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f7f8fa',
          100: '#eef1f5',
          200: '#e2e7ee',
          300: '#cdd5e0',
          400: '#9aa6b6',
          500: '#6b7889',
          600: '#4c5867',
          700: '#36404d',
          800: '#222a35',
          900: '#141a22',
        },
        navy: {
          50: '#eef2f8',
          100: '#d8e0ee',
          200: '#b3c2dc',
          300: '#8599c2',
          400: '#5a72a3',
          500: '#3e5586',
          600: '#2f4170',
          700: '#263359',
          800: '#1d2845',
          900: '#161e34',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,26,34,0.04), 0 8px 24px -12px rgba(20,26,34,0.12)',
        lift: '0 4px 12px -2px rgba(20,26,34,0.08), 0 20px 40px -16px rgba(20,26,34,0.18)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'scale-in': 'scale-in 0.35s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
        'spin-slow': 'spin-slow 1s linear infinite',
        'pulse-soft': 'pulse-soft 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
