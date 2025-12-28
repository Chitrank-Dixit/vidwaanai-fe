import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background text-text-primary">
            {/* Sidebar (Desktop) */}
            <div className="hidden lg:block relative z-20">
                <Sidebar isOpen={sidebarOpen} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                    onMobileMenuToggle={() => setMobileMenuOpen(true)}
                />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
                    <div className="max-w-7xl mx-auto h-full">
                        {children}
                    </div>
                </main>
            </div>

            {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}
        </div>
    );
};
