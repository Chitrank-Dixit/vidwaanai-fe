import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const { login, isLoading } = useAuth();
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
        try {
            await login(data);
            navigate('/chat');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Invalid email or password');
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
                    Sign in to Vidwaan AI
                </h2>
                <p className="mt-2 text-sm text-text-secondary font-body">
                    Access your spiritual journey.
                    <br />
                    Use <span className="font-semibold text-primary">demo@vidwaan.ai</span> / <span className="font-semibold text-primary">password</span>
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
