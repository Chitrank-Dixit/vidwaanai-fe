import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/auth';
import { Button } from '@/components/common/Button';

export const EmailVerificationPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [error, setError] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Get email from localStorage implicitly or just send token if API supports it
                // The user snippet uses `emailFromStorage` but API authAPI.verifyEmail signature requires email.
                const emailFromStorage = localStorage.getItem('verificationEmail') || '';

                await authAPI.verifyEmail(emailFromStorage, token!);
                setStatus('success');

                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
            } catch (err: any) {
                setError(err.response?.data?.error || 'Email verification failed');
                setStatus('error');
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setError("Invalid verification link");
            setStatus('error');
        }
    }, [token, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 dark:bg-indigo-dark">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl border border-silver dark:bg-indigo dark:border-purple-dark text-center">

                {status === 'verifying' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin h-10 w-10 border-4 border-saffron border-t-transparent rounded-full"></div>
                        <p className="text-lg text-charcoal dark:text-gray-200">Verifying your email...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <span className="text-green-600 text-2xl">✓</span>
                        </div>
                        <h2 className="text-2xl font-bold text-charcoal dark:text-white">Email Verified!</h2>
                        <p className="text-gray-500 dark:text-gray-400">Redirecting to login page...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <span className="text-red-600 text-2xl">✕</span>
                        </div>
                        <h2 className="text-2xl font-bold text-charcoal dark:text-white">Verification Failed</h2>
                        <p className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">{error}</p>
                        <Button onClick={() => navigate('/auth/login')} className="w-full">
                            Back to Login
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
