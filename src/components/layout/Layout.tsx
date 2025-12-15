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
        <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900">
            {/* Sidebar Placeholder */}
            <aside className="w-64 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 hidden md:block">
                <div className="p-4">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">Vidwaan AI</h1>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
                    <div className="md:hidden">Menu</div>
                    <div className="ml-auto">
                        <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                    </div>
                </header>
                <main className="flex-1 overflow-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
