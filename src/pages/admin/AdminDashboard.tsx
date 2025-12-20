import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h1 className="text-3xl font-display font-bold leading-tight text-charcoal dark:text-white">
                    Admin Dashboard
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    System administration and management overview.
                </p>
            </div>

            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-8 border border-red-100 dark:border-red-900/30 flex flex-col items-center justify-center text-center">
                <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Restricted Area</h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-lg">
                    This area is for administrative tasks only. Metrics, user management, and content moderation tools will be implemented here.
                </p>
            </div>
        </div>
    );
};
