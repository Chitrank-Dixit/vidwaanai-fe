import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../api/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await authAPI.forgotPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send reset email');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12 dark:bg-indigo-dark sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
            <div className="relative w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl border-l-4 border-l-saffron border-t border-r border-b border-silver dark:bg-indigo dark:border-purple-dark dark:border-l-gold z-10">
                <div className="text-center">
                    <Link to="/auth/login" className="text-saffron hover:text-saffron-dark text-sm font-medium mb-4 inline-block">
                        ← Back to Login
                    </Link>
                    <h2 className="text-2xl font-display font-bold tracking-tight text-saffron dark:text-gold">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-charcoal/80 dark:text-gray-300">
                        {success
                            ? 'Check your email for reset instructions'
                            : 'Enter your email to receive a password reset link'}
                    </p>
                </div>

                {!success ? (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">{error}</div>}

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-6 animate-fade-in">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <span className="text-green-600 text-xl">✓</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-charcoal dark:text-gray-200">
                                We've sent a password reset link to <strong className="text-saffron">{email}</strong>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Check your email and follow the instructions.</p>
                        </div>

                        <Link to="/auth/login" className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-saffron hover:bg-saffron-dark focus:outline-none transition-colors">
                            Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};
