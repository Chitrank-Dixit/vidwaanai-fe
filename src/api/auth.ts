import apiClient from './client';
import type { User } from './types';

export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
        accessToken?: string;
        refreshToken?: string;
        user?: User;
        expiresIn?: number;
    };
}

export interface RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    preferredLanguage?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

// Register new user
export const authAPI = {
    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/register', data);
        return response.data;
    },

    // Login user
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/login', data);
        const { accessToken, refreshToken, expiresIn } = response.data.data;

        // Store tokens
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenExpiry', (Date.now() + (expiresIn || 900) * 1000).toString());
        }
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }

        return response.data;
    },

    // Refresh access token
    refresh: async (): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/refresh', {});
        const { accessToken, expiresIn } = response.data.data;

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('tokenExpiry', (Date.now() + (expiresIn || 900) * 1000).toString());
        }

        return response.data;
    },

    // Logout user
    logout: async (): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post('/api/auth/logout', {});
            return response.data;
        } finally {
            // Clear tokens regardless of response
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenExpiry');
        }
    },

    // Verify email
    verifyEmail: async (email: string, token: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/verify-email', { email, token });
        return response.data;
    },

    // Request password reset
    forgotPassword: async (email: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/forgot-password', { email });
        return response.data;
    },

    // Reset password with token
    resetPassword: async (token: string, newPassword: string): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/reset-password', { token, newPassword });
        return response.data;
    },
};
