import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/auth/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-cream dark:bg-indigo-dark">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin h-10 w-10 border-4 border-saffron border-t-transparent rounded-full"></div>
                <p className="text-charcoal dark:text-gray-300 font-medium animate-pulse">Loading Vidwaan...</p>
            </div>
        </div>
    );
};
