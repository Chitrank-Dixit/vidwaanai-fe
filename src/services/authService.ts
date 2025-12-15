import type { LoginCredentials, User } from '@/types/auth';
import { useAuthStore } from '@/store/authStore';

export const authService = {
    login: async (credentials: LoginCredentials): Promise<User> => {
        // Mock login for MVP
        // In production, replace with: await apiClient.post<AuthResponse>('/auth/login', credentials);
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser: User = {
                    id: '1',
                    email: credentials.email,
                    name: 'Vidwaan User',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`
                };
                const mockToken = 'mock-jwt-token-' + Date.now();

                useAuthStore.getState().setToken(mockToken);
                useAuthStore.getState().setUser(mockUser);

                resolve(mockUser);
            }, 800);
        });
    },

    logout: () => {
        useAuthStore.getState().logout();
    },
};
