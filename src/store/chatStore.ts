import { create } from 'zustand';
import { chatAPI, type Conversation, type Message } from '../api/chat';

interface ChatState {
    conversations: Conversation[];
    currentConversation: Conversation | null;
    messages: Message[];
    isLoading: boolean;
    isSending: boolean;
    error: string | null;

    // Actions
    loadConversations: () => Promise<void>;
    createConversation: (title: string, description?: string) => Promise<void>;
    selectConversation: (conversationId: string) => Promise<void>;
    sendMessage: (text: string) => Promise<void>;
    clearError: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    conversations: [],
    currentConversation: null,
    messages: [],
    isLoading: false,
    isSending: false,
    error: null,

    loadConversations: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatAPI.getConversations();
            set({ conversations: response || [], isLoading: false });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to load conversations',
                isLoading: false
            });
        }
    },

    createConversation: async (title, description) => {
        set({ isLoading: true, error: null });
        try {
            const response = await chatAPI.createConversation(title, description);
            if (response) {
                // Handle raw response which might be Completion or Conversation
                const newConv = response.id ? response : {
                    id: 'temp-id', title, createdAt: new Date().toISOString(), messageCount: 1
                };

                set(state => ({
                    conversations: [newConv, ...state.conversations],
                    currentConversation: newConv,
                    messages: [], // New conversation has no messages
                    isLoading: false
                }));
            }
        } catch (error: any) {
            set({
                error: error.message || 'Failed to create conversation',
                isLoading: false
            });
        }
    },

    selectConversation: async (conversationId) => {
        const { conversations } = get();
        const conversation = conversations.find(c => c.id === conversationId);

        if (!conversation) return;

        set({ currentConversation: conversation, isLoading: true, error: null });

        try {
            const response = await chatAPI.getMessages(conversationId);
            set({ messages: response || [], isLoading: false });
        } catch (error: any) {
            set({
                error: error.message || 'Failed to load messages',
                isLoading: false
            });
        }
    },

    sendMessage: async (text) => {
        const { currentConversation } = get();
        if (!currentConversation) return;

        set({ isSending: true, error: null });
        try {
            // 1. Optimistic User Update (Optional, but good UX - assume user msg added by UI component for now or add here)
            // But usually, store handles it. Let's rely on API response for now or add user msg first.

            // 2. Send to API
            const response = await chatAPI.sendMessage(currentConversation.id, text);

            // 3. Create User & AI Messages
            // Note: In a real app, you'd want the User message to be added immediately. 
            // For now, let's construct both.

            const now = new Date().toISOString();
            const userMsg: Message = {
                id: `user-${Date.now()}`,
                conversationId: currentConversation.id,
                content: text,
                role: 'user',
                createdAt: now
            };

            const aiMsg: Message = {
                id: `ai-${Date.now()}`,
                conversationId: currentConversation.id,
                content: response.answer,
                role: 'assistant',
                createdAt: now,
                sources: response.sources?.map(s => ({ title: s.title, ref: s.id })),
                metadata: { confidence: response.confidence }
            };

            set(state => ({
                messages: [...state.messages, userMsg, aiMsg],
                isSending: false
            }));

        } catch (error: any) {
            set({
                error: error.message || 'Failed to send message',
                isSending: false
            });
        }
    },

    clearError: () => set({ error: null })
}));
