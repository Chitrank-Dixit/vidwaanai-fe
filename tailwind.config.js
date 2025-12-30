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
                // BharatGPT Theme (Dynamic via CSS Variables)
                background: 'var(--color-background)',
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    hover: 'var(--color-surface-hover)',
                    active: 'var(--color-surface-active)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    tertiary: 'var(--color-text-tertiary)',
                    inverse: 'var(--color-text-inverse)',
                },
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    dark: 'var(--color-primary-dark)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    dark: 'var(--color-secondary-dark)',
                },
                accent: 'var(--color-accent)',

                // Functional
                success: 'var(--color-success)',
                error: 'var(--color-error)',
                warning: 'var(--color-warning)',
                info: 'var(--color-info)',
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

