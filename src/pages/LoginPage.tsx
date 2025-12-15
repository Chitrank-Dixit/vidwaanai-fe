import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12 dark:bg-indigo-dark sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
            <div className="absolute top-0 right-0 p-10 opacity-10">
                <svg width="200" height="200" viewBox="0 0 100 100" className="text-saffron fill-current animate-spin-slow">
                    {/* Placeholder for Mandala */}
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M50 10 Q70 30 50 50 Q30 30 50 10" stroke="currentColor" fill="none" />
                    <path d="M50 90 Q70 70 50 50 Q30 70 50 90" stroke="currentColor" fill="none" />
                </svg>
            </div>
            <LoginForm />
        </div>
    );
};
