import React from 'react';


export const HeroSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                {children}
            </div>
        </div>
    );
};
