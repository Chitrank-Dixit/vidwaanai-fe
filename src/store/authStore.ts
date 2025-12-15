import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
    setError: (error: string | null) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            setToken: (token) => set({ token, isAuthenticated: !!token }),
            setUser: (user) => set({ user }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
            setError: (error) => set({ error }),
            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
