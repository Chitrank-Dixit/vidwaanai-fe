import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils/test-utils'
import { Card } from './Card'

describe('Card Component', () => {
    it('should render children content', () => {
        render(
            <Card>
                <p>Card Content</p>
            </Card>
        )
        expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply hover styles by default', () => {
        render(<Card data-testid="card">Content</Card>)
        const card = screen.getByTestId('card')
        expect(card.className).toContain('hover:shadow-lg')
    })

    it('should not apply hover styles when hover is false', () => {
        render(<Card hover={false} data-testid="card">Content</Card>)
        const card = screen.getByTestId('card')
        expect(card.className).not.toContain('hover:shadow-lg')
    })

    it('should accept additional classes', () => {
        render(<Card className="custom-class" data-testid="card">Content</Card>)
        expect(screen.getByTestId('card')).toHaveClass('custom-class')
    })
})
