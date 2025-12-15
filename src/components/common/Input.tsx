import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-medium text-charcoal dark:text-cream">
                        {label}
                    </label>
                )}
                <input
                    className={cn(
                        'flex h-10 w-full rounded-md border border-silver bg-white px-3 py-2 text-sm text-charcoal placeholder:text-gray-400 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-purple-dark dark:bg-indigo-light dark:text-white',
                        error && 'border-petal focus:border-petal focus:ring-petal/20',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);
Input.displayName = 'Input';
