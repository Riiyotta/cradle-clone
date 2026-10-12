/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { md: '810px', lg: '1200px' },
    extend: {
      colors: {
        ink: '#030712',
        gray: { 950: '#030712', 900: '#111827', 800: '#1f2937', 700: '#374151', 400: '#9ca3af', 300: '#d1d5db', 200: '#e5e7eb', 100: '#f3f4f6', 50: '#f9fafb' },
        muted: '#616e80',
        brand: { DEFAULT: '#224eee', hover: '#1b3ada' },
        accent: '#2d66f8',
        blue: { 400: '#5e95fc', 300: '#92bafe', 200: '#bed5ff', 100: '#dbe7fe', 50: '#eff4ff' },
        antibody: '#3cab57',
        enzyme: '#0ea5e9',
        sky400: '#38bdf8',
        peptide: '#98b62c',
        vaccine: '#9b9265',
        progress: 'rgb(235,145,49)',
      },
      fontFamily: {
        heading: ['"Rethink Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"Spot Mono Medium"', 'monospace'],
        quote: ['"Crimson Pro Regular"', 'serif'],
      },
      maxWidth: { container: '1280px' },
      transitionTimingFunction: { back: 'cubic-bezier(0.7,-0.35,0.3,1.1)' },
    },
  },
  plugins: [],
}
