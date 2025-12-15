import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-900 sm:px-6 lg:px-8">
            <LoginForm />
        </div>
    );
};
