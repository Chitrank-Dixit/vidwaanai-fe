import apiClient from './client';

export interface Conversation {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    messageCount: number;
}

export interface Message {
    id: string;
    conversationId: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
    metadata?: Record<string, any>;
}

export interface ChatResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export const chatAPI = {
    // Get all conversations
    getConversations: async (): Promise<ChatResponse<Conversation[]>> => {
        const response = await apiClient.get('/api/chat/conversations');
        return response.data;
    },

    // Create new conversation
    createConversation: async (
        title: string,
        description?: string
    ): Promise<ChatResponse<Conversation>> => {
        const response = await apiClient.post('/api/chat/conversations', {
            title,
            description,
        });
        return response.data;
    },

    // Get messages for conversation
    getMessages: async (conversationId: string): Promise<ChatResponse<Message[]>> => {
        const response = await apiClient.get('/api/chat/messages', {
            params: { conversationId },
        });
        return response.data;
    },

    // Send message
    sendMessage: async (
        conversationId: string,
        content: string,
        role: 'user' | 'assistant' = 'user'
    ): Promise<ChatResponse<Message>> => {
        const response = await apiClient.post('/api/chat/messages', {
            conversationId,
            content,
            role,
        });
        return response.data;
    },

    // Delete conversation
    deleteConversation: async (conversationId: string): Promise<ChatResponse<void>> => {
        const response = await apiClient.delete(`/api/chat/conversations/${conversationId}`);
        return response.data;
    },
};
