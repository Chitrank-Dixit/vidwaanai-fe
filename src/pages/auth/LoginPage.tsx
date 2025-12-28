import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '@/components/auth/LoginForm';
import { OAuthButtons } from '@/components/auth/OAuthButtons';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="flex min-h-screen bg-background text-text-primary">
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left mb-10">
                        <span className="text-3xl font-display font-bold text-primary block mb-2">🕉️ Vidwaan AI</span>
                        <h2 className="text-3xl font-extrabold text-text-primary">Welcome Back</h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            Login to continue your spiritual journey
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <LoginForm />
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-2 text-text-tertiary">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <OAuthButtons />
                            </div>
                        </div>

                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-text-secondary">
                                Don't have an account?{' '}
                                <Link to="/auth/register" className="font-medium text-primary hover:text-primary-hover transition-colors">
                                    Sign up
                                </Link>
                            </p>
                            <p>
                                <Link to="/auth/forgot-password" className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors">
                                    Forgot password?
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side image/feature list (Desktop) */}
            <div className="hidden lg:block relative w-0 flex-1">
                <div className="absolute inset-0 shadow-lg bg-[url('https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-background/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent flex flex-col justify-end p-20">
                        <h3 className="text-4xl font-display font-bold text-white mb-6">Explore Vedic Wisdom</h3>
                        <ul className="space-y-4 text-white/90 text-lg">
                            <li className="flex items-center gap-3">✨ AI-powered scripture guidance</li>
                            <li className="flex items-center gap-3">🧘 Personalized meditations</li>
                            <li className="flex items-center gap-3">📚 Rich library of texts</li>
                            <li className="flex items-center gap-3">💬 Connect with community</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
