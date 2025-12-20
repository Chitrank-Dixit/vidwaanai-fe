import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { oauthAPI } from '../../api/oauth';

export const OAuthCallbackPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    //   const { login } = useAuth();
    // The provided code snippet does localStorage.setItem directly.
    // Ideally, useAuthStore should expose a method to 'hydrate' session or 'setSession'.
    // But following the snippet:

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = searchParams.get('code');
                const state = searchParams.get('state');

                if (!code) {
                    throw new Error('No authorization code received');
                }

                // Exchange code for tokens
                const response = await oauthAPI.handleCallback(code, state || '');

                // Store token and user
                localStorage.setItem('accessToken', response.data.accessToken);
                if (response.data.refreshToken) {
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                }

                // IMPORTANT: We need to update the auth store state so the app knows we are logged in.
                // The snippet in user request assumes `checkAuth` or `isAuthenticated` updates automatically or page reload.
                // We should trigger checkAuth if possible.
                // window.location.href = '/dashboard'; // Force reload to pick up tokens is safest given existing simplistic store
                // Or if useAuth exposes checkAuth:
                // await checkAuth(); 

                // For now, doing a force reload via simple navigate is risky if store doesn't listen to storage changes.
                // I will use window.location which re-initializes `useAuthStore` which reads localStorage on init.
                window.location.href = '/dashboard';

            } catch (err: any) {
                setError(err.message || 'OAuth authentication failed');
                setTimeout(() => {
                    navigate('/auth/login');
                }, 3000);
            }
        };

        handleCallback();
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cream dark:bg-indigo-dark">
            <div className="text-center p-8 bg-white dark:bg-indigo rounded-xl shadow-xl max-w-md w-full">
                {!error ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin h-10 w-10 border-4 border-saffron border-t-transparent rounded-full"></div>
                        <p className="text-charcoal dark:text-gray-200">Authenticating with provider...</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <span className="text-red-600 text-xl">✕</span>
                        </div>
                        <p className="text-red-600 font-medium">Authentication Failed</p>
                        <p className="text-sm text-gray-500">{error}</p>
                        <p className="text-xs text-gray-400">Redirecting to login...</p>
                    </div>
                )}
            </div>
        </div>
    );
};
