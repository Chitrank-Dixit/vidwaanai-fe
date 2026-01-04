import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@/test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { server } from '@/test/mocks/server'
import { http, HttpResponse } from 'msw'

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...(actual as any),
        useNavigate: () => mockNavigate
    }
})

describe('LoginForm Integration', () => {
    beforeEach(() => {
        server.resetHandlers()
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('should submit form successfully and navigate', async () => {
        // Mock successful login response
        server.use(
            http.post('/api/auth/login', () => {
                return HttpResponse.json({
                    success: true,
                    data: {
                        accessToken: 'valid-token',
                        user: { id: '1', email: 'test@example.com' }
                    }
                })
            })
        )

        render(<LoginForm />) // Note: LoginForm is not exported as default in the file

        // Use userEvent to interact
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
        await user.type(screen.getByLabelText(/password/i), 'password123')

        const submitBtn = screen.getByRole('button', { name: /sign in/i })
        await user.click(submitBtn)

        // Wait for navigation
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/chat')
        })
    })

    it('should display error message on login failure', async () => {
        // Mock failure response
        server.use(
            http.post('/api/auth/login', () => {
                return HttpResponse.json(
                    { error: 'Invalid credentials' },
                    { status: 400 }
                )
            })
        )

        render(<LoginForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
        await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
        })
    })

    it('should show validation errors for invalid input', async () => {
        render(<LoginForm />)
        const user = userEvent.setup()

        // Submit empty form
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
            expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument()
        })

        // Invalid email format - Note: HTML5 validation might catch this first if type=email
        // But hook-form should also validate.
        await user.type(screen.getByLabelText(/email address/i), 'not-an-email')
        await user.click(screen.getByRole('button', { name: /sign in/i }))

        await waitFor(() => {
            expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
        })
    })

    it('should show loading state during submission', async () => {
        server.use(
            http.post('/api/auth/login', async () => {
                await new Promise(resolve => setTimeout(resolve, 100))
                return HttpResponse.json({ success: true, data: {} })
            })
        )

        render(<LoginForm />)
        const user = userEvent.setup()

        await user.type(screen.getByLabelText(/email address/i), 'test@example.com')
        await user.type(screen.getByLabelText(/password/i), 'password123')

        const submitBtn = screen.getByRole('button', { name: /sign in/i })
        await user.click(submitBtn)

        await waitFor(() => {
            expect(submitBtn).toBeDisabled()
        })
        expect(submitBtn.querySelector('.animate-spin')).toBeInTheDocument()
    })
})

// Need to import LoginForm at top, but since I can't modify imports easily in the same block without errors if I guessed wrong export type:
// Based on previous file read: export const LoginForm = ...
import { LoginForm } from './LoginForm'
