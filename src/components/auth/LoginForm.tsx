import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const isLoading = useAuthStore((state) => state.isLoading);
    const setLoading = useAuthStore((state) => state.setLoading);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        setError(null);
        setLoading(true);
        try {
            await authService.login(data);
            navigate('/chat');
        } catch (err) {
            setError('Invalid email or password');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl border-l-4 border-l-saffron border-t border-r border-b border-silver dark:bg-indigo dark:border-purple-dark dark:border-l-gold z-10 transition-transform hover:-translate-y-1 duration-300">
            <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-saffron/10 mb-4">
                    <span className="text-3xl">🕉️</span>
                </div>
                <h2 className="text-3xl font-display font-bold tracking-tight text-indigo dark:text-gold">
                    Sign in to Vidwaan AI
                </h2>
                <p className="mt-2 text-sm text-charcoal/80 dark:text-gray-300 font-body">
                    Access your spiritual journey.
                    <br />
                    Use <span className="font-semibold text-saffron">demo@vidwaan.ai</span> / <span className="font-semibold text-saffron">password</span>
                </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
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
                        autoComplete="current-password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
                        {error}
                    </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
                    Sign in
                </Button>
            </form>
        </div>
    );
};
