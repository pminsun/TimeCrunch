import type { Config } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        WantedSans: ['WantedSans'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: any) {
      const newCssUtilities = {
        '.realmobile_screen': { height: 'calc(var(--vh, 1vh) * 100)' },
        '.absolute_xHalf': {
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        },
        '.absolute_yHalf': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
        '.absolute_center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.absolute_fullPage': {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          width: '100%',
          height: '100%',
        },
        '.flex_vertical_center': {
          display: 'flex',
          alignItems: 'center',
        },
        '.flex_horizontal_center': {
          display: 'flex',
          justifyContent: 'center',
        },
        '.flex_center': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.flex_xBetween': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      };
      const colorUtilities = {
        '.colorBg': {
          backgroundColor: '#FFFCF8',
        },
        '.thick_border': {
          border: '2px solid #2D2D2D',
        },
        '.thick_gray_border': {
          border: '2px solid #3D3D3D',
        },
        '.thick_lightGray_border': {
          border: '2px solid #B1AEAB',
        },
      };
      addUtilities(newCssUtilities, ['responsive', 'hover']);
      addUtilities(colorUtilities, ['responsive', 'hover']);
    }),
  ],
};
export default config;
