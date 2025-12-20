import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface UserDropdownProps {
    user: any;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login');
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center space-x-2 text-charcoal hover:text-saffron transition-colors focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="h-8 w-8 rounded-full bg-saffron/10 flex items-center justify-center text-saffron border border-saffron/20">
                    {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden md:block font-medium">{user?.fullName}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-indigo-dark rounded-md shadow-lg py-1 z-50 border border-gray-100 dark:border-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.fullName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-cream dark:hover:bg-indigo hover:text-saffron"
                        onClick={() => setIsOpen(false)}
                    >
                        👤 Profile
                    </Link>
                    <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-cream dark:hover:bg-indigo hover:text-saffron"
                        onClick={() => setIsOpen(false)}
                    >
                        ⚙️ Settings
                    </Link>
                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                    <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                        🚪 Logout
                    </button>
                </div>
            )}
        </div>
    );
};
