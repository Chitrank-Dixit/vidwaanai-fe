import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const UnauthorizedPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cream dark:bg-indigo-dark px-4 text-center">
            <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
            <h1 className="text-5xl font-display font-bold text-charcoal dark:text-white mb-2">403</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Access Denied</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                You don't have permission to view this page. If you believe this is an error, please contact support.
            </p>
            <Link to="/dashboard">
                <Button>Back to Dashboard</Button>
            </Link>
        </div>
    );
};
