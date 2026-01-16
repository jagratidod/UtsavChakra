/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#8B0000', // Deep Red
                    light: '#FF9933',   // Saffron (using as light/accent)
                    dark: '#600000',    // Darker Red
                },
                brand: {
                    red: '#8B0000',
                    saffron: '#FF9933',
                    gold: '#FFD700',
                }
            },
            fontFamily: {
                script: ['"Dancing Script"', 'cursive'],
            },
            animation: {
                'fade-in-down': 'fadeInDown 0.8s ease-out',
            },
            keyframes: {
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
