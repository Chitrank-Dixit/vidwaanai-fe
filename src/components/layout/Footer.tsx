import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="relative h-[136px] bg-[#faf8f5] dark:bg-[#1c1814] flex items-center justify-center text-text-secondary dark:text-text-secondary text-sm flex-shrink-0 overflow-hidden">
            {/* Decorative Background Image */}
            <div className="absolute inset-0 bg-[url('/assets/footer-light.png')] dark:bg-[url('/assets/footer-dark.png')] bg-[length:100%_100%] bg-no-repeat pointer-events-none z-0" />
            
            <div className="relative z-10 text-center font-medium">
                <p>© 2024 Vidwaan AI. Preserving Knowledge.</p>
            </div>
        </footer>
    );
};

export default Footer;
