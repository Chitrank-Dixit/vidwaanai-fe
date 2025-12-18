import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    {
                        'bg-saffron text-white hover:bg-saffron-light shadow-md hover:shadow-lg hover:-translate-y-0.5': variant === 'primary',
                        'bg-white text-saffron-dark border border-silver hover:border-saffron hover:bg-cream-light shadow-sm hover:translate-y-[-2px]': variant === 'secondary',
                        'border-2 border-gold text-saffron-dark bg-transparent hover:bg-gold/10 hover:border-saffron-light': variant === 'outline',
                        'hover:bg-cream text-charcoal': variant === 'ghost',
                        'bg-petal text-white hover:bg-red-800 shadow-sm': variant === 'danger',
                        'h-9 px-3 text-sm': size === 'sm',
                        'h-10 px-4 py-2': size === 'md',
                        'h-12 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';
