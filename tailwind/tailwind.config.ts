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
        12.5: '50px',
        19: '76px',
        25: '100px'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans', 'sans-serif'],
        unbounded: ['Unbounded', 'sans', 'sans-serif']
      }
    }
  },
  plugins: []
} satisfies Config
