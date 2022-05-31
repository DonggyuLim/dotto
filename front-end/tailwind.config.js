module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // darkMode: 'class',
  theme: {
    extend: {
      screens: {
        // xl: '1150px',
        '2xl': '1380px',
        // => @media (min-width: 1380px)
      },
      colors: {
        primary: '#66C1BD',
        secondary: '#576272',
      },
      container: {
        center: true,
      },
      animation: {
        'gradient-x': 'gradient-x 5s ease infinite',
        'gradient-y': 'gradient-y 5s ease infinite',
        'gradient-xy': 'gradient-xy 5s ease infinite',
        blob: 'blob 7s infinite',
        flip: 'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'tranlate(0px, 0px) scale(1)',
          },
        },
        flip: {
          from: {
            transform: 'rotateX(0deg)',
            transformOrigin: '50% bottom ',
          },
          to: {
            transform: 'rotateX(180deg)',
            transformOrigin: '50% bottom ',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [require('./src/styles/daisyui-themes.json')],
  // },
};
