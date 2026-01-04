import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
    LayoutDashboard,
    MessageSquare,
    Book,
    Flower2,
    Bookmark,
    Users,
    Settings,
    User,
    ShieldAlert
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging if needed, or just use template literals
function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

interface SidebarProps {
    isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const location = useLocation();
    const { user } = useAuth(); // Assuming useAuth provides a user object with a 'role' property

    const isActive = (path: string) => location.pathname === path;

    // Icons mapped to lucide-react
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
        { icon: Book, label: 'Scriptures', path: '/scriptures' },
        { icon: Flower2, label: 'Meditations', path: '/meditations' },
        { icon: Bookmark, label: 'Bookmarks', path: '/bookmarks' },
        { icon: Users, label: 'Discussions', path: '/discussions' },
    ];

    // Logic to show Admin only if role is admin.
    // Note: user.role might not be populated in all auth implementations. 
    // We'll treat it as optional or default to 'user'.
    const adminItems = user?.role === 'admin'
        ? [{ icon: ShieldAlert, label: 'Admin', path: '/admin' }]
        : [];

    const userItems = [
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside
            className={cn(
                "fixed lg:relative inset-y-0 left-0 z-20 w-64 bg-surface shadow-xl border-r border-text-tertiary/10 transform transition-transform duration-200 ease-in-out lg:translate-x-0 h-screen overflow-y-auto flex flex-col",
                !isOpen && "lg:w-20" // Collapsed state for desktop
            )}
        >
            {/* Logo Area (Desktop Collapsed/Expanded logic) */}
            <div className={cn("h-16 flex items-center px-6 border-b border-text-tertiary/10", !isOpen && "justify-center px-0")}>
                <span className="text-xl font-display font-bold text-primary truncate">
                    {isOpen ? 'Vidwaan' : 'V'}
                </span>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-8">
                <div className="space-y-1">
                    {isOpen && <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Menu</p>}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
                                    isActive(item.path)
                                        ? "bg-primary/10 text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-primary",
                                    !isOpen && "justify-center"
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className={cn("h-5 w-5 flex-shrink-0", isActive(item.path) && "text-primary")} />
                                {isOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        )
                    })}
                </div>

                {adminItems.length > 0 && (
                    <div className="space-y-1">
                        {isOpen && <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Administration</p>}
                        {adminItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
                                        isActive(item.path)
                                            ? "bg-primary/10 text-primary"
                                            : "text-text-secondary hover:bg-surface-hover hover:text-primary",
                                        !isOpen && "justify-center"
                                    )}
                                    title={!isOpen ? item.label : undefined}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    {isOpen && <span className="font-medium">{item.label}</span>}
                                </Link>
                            )
                        })}
                    </div>
                )}

                <div className="space-y-1">
                    {isOpen && <p className="px-3 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">Account</p>}
                    {userItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors group",
                                    isActive(item.path)
                                        ? "bg-primary/10 text-primary"
                                        : "text-text-secondary hover:bg-surface-hover hover:text-primary",
                                    !isOpen && "justify-center"
                                )}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon className="h-5 w-5 flex-shrink-0" />
                                {isOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Optional Helper / Footer Area */}
            {isOpen && (
                <div className="p-4 border-t border-text-tertiary/10">
                    <div className="rounded-lg bg-surface-hover p-4">
                        <p className="text-xs text-text-secondary text-center">
                            "Wisdom is the greatest wealth."
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
};
