import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils/test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button Component', () => {
    it('should render children correctly', () => {
        render(<Button>Click me</Button>)
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should handle click events', async () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick}>Click</Button>)

        await userEvent.click(screen.getByRole('button', { name: /click/i }))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should be disabled when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>)
        expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled()
    })

    it('should show loading spinner and be disabled when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
        // The spinner is implemented as a div with animate-spin class
        expect(screen.getByRole('button').querySelector('.animate-spin')).toBeInTheDocument()
    })

    it('should apply variant classes correctly', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>)
        expect(screen.getByRole('button').className).toContain('bg-gradient-to-r')

        rerender(<Button variant="secondary">Secondary</Button>)
        expect(screen.getByRole('button').className).toContain('bg-surface-hover')

        rerender(<Button variant="outline">Outline</Button>)
        expect(screen.getByRole('button').className).toContain('border border-text-tertiary')

        rerender(<Button variant="ghost">Ghost</Button>)
        expect(screen.getByRole('button').className).toContain('text-text-primary hover:bg-surface-hover')
    })

    it('should apply size classes correctly', () => {
        const { rerender } = render(<Button size="sm">Small</Button>)
        expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm')

        rerender(<Button size="lg">Large</Button>)
        expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg')

        rerender(<Button size="icon">Icon</Button>)
        expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10', 'p-2')
    })
})
