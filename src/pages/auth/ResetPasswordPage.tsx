import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/auth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export const ResetPasswordPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await authAPI.resetPassword(token!, newPassword);
            setSuccess(true);

            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-text-primary sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
            <div className="relative w-full max-w-md space-y-8 rounded-xl bg-surface p-8 shadow-2xl border-l-4 border-l-primary border-t border-r border-b border-text-tertiary/10 z-10">
                <div className="text-center">
                    <h2 className="text-2xl font-display font-bold tracking-tight text-primary">
                        Create New Password
                    </h2>
                    <p className="mt-2 text-sm text-text-secondary">
                        Enter your new password below
                    </p>
                </div>

                {!success ? (
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                            <p className="text-xs text-text-tertiary">At least 8 characters</p>

                            <Input
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && <div className="rounded-md bg-red-500/10 p-4 text-sm text-red-500">{error}</div>}

                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                            <span className="text-green-500 text-xl">✓</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-lg font-medium text-text-primary">Password successfully reset!</p>
                            <p className="text-sm text-muted text-text-tertiary">Redirecting to login page...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
