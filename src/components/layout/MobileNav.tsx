import React from 'react';
import { Sidebar } from './Sidebar';

interface MobileNavProps {
    onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
    return (
        <div className="relative z-50 lg:hidden">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 left-0 w-64 bg-surface shadow-2xl transform transition-transform duration-300 ease-in-out translate-x-0">
                {/* Close button inside drawer if needed, or rely on backdrop */}
                {/* We reuse Sidebar but force it open */}
                <div className="h-full">
                    <Sidebar isOpen={true} />
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-text-primary hover:bg-surface-hover rounded-full md:hidden"
                    aria-label="Close menu"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};
