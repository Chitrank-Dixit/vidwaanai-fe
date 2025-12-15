import { create } from 'zustand';
import type { Message } from '@/types/chat';

interface ChatState {
    messages: Message[];
    isLoading: boolean;
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    updateMessage: (id: string, updates: Partial<Message>) => void;
    setLoading: (isLoading: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [],
    isLoading: false,
    addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
    setMessages: (messages) => set({ messages }),
    updateMessage: (id, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, ...updates } : msg
            ),
        })),
    setLoading: (isLoading) => set({ isLoading }),
}));
