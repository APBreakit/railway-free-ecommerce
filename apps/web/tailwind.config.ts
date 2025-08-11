import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#8B4513',
          secondary: '#A0522D',
          light: '#D2B48C'
        },
        warm: {
          beige: '#F5F5DC',
          cream: '#FDF5E6',
          white: '#FAF0E6'
        },
        neutral: {
          dark: '#654321',
          medium: '#D3C7B8',
          light: '#FAF0E6'
        },
        accent: {
          red: '#B22222'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      borderRadius: {
        brand: '8px',
        card: '12px',
        container: '16px'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          '2xl': '1280px'
        }
      }
    }
  },
  plugins: []
} satisfies Config