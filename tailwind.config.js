/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'serif'],
        sans: ['"Times New Roman"', 'Times', 'serif'],
        mono: ['"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        paper: '#faf9f6',
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        brand: {
          orange: '#f97316',
          dark: '#1c1917',
          muted: '#78716c',
        }
      }
    },
  },
  plugins: [],
}
