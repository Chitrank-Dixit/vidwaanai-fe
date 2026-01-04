import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'

// Mock useAuth
vi.mock('@/hooks/useAuth', () => ({
    useAuth: vi.fn()
}))

import { useAuth } from '@/hooks/useAuth'

describe('Navigation Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders homepage when unauthenticated', () => {
        (useAuth as any).mockReturnValue({
            isAuthenticated: false,
            user: null,
            isLoading: false
        })

        render(<App />)
        // Assuming "Vidwaan AI" or "Sign in" is on the landing page/header
        // Check for specific heading or unique element
        expect(screen.getAllByText(/Vidwaan/i)[0]).toBeInTheDocument()
    })
})
