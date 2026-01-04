import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input Component', () => {
    it('should render with placeholder', () => {
        render(<Input placeholder="Enter text" />)
        expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    })

    it('should render with label', () => {
        render(<Input label="Username" id="username" />)
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
    })

    it('should handle value changes', async () => {
        const handleChange = vi.fn()
        render(<Input onChange={handleChange} />)

        const input = screen.getByRole('textbox')
        await userEvent.type(input, 'Hello')

        expect(handleChange).toHaveBeenCalledTimes(5)
        expect(input).toHaveValue('Hello')
    })

    it('should display error message', () => {
        render(<Input error="Invalid input" />)
        expect(screen.getByText('Invalid input')).toBeInTheDocument()
        expect(screen.getByRole('textbox')).toHaveClass('border-error')
    })

    it('should render with icon', () => {
        render(<Input icon={<span data-testid="icon">🔍</span>} />)
        expect(screen.getByTestId('icon')).toBeInTheDocument()
        // Check if input has padding-left to accommodate icon
        expect(screen.getByRole('textbox')).toHaveClass('pl-10')
    })

    it('should support different input types', () => {
        const { rerender } = render(<Input type="password" placeholder="Password" />)
        expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

        rerender(<Input type="email" placeholder="Email" />)
        expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')
    })

    it('should be disabled when disabled prop is true', () => {
        render(<Input disabled />)
        expect(screen.getByRole('textbox')).toBeDisabled()
    })
})
