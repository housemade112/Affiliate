/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#050811',
        slate: {
          950: '#050811',
          900: '#090D16',
          850: '#0F1524',
          800: '#161F33',
          700: '#1E293B',
          600: '#334155',
        },
        gold: {
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
        },
        violet: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        }
      },
      fontFamily: { 
        display: ['Calistoga', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(245, 158, 11, 0.3)',
        'glow-gold-lg': '0 0 50px rgba(245, 158, 11, 0.45)',
        'glow-violet': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glass-card': '0 12px 40px 0 rgba(0, 0, 0, 0.45)',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        'pill': '999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        pulseGlow: { '0%, 100%': { opacity: '0.4' }, '50%': { opacity: '0.8' } },
      },
    },
  },
  plugins: [],
}
