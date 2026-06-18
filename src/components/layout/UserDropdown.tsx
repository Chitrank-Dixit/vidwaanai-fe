import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    User as UserIcon,
    ShieldAlert,
    LogOut
} from 'lucide-react';

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

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
    ];

    const adminItems = user?.role === 'admin'
        ? [{ icon: ShieldAlert, label: 'Admin', path: '/admin' }]
        : [];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="h-9 w-9 rounded-full bg-surface-hover flex items-center justify-center text-primary ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300 overflow-hidden relative">
                    {user?.fullName ? (
                        <span className="text-sm font-semibold">{user.fullName[0].toUpperCase()}</span>
                    ) : (
                        <UserIcon className="h-5 w-5" />
                    )}
                </div>
                <span className="hidden md:block font-medium text-sm group-hover:text-primary transition-colors">{user?.fullName}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 mt-3 w-64 origin-top-right bg-surface/95 backdrop-blur-xl rounded-xl shadow-2xl py-2 z-50 border border-gray-100 dark:border-white/5 max-h-[85vh] overflow-y-auto overflow-x-hidden"
                    >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5">
                            <p className="text-sm font-semibold text-text-primary truncate">{user?.fullName}</p>
                            <p className="text-xs text-text-secondary truncate mt-0.5">{user?.email}</p>
                        </div>

                        <div className="py-2">
                            <p className="px-4 text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 mt-1">Menu</p>
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 border-l-2 border-transparent hover:border-primary mx-2 rounded-r-md"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>

                        {adminItems.length > 0 && (
                            <div className="py-2 border-t border-gray-100 dark:border-white/5">
                                <p className="px-4 text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 mt-1">Admin</p>
                                {adminItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 border-l-2 border-transparent hover:border-primary mx-2 rounded-r-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        )}

                        <div className="py-2 border-t border-gray-100 dark:border-white/5">
                            <p className="px-4 text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-2 mt-1">Account</p>
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 border-l-2 border-transparent hover:border-primary mx-2 rounded-r-md"
                                onClick={() => setIsOpen(false)}
                            >
                                <UserIcon className="h-4 w-4" />
                                Profile
                            </Link>
                            <Link
                                to="/settings"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-primary/5 hover:text-primary transition-all duration-200 border-l-2 border-transparent hover:border-primary mx-2 rounded-r-md"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </div>

                        <div className="border-t border-gray-100 dark:border-white/5 mt-1 pt-1">
                            <button
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mx-2 rounded-md mb-1"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
