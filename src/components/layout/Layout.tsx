import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export const Layout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-cream font-body">
            {/* Sidebar */}
            <aside className="w-64 border-r border-silver bg-cream text-charcoal hidden md:flex flex-col shadow-none z-20">
                <div className="p-6 border-b border-silver flex flex-col gap-2">
                    <h1 className="text-xl font-display font-bold text-saffron flex items-center gap-2">
                        <Sparkles className="h-6 w-6" /> VIDWAAN
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-1 font-body">
                    {/* Navigation Items */}
                    <div className="px-4 py-3 rounded-lg bg-saffron text-white shadow-sm cursor-pointer font-semibold flex items-center gap-3 transition-all border-l-4 border-gold">
                        <span>🏠</span> Home
                    </div>
                    <div className="px-4 py-3 rounded-lg hover:bg-saffron/10 text-charcoal cursor-pointer transition-colors font-medium flex items-center gap-3">
                        <span className="opacity-70">📚</span> Scriptures
                    </div>
                    <div className="px-4 py-3 rounded-lg hover:bg-saffron/10 text-charcoal cursor-pointer transition-colors font-medium flex items-center gap-3">
                        <span className="opacity-70">🧘</span> Meditations
                    </div>
                    <div className="mt-4 pt-4 border-t border-silver/50">
                        <div className="px-4 py-3 rounded-lg hover:bg-saffron/10 text-charcoal cursor-pointer transition-colors font-medium flex items-center gap-3">
                            <span className="opacity-70">⭐</span> Bookmarks
                        </div>
                        <div className="px-4 py-3 rounded-lg hover:bg-saffron/10 text-charcoal cursor-pointer transition-colors font-medium flex items-center gap-3">
                            <span className="opacity-70">💬</span> Discussions
                        </div>
                        <div className="px-4 py-3 rounded-lg hover:bg-saffron/10 text-charcoal cursor-pointer transition-colors font-medium flex items-center gap-3">
                            <span className="opacity-70">⚙️</span> Settings
                        </div>
                    </div>
                </nav>
            </aside>

            <div className="flex flex-1 flex-col bg-cream">
                <header className="flex h-16 items-center justify-between border-b border-silver bg-cream px-6 shadow-none z-10">
                    <div className="md:hidden text-saffron font-bold font-display text-xl">VIDWAAN AI</div>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer group">
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-petal ring-2 ring-cream"></span>
                            <span className="text-xl text-charcoal group-hover:text-saffron transition-colors">🔔</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-saffron text-saffron-dark hover:bg-saffron hover:text-white transition-all">
                            Logout
                        </Button>
                    </div>
                </header>
                <main className="flex-1 overflow-hidden bg-cream relative">
                    {/* Background Pattern Hint */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                    <div className="h-full w-full overflow-y-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
