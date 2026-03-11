/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A14',
        plasma: '#7B61FF',
        ghost: '#F0EFF4',
        graphite: '#18181B',
        'plasma-dim': '#6550D9',
        'void-light': '#12121E',
        'void-lighter': '#1A1A28',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Instrument Serif', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [],
}
