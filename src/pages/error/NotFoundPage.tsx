import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cream dark:bg-indigo-dark px-4 text-center">
            <FileQuestion className="h-20 w-20 text-saffron mb-6" />
            <h1 className="text-5xl font-display font-bold text-charcoal dark:text-white mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Page Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/dashboard">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
};
