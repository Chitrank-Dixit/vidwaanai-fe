export const BORDERS = {
    radius: {
        sm: '6px',
        md: '10px',
        lg: '12px',
        full: '9999px',
    },
    width: {
        1: '1px',
        2: '2px',
    },
};

export const BREAKPOINTS = {
    xs: '0px',      // mobile
    sm: '640px',    // tablet
    md: '768px',    // small laptop
    lg: '1024px',   // desktop
    xl: '1280px',   // large desktop
    '2xl': '1536px', // ultra-wide
};

export const MEDIA = {
    mobile: `@media (max-width: ${BREAKPOINTS.sm})`,
    tablet: `@media (min-width: ${BREAKPOINTS.sm}) and (max-width: ${BREAKPOINTS.md})`,
    desktop: `@media (min-width: ${BREAKPOINTS.md})`,
};
