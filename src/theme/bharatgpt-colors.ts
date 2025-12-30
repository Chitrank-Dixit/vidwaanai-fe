export const BHARATGPT_DARK = {
    // Base colors
    background: '#0F0F0F',        // Main page background
    surface: '#1A1A1A',           // Card surfaces
    surfaceHover: '#252525',      // Hover state
    surfaceActive: '#2E2E2E',     // Active state

    // Text colors
    text: {
        primary: '#F5F5F5',         // Main text
        secondary: '#A9A9A9',       // Secondary text
        tertiary: '#6B7280',        // Tertiary text
        inverse: '#0F0F0F',         // On bright backgrounds
    },

    // Brand colors
    primary: '#4DB8C6',           // Teal accent (from design system)
    secondary: '#3B82F6',         // Blue accent (BharatGPT style)
    accent: '#60A5FA',            // Light blue

    // Functional colors
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',

    // Gradients
    gradients: {
        hero: 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%)',
        input: 'linear-gradient(180deg, #1A1A1A 0%, #252525 100%)',
        button: 'linear-gradient(135deg, #4DB8C6 0%, #3B82F6 100%)',
    },

    // Shadows
    shadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 12px rgba(0, 0, 0, 0.4)',
        lg: '0 12px 32px rgba(0, 0, 0, 0.5)',
        xl: '0 20px 48px rgba(0, 0, 0, 0.6)',
    },
};

export const BHARATGPT_LIGHT = {
    // Base colors
    background: '#FFFFFF',        // Pure white
    surface: '#F3F4F6',           // Light gray (Gray 100)
    surfaceHover: '#E5E7EB',      // Gray 200
    surfaceActive: '#D1D5DB',     // Gray 300

    // Text colors
    text: {
        primary: '#111827',         // Gray 900
        secondary: '#4B5563',       // Gray 600
        tertiary: '#9CA3AF',        // Gray 400
        inverse: '#FFFFFF',         // On dark backgrounds
    },

    // Brand colors
    primary: '#0D9488',           // Teal 600 (Darker for contrast)
    secondary: '#2563EB',         // Blue 600
    accent: '#3B82F6',            // Blue 500

    // Functional colors (Keep same or slightly adjusted)
    success: '#059669',           // Green 600
    error: '#DC2626',             // Red 600
    warning: '#D97706',           // Amber 600
    info: '#2563EB',              // Blue 600

    // Gradients
    gradients: {
        hero: 'linear-gradient(135deg, #F3F4F6 0%, #FFFFFF 100%)',
        input: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
        button: 'linear-gradient(135deg, #0D9488 0%, #2563EB 100%)',
    },

    // Shadows (Lighter for light mode)
    shadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
};
