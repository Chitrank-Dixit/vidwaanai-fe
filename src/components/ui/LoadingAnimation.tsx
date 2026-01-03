import React from 'react';

export const LoadingPulse: React.FC = () => (
    <div className="flex gap-1.5 items-center justify-center">
        {[0, 1, 2].map((i) => (
            <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{
                    animationDelay: `${i * 0.15}s`,
                }}
            />
        ))}
    </div>
);

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className={`
      ${sizeClasses[size]}
      border-surface-hover border-t-primary 
      rounded-full animate-spin
    `} />
    );
};
