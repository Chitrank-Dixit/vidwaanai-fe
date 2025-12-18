import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authAPI } from '../../src/api/auth';
import apiClient from '../../src/api/client';
import { UserRole } from '../../src/api/types';

// Mock the API client
vi.mock('../../src/api/client', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        interceptors: {
            request: { use: vi.fn() },
            response: { use: vi.fn() },
        },
    },
}));

describe('Auth API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    const mockUser = {
        id: '123',
        email: 'test@example.com',
        fullName: 'Test User',
        role: UserRole.USER,
        emailVerified: true,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
    };

    it('login should store tokens and return user data', async () => {
        const mockResponse = {
            data: {
                success: true,
                data: {
                    accessToken: 'access-token-123',
                    refreshToken: 'refresh-token-123',
                    user: mockUser,
                    expiresIn: 3600,
                },
            },
        };

        (apiClient.post as any).mockResolvedValue(mockResponse);

        const result = await authAPI.login({
            email: 'test@example.com',
            password: 'password123',
        });

        expect(apiClient.post).toHaveBeenCalledWith('/api/auth/login', {
            email: 'test@example.com',
            password: 'password123',
        });
        expect(result).toEqual(mockResponse.data);
        expect(localStorage.getItem('accessToken')).toBe('access-token-123');
        expect(localStorage.getItem('refreshToken')).toBe('refresh-token-123');
    });

    it('register should call register endpoint', async () => {
        const mockResponse = {
            data: {
                success: true,
                data: {
                    user: mockUser
                }
            },
        };

        (apiClient.post as any).mockResolvedValue(mockResponse);

        const result = await authAPI.register({
            email: 'test@example.com',
            password: 'password123',
            fullName: 'Test User',
        });

        expect(apiClient.post).toHaveBeenCalledWith('/api/auth/register', {
            email: 'test@example.com',
            password: 'password123',
            fullName: 'Test User',
        });
        expect(result).toEqual(mockResponse.data);
    });

    it('logout should remove tokens', async () => {
        localStorage.setItem('accessToken', 'test-token');

        (apiClient.post as any).mockResolvedValue({ data: { success: true } });

        await authAPI.logout();

        expect(apiClient.post).toHaveBeenCalledWith('/api/auth/logout', {});
        expect(localStorage.getItem('accessToken')).toBeNull();
    });
});
