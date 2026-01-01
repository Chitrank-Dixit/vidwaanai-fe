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
    entities?: Array<{ name: string; type: string }>;
    sources?: Array<{ title: string; ref: string }>;
    metadata?: Record<string, any>;
}



// Backend returns raw objects, so we remove the { success, data } wrapper expectation
export type ApiResponse<T> = T;

export interface ChatCompletionResponse {
    answer: string;
    confidence: number;
    sources: Array<{
        id: string;
        title: string;
        content: string;
        confidence: number;
        entity_type: string;
        metadata: any;
    }>;
}

export const chatAPI = {
    // Helper to robustly extract array from various backend response shapes
    _extractArray: (data: any, key: string): any[] => {
        if (!data) return [];
        if (Array.isArray(data)) return data;
        if (data[key] && Array.isArray(data[key])) return data[key];
        if (data.data && Array.isArray(data.data)) return data.data;
        if (data.data && data.data[key] && Array.isArray(data.data[key])) return data.data[key];
        return [];
    },

    // Get all conversations
    getConversations: async (): Promise<Conversation[]> => {
        const response = await apiClient.get('/api/chat/conversations');
        const items = chatAPI._extractArray(response.data, 'conversations');

        // Normalize items to ensure 'id' exists
        return items.map((item: any) => ({
            ...item,
            id: item.id || item.conversation_id || item._id,
        }));
    }, // Add comma here if needed by context, but typically replace_file_content replaces block. 
    // Check StartLine/EndLine carefully.
    // The original code was: 
    // getConversations: async (): Promise<Conversation[]> => {
    //     const response = await apiClient.get('/api/chat/conversations');
    //     return chatAPI._extractArray(response.data, 'conversations');
    // },

    // Create new conversation
    createConversation: async (
        title: string,
        description?: string
    ): Promise<any> => {
        const response = await apiClient.post('/api/chat/conversations', {
            title,
            description,
        });
        // Return raw data to let caller handle { id: ... } vs { answer: ... }
        return response.data;
    },

    // Get messages for conversation
    getMessages: async (conversationId: string): Promise<Message[]> => {
        console.log('[API] getMessages called for:', conversationId);
        // Try passing both camelCase and snake_case to be safe, or just snake_case if that's the backend convention.
        // Based on other endpoints, snake_case is likely.
        const response = await apiClient.get('/api/chat/messages', {
            params: {
                conversationId,
                conversation_id: conversationId
            },
        });
        console.log('[API] getMessages raw response:', response);
        const result = chatAPI._extractArray(response.data, 'messages');
        console.log('[API] getMessages extracted result:', result);

        // Normalize messages to match frontend interface
        return result.map((msg: any) => ({
            ...msg,
            id: msg.id || msg._id,
            content: msg.content || msg.text,
        }));
    },

    // Send message
    sendMessage: async (
        conversationId: string,
        content: string,
        role: 'user' | 'assistant' = 'user'
    ): Promise<ChatCompletionResponse> => {
        const response = await apiClient.post('/api/chat/messages', {
            conversationId,
            text: content, // Backend expects 'text'
            role,
        });
        const data = response.data;
        return {
            ...data,
            answer: data.answer || data.text || data.content || data.response || '',
        };
    },

    // Delete conversation
    deleteConversation: async (conversationId: string): Promise<void> => {
        const response = await apiClient.delete(`/api/chat/conversations/${conversationId}`);
        return response.data;
    },
};
