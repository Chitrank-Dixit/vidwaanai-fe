import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as useAuthHook from '@/hooks/useAuth';

// Mock useAuth
const mockRegister = vi.fn();
const mockUseAuth = {
    register: mockRegister,
    isLoading: false,
    login: vi.fn(),
    logout: vi.fn(),
    user: null,
    isAuthenticated: false,
    error: null,
    checkAuth: vi.fn(),
    clearError: vi.fn()
};

vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => mockUseAuth
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual as any,
        useNavigate: () => mockNavigate,
    };
});

describe('RegisterForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders all fields correctly', () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('shows validation errors for invalid inputs', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        const submitButton = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
            expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
        });
    });

    it('shows error when passwords do not match', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password456' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument();
        });
    });

    it('submits form with valid data', async () => {
        render(
            <BrowserRouter>
                <RegisterForm />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith({
                email: 'john@example.com',
                password: 'password123',
                fullName: 'John Doe',
                preferredLanguage: 'en'
            });
            expect(mockNavigate).toHaveBeenCalledWith('/chat');
        });
    });
});
