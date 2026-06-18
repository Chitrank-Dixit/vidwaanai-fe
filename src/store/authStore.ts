import { create } from 'zustand';
import { authAPI, type LoginRequest, type RegisterRequest } from '../api/auth';
import type { User } from '../api/types';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    isLoading: false,
    error: null,

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authAPI.login(credentials);
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error: any) {
            set({
                error: error.response?.data?.error || 'Login failed',
                isLoading: false,
                isAuthenticated: false
            });
            throw error;
        }
    },

    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authAPI.register(data);
            // Note: Registration might not auto-login depending on backend, 
            // but commonly we might want to redirect to login or auto-login.
            // Here we just update state if user is returned.
            if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                set({ user: response.data.user });
            }
            set({ isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.error || 'Registration failed',
                isLoading: false
            });
            throw error;
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error', error);
        } finally {
            // Clear local state regardless of server response
            localStorage.removeItem('user');
            set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        }
    },

    clearError: () => set({ error: null }),

    checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            set({ isAuthenticated: true });
            // Fetch user profile if missing
            if (!get().user) {
                try {
                    const response = await authAPI.getMe();
                    if (response.data.user) {
                        set({ user: response.data.user });
                    }
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    // Optionally logout if token is invalid, but let's be safe for now
                }
            }
        } else {
            set({ isAuthenticated: false, user: null });
        }
    }
}));
