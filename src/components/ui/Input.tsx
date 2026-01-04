import React, { useId } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    icon,
    error,
    label,
    className,
    id: providedId,
    ...props
}, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-text-secondary">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={clsx(
                        'w-full bg-surface border border-text-tertiary/20 rounded-lg',
                        'text-text-primary placeholder-text-tertiary/60',
                        'px-4 py-2.5 focus:outline-none focus:border-primary',
                        'focus:ring-2 focus:ring-primary/20 transition-all duration-200',
                        icon && 'pl-10',
                        error && 'border-error focus:border-error focus:ring-error/20',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && <span className="text-error text-sm">{error}</span>}
        </div>
    );
});
Input.displayName = 'Input';
