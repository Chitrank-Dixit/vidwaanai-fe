import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@/test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { server } from '@/test/mocks/server'
import { http, HttpResponse } from 'msw'
import { RegisterForm } from './RegisterForm'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as any),
        useNavigate: () => mockNavigate
    }
})

describe('RegisterForm Integration', () => {
    beforeEach(() => {
        server.resetHandlers()
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('should submit registration successfully', async () => {
        server.use(
            http.post('/api/auth/register', () => {
                return HttpResponse.json({
                    success: true,
                    data: {
                        user: { id: '1', email: 'new@example.com', fullName: 'New User' }
                    }
                })
            })
        )

        render(<RegisterForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/full name/i), 'New User')
        await user.type(screen.getByLabelText(/email address/i), 'new@example.com')
        await user.type(screen.getByLabelText(/^password$/i), 'password123')
        await user.type(screen.getByLabelText(/confirm password/i), 'password123')

        await user.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/chat')
        })
    })

    it('should validate password mismatch', async () => {
        render(<RegisterForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/full name/i), 'New User')
        await user.type(screen.getByLabelText(/email address/i), 'new@example.com')
        await user.type(screen.getByLabelText(/^password$/i), 'password123')
        await user.type(screen.getByLabelText(/confirm password/i), 'mismatch')

        await user.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => {
            expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
        })
    })

    it('should handle registration error', async () => {
        server.use(
            http.post('/api/auth/register', () => {
                return HttpResponse.json(
                    { error: 'Email already exists' },
                    { status: 400 }
                )
            })
        )

        render(<RegisterForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/full name/i), 'New User')
        await user.type(screen.getByLabelText(/email address/i), 'exists@example.com')
        await user.type(screen.getByLabelText(/^password$/i), 'password123')
        await user.type(screen.getByLabelText(/confirm password/i), 'password123')

        await user.click(screen.getByRole('button', { name: /sign up/i }))

        await waitFor(() => {
            expect(screen.getByText(/email already exists/i)).toBeInTheDocument()
        })
    })
})
