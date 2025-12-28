import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatAPI, type Message } from '../api/chat';

export const useChat = (conversationId?: string) => {
    const queryClient = useQueryClient();

    // Fetch messages for active conversation
    const messagesQuery = useQuery({
        queryKey: ['chatMessages', conversationId],
        queryFn: () => chatAPI.getMessages(conversationId!),
        enabled: !!conversationId,
        select: (data) => data.data || [],
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async ({ content, role = 'user' }: { content: string; role?: 'user' | 'assistant' }) => {
            if (!conversationId) throw new Error('No conversation ID');
            return chatAPI.sendMessage(conversationId, content, role);
        },
        onSuccess: (response) => {
            if (response.success && response.data) {
                // Optimistically update or invalidate query
                queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => {
                    return [...old, response.data];
                });
            }
        },
    });

    // Create conversation mutation
    const createConversationMutation = useMutation({
        mutationFn: (title: string) => chatAPI.createConversation(title),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['conversations'] });
        }
    });

    // Fetch all conversations history
    const historyQuery = useQuery({
        queryKey: ['conversations'],
        queryFn: chatAPI.getConversations,
        select: (data) => data.data || [],
    });

    return {
        messages: messagesQuery.data || [],
        isLoadingMessages: messagesQuery.isLoading,
        errorMessages: messagesQuery.error,

        sendMessage: sendMessageMutation.mutateAsync,
        isSending: sendMessageMutation.isPending,

        createConversation: createConversationMutation.mutateAsync,
        isCreating: createConversationMutation.isPending,

        history: historyQuery.data || [],
        isLoadingHistory: historyQuery.isLoading,
    };
};
