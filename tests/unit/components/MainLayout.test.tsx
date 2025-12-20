import { render, screen } from '@testing-library/react';
import { MainLayout } from '@/components/layout/MainLayout';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

// Mock useAuth for Header/Sidebar
vi.mock('@/hooks/useAuth', () => ({
    useAuth: () => ({
        user: { fullName: 'Test User', email: 'test@example.com' },
        logout: vi.fn()
    })
}));

describe('MainLayout', () => {
    it('renders children and navigation', () => {
        render(
            <BrowserRouter>
                <MainLayout>
                    <div>Child Content</div>
                </MainLayout>
            </BrowserRouter>
        );

        expect(screen.getByText('Child Content')).toBeInTheDocument();
        expect(screen.getAllByText(/🕉️ Vidwaan/i)[0]).toBeInTheDocument();
    });
});
