/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        rain: {
          mist: '#E8EEF2',
          light: '#B8C5D6',
          medium: '#8B9DC3',
          deep: '#5B7399',
          dark: '#3D5A80',
          night: '#293241',
        },
        emotion: {
          nostalgia: '#9B8B7E',
          peaceful: '#A8DADC',
          melancholy: '#7B68A2',
          romantic: '#E5B4B4',
        }
      },
      fontFamily: {
        serif: ['Noto Serif KR', 'serif'],
      },
      animation: {
        'rain-drop': 'rainDrop 3s linear infinite',
        'ripple': 'ripple 2s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'gentle-pulse': 'gentlePulse 2s ease-in-out infinite',
      },
      keyframes: {
        rainDrop: {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '0',
          },
          '10%': {
            opacity: '0.5',
          },
          '90%': {
            opacity: '0.5',
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
        },
        ripple: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        gentlePulse: {
          '0%, 100%': {
            opacity: '0.7',
          },
          '50%': {
            opacity: '1',
          },
        },
      },
      screens: {
        'mobile': '390px',
      },
    },
  },
  plugins: [],
};