import React from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children?: React.ReactNode;
}

const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    className,
    disabled,
    ...props
}) => {
    return (
        <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover={!disabled && !isLoading ? "hover" : "initial"}
            whileTap={!disabled && !isLoading ? "tap" : "initial"}
            className={clsx(
                'font-medium transition-colors duration-200 rounded-lg flex items-center justify-center gap-2',
                // Variants
                {
                    'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-cyan-500/20':
                        variant === 'primary',
                    'bg-surface-hover text-text-primary hover:bg-surface-active': variant === 'secondary',
                    'border border-text-tertiary text-text-primary hover:bg-surface-hover':
                        variant === 'outline',
                    'text-text-primary hover:bg-surface-hover': variant === 'ghost',
                },
                // Sizes
                {
                    'px-3 py-1.5 text-sm': size === 'sm',
                    'px-4 py-2 text-base': size === 'md',
                    'px-6 py-3 text-lg': size === 'lg',
                },
                // Disabled/Loading
                (disabled || isLoading) && 'opacity-50 cursor-not-allowed pointer-events-none',
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {children}
        </motion.button>
    );
};
