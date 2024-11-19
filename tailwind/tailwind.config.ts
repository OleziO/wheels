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
      screens: {
        'sm-height': { raw: '(max-width: 1379px)' }
      },
      spacing: {
        12.5: '50px',
        19: '76px',
        22: '88px',
        25: '100px'
      },
      borderRadius: {
        12.5: '50px',
        25: '100px'
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
