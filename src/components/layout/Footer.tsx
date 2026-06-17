import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="relative h-[136px] bg-background flex items-center justify-center text-text-secondary dark:text-text-secondary text-sm flex-shrink-0 overflow-hidden">
            <div className="relative z-10 text-center font-medium">
                <p>© 2024 Vidwaan AI. Preserving Knowledge.</p>
            </div>
        </footer>
    );
};

export default Footer;
