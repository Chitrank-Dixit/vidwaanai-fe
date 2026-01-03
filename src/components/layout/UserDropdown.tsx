import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import {
    LayoutDashboard,
    MessageSquare,
    Book,
    Flower2,
    Bookmark,
    Users,
    Settings,
    User as UserIcon,
    ShieldAlert
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
        { icon: Book, label: 'Scriptures', path: '/scriptures' },
        { icon: Flower2, label: 'Meditations', path: '/meditations' },
        { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
        { icon: Users, label: 'Discussions', path: '/discussions' },
    ];

    const adminItems = user?.role === 'admin'
        ? [{ icon: ShieldAlert, label: 'Admin', path: '/admin' }]
        : [];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
                <span className="hidden md:block font-medium">{user?.fullName}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface rounded-md shadow-lg py-1 z-50 border border-text-tertiary/10 ring-1 ring-black ring-opacity-5 max-h-[80vh] overflow-y-auto">
                    <div className="px-4 py-2 border-b border-text-tertiary/10">
                        <p className="text-sm font-medium text-text-primary truncate">{user?.fullName}</p>
                        <p className="text-xs text-text-tertiary truncate">{user?.email}</p>
                    </div>

                    <div className="py-1">
                        <p className="px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider my-1">Menu</p>
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </div>

                    {adminItems.length > 0 && (
                        <div className="py-1 border-t border-text-tertiary/10">
                            <p className="px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider my-1">Admin</p>
                            {adminItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </div>
                    )}

                    <div className="py-1 border-t border-text-tertiary/10">
                        <p className="px-4 text-xs font-semibold text-text-tertiary uppercase tracking-wider my-1">Account</p>
                        <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <UserIcon className="h-4 w-4" />
                            Profile
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-surface-hover hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </div>

                    <div className="border-t border-text-tertiary/10 my-1"></div>
                    <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10"
                    >
                        🚪 Logout
                    </button>
                </div>
            )}
        </div>
    );
};
