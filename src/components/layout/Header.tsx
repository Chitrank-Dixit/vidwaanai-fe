import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { UserDropdown } from './UserDropdown';
import { Menu, Bell } from 'lucide-react';

import { ThemeToggle } from '../ui/ThemeToggle';

interface HeaderProps {
    onMenuToggle: () => void;
    onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle: _onMenuToggle, onMobileMenuToggle }) => {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-surface border-b border-text-tertiary/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-text-primary hover:bg-surface-hover rounded-md"
                    onClick={onMobileMenuToggle}
                >
                    <Menu className="h-6 w-6" />
                </button>

                {/* Desktop Collapse Toggle (Removed) */}

                <div className="flex items-center gap-2">
                    <span className="text-xl font-display font-bold text-primary">🕉️ Vidwaan</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />
                <button className="p-2 text-text-primary hover:bg-surface-hover rounded-full transition-colors relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <UserDropdown user={user} />
            </div>
        </header>
    );
};
