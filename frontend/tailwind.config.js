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
        },
        fontSize: {
            'max-1': 'max(1vw, 13px)',
            'max-2': 'max(4.5vw, 22px)',
            'max-3': 'max(1.4vw, 16px)'
        },
        transitionDuration: {
            '2000': '2000ms',
        },
      },
    },
    plugins: [],
  }