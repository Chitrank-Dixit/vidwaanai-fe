import React from 'react';
import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
    hover = true,
    className,
    children,
    ...props
}) => (
    <div
        className={clsx(
            'bg-surface border border-text-tertiary/10 rounded-xl p-6',
            hover && 'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300',
            className
        )}
        {...props}
    >
        {children}
    </div>
);
