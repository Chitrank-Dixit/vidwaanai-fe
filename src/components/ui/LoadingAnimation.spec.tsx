import { describe, it, expect } from 'vitest'
import { render } from '@/test/utils/test-utils'
import { LoadingPulse, LoadingSpinner } from './LoadingAnimation'

describe('LoadingAnimation', () => {
    describe('LoadingPulse', () => {
        it('should render 3 pulse dots', () => {
            const { container } = render(<LoadingPulse />)
            const dots = container.querySelectorAll('.animate-pulse')
            expect(dots).toHaveLength(3)
        })
    })

    describe('LoadingSpinner', () => {
        it('should render with default size (md)', () => {
            const { container } = render(<LoadingSpinner />)
            const spinner = container.firstChild
            expect(spinner).toHaveClass('w-8', 'h-8', 'border-3')
        })

        it('should render with small size', () => {
            const { container } = render(<LoadingSpinner size="sm" />)
            const spinner = container.firstChild
            expect(spinner).toHaveClass('w-4', 'h-4', 'border-2')
        })

        it('should render with large size', () => {
            const { container } = render(<LoadingSpinner size="lg" />)
            const spinner = container.firstChild
            expect(spinner).toHaveClass('w-12', 'h-12', 'border-4')
        })
    })
})
