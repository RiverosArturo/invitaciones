// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'inner-xl': 'inset 0 0 25px rgba(0, 0, 0, 0.2)', // Ajusta los valores según el efecto deseado
        // 'inner-xl': 'inset 0 0 15px rgba(0, 0, 0, 0.1)', // Si quieres el valor exacto que tenías
      },
      colors: {
        background: '#F8F6F4',
        primary: '#D8A7B1',
        secondary: '#C1A36D',
        neutral: '#4A4A4A',
        dark: '#222222',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '12px',
        lg: '20px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
export default config
