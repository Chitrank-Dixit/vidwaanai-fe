import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

export const Layout = () => {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen w-full bg-cream dark:bg-indigo-dark font-body">
            {/* Sidebar */}
            <aside className="w-64 border-r border-silver bg-cream-light text-charcoal hidden md:flex flex-col shadow-sm z-20">
                <div className="p-6 border-b border-silver/50">
                    <h1 className="text-2xl font-display font-bold text-saffron flex items-center gap-2">
                        <span>🕉️</span> Vidwaan AI
                    </h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {/* Mock Navigation Items */}
                    <div className="px-4 py-2 rounded-md bg-saffron/10 text-saffron-dark border-r-4 border-r-saffron cursor-pointer font-medium font-body flex items-center gap-2">
                        <span>🏠</span> Home
                    </div>
                    <div className="px-4 py-2 rounded-md hover:bg-black/5 text-charcoal/70 cursor-pointer transition-colors font-body flex items-center gap-2 group">
                        <span className="group-hover:opacity-100 opacity-60">📜</span> Scriptures
                    </div>
                    <div className="px-4 py-2 rounded-md hover:bg-black/5 text-charcoal/70 cursor-pointer transition-colors font-body flex items-center gap-2 group">
                        <span className="group-hover:opacity-100 opacity-60">🧘</span> Meditations
                    </div>
                </nav>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-silver/50 bg-cream px-6 shadow-sm dark:bg-indigo dark:border-purple-dark z-10 transition-colors">
                    <div className="md:hidden text-charcoal dark:text-white font-bold">Vidwaan AI</div>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="relative">
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-petal ring-2 ring-cream"></span>
                            <span className="text-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer">🔔</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-saffron text-saffron-dark hover:bg-saffron/10">
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
