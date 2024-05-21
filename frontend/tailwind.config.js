/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage: {
            'background_register': "url('./src/assets/background_img.jpg')",
            'slide': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('./src/assets/slide.jpg')",
        },
        fontSize: {
          'max-1': 'max(1vw, 13px)',
          'max-2': 'max(4.5vw, 22px)',
          'max-3': 'max(1.4vw, 16px)'
        },
        transitionDuration: {
            '2000': '2000ms',
            '3000': '3000ms',
        },
        screens: {
          '2xl': {'max': '1536px'},
          'xl': {'max': '1280px'},
          'lg': {'max': '1024px'},
          'ml': {'max': '820px'},
          'md': {'max': '720px'},
          'mm': {'max': '580px'},
          'sm': {'max': '480px'},
        },
        gridTemplateColumns: {
          '1-1': '1fr 1fr'
        },
        flex: {
          '0': '0 0 100%'
        }
      },
    },
    plugins: [],
  }