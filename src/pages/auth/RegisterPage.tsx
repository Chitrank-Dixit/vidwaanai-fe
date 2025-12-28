import React from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { OAuthButtons } from '@/components/auth/OAuthButtons';

export const RegisterPage: React.FC = () => {

    return (
        <div className="flex min-h-screen bg-background text-text-primary">
            {/* Left side image/feature list (Desktop) - Swapped for register */}
            <div className="hidden lg:block relative w-0 flex-1 order-last lg:order-first">
                <div className="absolute inset-0 shadow-lg bg-[url('https://images.unsplash.com/photo-1604881991720-f91dd269aa63?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center">
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-black/30 flex flex-col justify-center p-20">
                        <h3 className="text-4xl font-display font-bold text-white mb-6">Join Our Community</h3>
                        <ul className="space-y-4 text-white/90 text-lg">
                            <li className="flex items-center gap-3">✨ Access exclusive teachings</li>
                            <li className="flex items-center gap-3">🧘 Track your spiritual progress</li>
                            <li className="flex items-center gap-3">📚 Build your scripture collection</li>
                            <li className="flex items-center gap-3">🔔 Get personalized recommendations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-1/2 relative z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center lg:text-left mb-10">
                        <span className="text-3xl font-display font-bold text-primary block mb-2">🕉️ Vidwaan AI</span>
                        <h2 className="text-3xl font-extrabold text-text-primary">Begin Your Journey</h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            Join thousands of seekers on their path
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="mt-6">
                            <RegisterForm />
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-2 text-text-tertiary">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <OAuthButtons />
                            </div>
                        </div>

                        <div className="mt-6 text-center space-y-2">
                            <p className="text-sm text-text-secondary">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="font-medium text-primary hover:text-primary-hover transition-colors">
                                    Sign in
                                </Link>
                            </p>
                            <p className="text-xs text-gray-500 mt-4">
                                By creating an account, you agree to our{' '}
                                <Link to="/terms" className="underline hover:text-gray-900">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="/privacy" className="underline hover:text-gray-900">Privacy Policy</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
