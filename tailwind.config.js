/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode
    theme: {
        extend: {
            colors: {
                // BharatGPT Dark Theme
                background: '#0F0F0F',
                surface: {
                    DEFAULT: '#1A1A1A',
                    hover: '#252525',
                    active: '#2E2E2E',
                },
                text: {
                    primary: '#F5F5F5',
                    secondary: '#A9A9A9',
                    tertiary: '#6B7280',
                    inverse: '#0F0F0F',
                },
                primary: {
                    DEFAULT: '#4DB8C6', // Teal accent
                    dark: '#3A96A3',
                },
                secondary: {
                    DEFAULT: '#3B82F6', // Blue accent
                    dark: '#2563EB',
                },
                accent: '#60A5FA', // Light blue

                // Functional
                success: '#10B981',
                error: '#EF4444',
                warning: '#F59E0B',
                info: '#3B82F6',
            },
            fontFamily: {
                sans: ['"Inter"', 'system-ui', 'sans-serif'], // Primary UI font
                mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'], // Code font
                display: ['"Inter"', 'system-ui', 'sans-serif'], // Headings
            },
            fontSize: {
                'display-1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                'display-2': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
            },
            borderRadius: {
                'sm': '6px',
                'md': '10px',
                'lg': '12px',
            },
            boxShadow: {
                'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
                'md': '0 4px 12px rgba(0, 0, 0, 0.4)',
                'lg': '0 12px 32px rgba(0, 0, 0, 0.5)',
                'xl': '0 20px 48px rgba(0, 0, 0, 0.6)',
                'glow': '0 0 20px rgba(77, 184, 198, 0.3)', // Teal glow
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
            },
        },
    },
    plugins: [],
}

