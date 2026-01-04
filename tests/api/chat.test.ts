import { describe, it, expect, vi, beforeEach } from 'vitest';
import { chatAPI } from '../../src/api/chat';
import apiClient from '../../src/api/client';

// Mock the API client
vi.mock('../../src/api/client', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        delete: vi.fn(),
        interceptors: {
            request: { use: vi.fn() },
            response: { use: vi.fn() },
        },
    },
}));

describe('Chat API', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockConversation = {
        id: 'conv-123',
        title: 'Test Conversation',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messageCount: 5,
    };

    const mockMessage = {
        id: 'msg-123',
        conversationId: 'conv-123',
        content: 'Hello World',
        role: 'user' as const,
        createdAt: new Date().toISOString(),
    };

    it('getConversations should fetch conversations', async () => {
        const mockResponse = {
            data: {
                success: true,
                data: [mockConversation],
            },
        };

        (apiClient.get as any).mockResolvedValue(mockResponse);

        const result = await chatAPI.getConversations();

        expect(apiClient.get).toHaveBeenCalledWith('/api/chat/conversations', {
            params: {
                page: 1,
                limit: 20
            }
        });
        const expectedResult = {
            conversations: [
                {
                    ...mockConversation,
                    id: 'conv-123'
                }
            ],
            pagination: undefined
        };
        expect(result).toEqual(expectedResult);
    });

    it('sendMessage should post message', async () => {
        const mockResponse = {
            data: {
                success: true,
                data: mockMessage,
            },
        };

        (apiClient.post as any).mockResolvedValue(mockResponse);

        const result = await chatAPI.sendMessage('conv-123', 'Hello World');

        expect(apiClient.post).toHaveBeenCalledWith('/api/chat/messages', {
            conversationId: 'conv-123',
            text: 'Hello World',
            role: 'user',
        });
        const expectedResult = {
            ...mockMessage,
            answer: ''
        };
        expect(result).toEqual(expectedResult);
    });
});
