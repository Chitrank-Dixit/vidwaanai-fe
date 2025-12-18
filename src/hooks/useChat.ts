import { useChatStore } from '../store/chatStore';

export const useChat = () => {
    const store = useChatStore();

    return {
        conversations: store.conversations,
        currentConversation: store.currentConversation,
        messages: store.messages,
        isLoading: store.isLoading,
        isSending: store.isSending,
        error: store.error,

        loadConversations: store.loadConversations,
        createConversation: store.createConversation,
        selectConversation: store.selectConversation,
        sendMessage: store.sendMessage, // Takes just text, internal store knows conversationId
        loadMessages: store.selectConversation, // Alias for compatibility
        clearError: store.clearError
    };
};
