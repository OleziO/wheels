import type { Config } from 'tailwindcss'
import { colors } from './tailwind.colors'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors,
    extend: {
      spacing: {
        25: '100px',
        12.5: '50px'
      },
      borderRadius: {
        12.5: '50px'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans', 'sans-serif'],
        unbounded: ['Unbounded', 'sans', 'sans-serif']
      },
      fontSize: {
        8: '32px'
      }
    }
  },
  plugins: []
} satisfies Config
