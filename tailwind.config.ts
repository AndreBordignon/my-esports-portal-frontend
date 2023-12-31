import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        '30': '7.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-background': "url('/assets/background/CS2.png')",

      },
      colors: {
        'primary': '#1c0f13',
        'secondary': '#06908f',
        'bg': '#E2E2E2',
        'button': '#0892a5',
        'border': '#C9C9C9'
      }
    },
  },
  plugins: [],
}
export default config
