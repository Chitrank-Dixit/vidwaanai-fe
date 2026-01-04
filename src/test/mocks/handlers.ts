import { http, HttpResponse } from 'msw'

export const handlers = [
    // Example: GET request
    http.get('/api/users/:id', () => {
        return HttpResponse.json({ id: '1', name: 'John Doe' })
    }),
]
