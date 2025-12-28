import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const inputId = id || props.name;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-text-secondary mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={twMerge(
                        clsx(
                            "block w-full rounded-md border-text-tertiary/20 bg-surface-hover px-3 py-2 text-text-primary shadow-sm focus:border-primary focus:ring-primary sm:text-sm",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            className
                        )
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
