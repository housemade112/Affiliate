/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: { 850: '#1e293b', 900: '#0f172a', 950: '#020617' },
        violet: { 400: '#a78bfa', 500: '#8b5cf6', 550: '#7c3aed', 600: '#6d28d9' },
        rose: { 400: '#fb7185', 500: '#f43f5e', 550: '#e11d48' },
        amber: { 400: '#fbbf24', 500: '#f59e0b' },
        teal: { 400: '#2dd4bf', 500: '#14b8a6' },
      },
      fontFamily: { 
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
