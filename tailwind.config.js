/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors
                cream: {
                    DEFAULT: '#F9F7F3', // Soft Cream - Main BG
                    light: '#FAF8F5',   // Lighter Cream - Alt BG
                },
                saffron: {
                    DEFAULT: '#D4A017', // Deep Saffron - Primary Action
                    light: '#E8B83B',   // Light Saffron
                    dark: '#B8900F',    // Dark Saffron
                },
                gold: {
                    DEFAULT: '#FFD700', // Sacred Gold - Accents
                    dark: '#E8B800',
                },
                purple: {
                    DEFAULT: '#5D4E8F', // Vedic Purple - Secondary
                    light: '#6F5FA3',
                    dark: '#4A3D6B',
                },
                indigo: {
                    DEFAULT: '#1B3166', // Deep Indigo - Dark Mode BG
                    light: '#2C3D5E',
                    dark: '#0F1A3C',
                },
                // Neutrals
                white: '#FFFFFF',     // Divine White - Cards
                charcoal: '#2C2C2C',  // Charcoal Dark - Text
                silver: '#E0E0E0',    // Silver Gray - Borders

                // Secondary Colors
                lotus: '#F1B2D0',
                emerald: '#4B9B5A',
                sky: '#4A9ED8',
                earth: '#6B4C3A',
                petal: '#9B1B30',
            },
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                heading: ['"Poppins"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
                serif: ['"Cormorant Garamond"', 'serif'],
            },
            animation: {
                'pulse-ring': 'pulse-ring 1.5s infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
        },
    },
    plugins: [],
}
