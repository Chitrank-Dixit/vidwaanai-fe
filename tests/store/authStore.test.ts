import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from '../../src/store/authStore';
import { authAPI } from '../../src/api/auth';

// Mock auth API
vi.mock('../../src/api/auth', () => ({
    authAPI: {
        login: vi.fn(),
        logout: vi.fn(),
    },
}));

describe('Auth Store', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useAuthStore.setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
        localStorage.clear();
    });

    const mockUser = {
        id: '123',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user' as const,
        emailVerified: true,
        status: 'active' as const,
        createdAt: new Date().toISOString(),
    };

    it('login should update state on success', async () => {
        (authAPI.login as any).mockResolvedValue({
            data: { user: mockUser }
        });

        await useAuthStore.getState().login({ email: 'test@example.com', password: 'password' });

        const state = useAuthStore.getState();
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthenticated).toBe(true);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('login should update error state on failure', async () => {
        const error = { response: { data: { error: 'Invalid credentials' } } };
        (authAPI.login as any).mockRejectedValue(error);

        try {
            await useAuthStore.getState().login({ email: 'test@example.com', password: 'wrong' });
        } catch (e) {
            // Expected
        }

        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Invalid credentials');
    });

    it('logout should clear state', async () => {
        // Set initial state
        useAuthStore.setState({
            user: mockUser,
            isAuthenticated: true,
        });

        await useAuthStore.getState().logout();

        const state = useAuthStore.getState();
        expect(state.user).toBeNull();
        expect(state.isAuthenticated).toBe(false);
    });
});
