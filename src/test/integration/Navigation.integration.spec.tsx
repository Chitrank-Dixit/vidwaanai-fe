import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { App } from '../../App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

// Mock useAuth
vi.mock('@/hooks/useAuth', () => ({
    useAuth: vi.fn()
}))

// Mock useChat to prevent external calls and setup simple chat interface structure
vi.mock('@/hooks/useChat', () => ({
    useChat: () => ({
        messages: [],
        streamMessage: vi.fn(),
        history: [],
        createConversation: vi.fn(),
        isCreating: false,
        deleteConversation: vi.fn(),
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        isFetchingNextPage: false
    })
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

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        )
        // Assuming "Vidwaan AI" or "Sign in" is on the landing page/header
        // Check for specific heading or unique element
        expect(screen.getAllByText(/Vidwaan/i)[0]).toBeInTheDocument()
    })

    it('redirects to chat when authenticated on homepage', () => {
        (useAuth as any).mockReturnValue({
            isAuthenticated: true,
            user: { fullName: 'Test User', email: 'test@example.com' },
            isLoading: false
        })

        render(
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        )
        // Check for chat elements (like the New Chat button in sidebar)
        expect(screen.getByText(/New chat/i)).toBeInTheDocument()
    })
})
