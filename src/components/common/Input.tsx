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
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={twMerge(
                        clsx(
                            "block w-full rounded-md border-silver bg-white px-3 py-2 text-charcoal shadow-sm focus:border-saffron focus:ring-saffron dark:bg-indigo-dark dark:border-gray-600 dark:text-white dark:focus:ring-gold sm:text-sm",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                            className
                        )
                    )}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
