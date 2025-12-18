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
            set({ conversations: response.data || [], isLoading: false });
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
            if (response.data) {
                const newConv = response.data;
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
            set({ messages: response.data || [], isLoading: false });
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
            const response = await chatAPI.sendMessage(currentConversation.id, text);
            if (response.data) {
                set(state => ({
                    messages: [...state.messages, response.data!],
                    isSending: false
                }));
            }
        } catch (error: any) {
            set({
                error: error.message || 'Failed to send message',
                isSending: false
            });
        }
    },

    clearError: () => set({ error: null })
}));
