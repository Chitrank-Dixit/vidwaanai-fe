import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const registerSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
    const [error, setError] = useState<string | null>(null);
    const { register: registerUser, isLoading } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormValues) => {
        setError(null);
        try {
            // map form values to API expectation
            await registerUser({
                email: data.email,
                password: data.password,
                fullName: data.fullName,
                preferredLanguage: 'en'
            });
            // On success, redirect to chat (or login if email verification needed, but simpler for now)
            navigate('/chat');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
            console.error(err);
        }
    };

    return (
        <div className="relative w-full max-w-md space-y-8 rounded-xl bg-surface p-8 shadow-2xl border-l-4 border-l-primary border-t border-r border-b border-gray-100 dark:border-gray-800 z-10 transition-transform hover:-translate-y-1 duration-300">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-bold tracking-tight text-primary">
                    Join Vidwaan AI
                </h2>
                <p className="mt-2 text-sm text-text-secondary font-body">
                    Start your spiritual journey today.
                </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <Input
                        label="Full Name"
                        type="text"
                        autoComplete="name"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                    />

                    <Input
                        label="Email address"
                        type="email"
                        autoComplete="email"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label="Password"
                        type="password"
                        autoComplete="new-password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        error={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                    />
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign up
                </Button>

                <div className="text-center text-sm">
                    <span className="text-text-secondary">Already have an account? </span>
                    <Link to="/auth/login" className="font-semibold text-primary hover:text-primary-hover transition-colors">
                        Sign in
                    </Link>
                </div>
            </form>
        </div>
    );
};
