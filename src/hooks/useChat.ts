import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatAPI, type Message } from '../api/chat';

export const useChat = (conversationId?: string) => {
    const queryClient = useQueryClient();

    // Fetch messages for active conversation
    const messagesQuery = useQuery({
        queryKey: ['chatMessages', conversationId],
        queryFn: () => chatAPI.getMessages(conversationId!),
        enabled: !!conversationId && conversationId !== 'undefined' && !conversationId.startsWith('temp-'),
        staleTime: 60000, // 1 minute: Trust the cache (and our manual updates) to prevent flickering/overwriting
        select: (data) => data || [],
    });

    // Send message mutation
    const sendMessageMutation = useMutation({
        mutationFn: async ({ content, role = 'user' }: { content: string; role?: 'user' | 'assistant' }) => {
            if (!conversationId) throw new Error('No conversation ID');
            // Return BOTH the sent content and the API response
            const response = await chatAPI.sendMessage(conversationId, content, role);
            return { sentContent: content, apiResponse: response };
        },
        onMutate: async ({ content, role = 'user' }) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ['chatMessages', conversationId] });

            // Snapshot the previous value
            const previousMessages = queryClient.getQueryData<Message[]>(['chatMessages', conversationId]);

            // Optimistically update to the new value
            queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => {
                const now = new Date().toISOString();
                const optimisticMsg: Message = {
                    id: `temp-user-${Date.now()}`,
                    conversationId: conversationId!,
                    content,
                    role: role as 'user' | 'assistant',
                    createdAt: now,
                };
                return [...old, optimisticMsg];
            });

            // Return a context object with the snapshotted value
            return { previousMessages };
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['chatMessages', conversationId], context?.previousMessages);
        },
        onSuccess: ({ apiResponse }) => {
            // Do NOT invalidate immediately. Trust the API response.
            // Race condition: Server might not have persisted the AI message yet.
            // queryClient.invalidateQueries({ queryKey: ['chatMessages', conversationId] });

            console.log('[useChat] sendMessage SUCCESS. API Response:', apiResponse);

            queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => {
                const now = new Date().toISOString();
                console.log('[useChat] Updating cache. Old messages:', old.length);

                // 2. Create Assistant Message from API Response
                // Note: The User message was already added in onMutate.
                // We just append the AI response here.
                const assistantMessage: Message = {
                    id: apiResponse.id || `temp-ai-${Date.now()}`,
                    conversationId: conversationId!,
                    content: apiResponse.answer,
                    role: 'assistant',
                    createdAt: now,
                    sources: apiResponse.sources?.map((s: any) => ({
                        title: s.title,
                        ref: s.id
                    })),
                    metadata: {
                        confidence: apiResponse.confidence
                    }
                };

                // Deduplicate: Check if this message ID already exists (from the refetch?)
                // Actually, if we invalidate, the refetch might happen concurrently.
                // Optimistic update + Invalidate is the safest pattern.
                // But we still append here to ensure immediate feedback if refetch is slow.
                if (old.some(m => m.id === assistantMessage.id)) return old;

                return [...old, assistantMessage];
            });
        },
    });

    // Create conversation mutation
    const createConversationMutation = useMutation({
        mutationFn: ({ title, initialMessage }: { title: string; initialMessage?: string }) =>
            chatAPI.createConversation(title).then(response => ({ response, initialMessage })),
        onSuccess: ({ response, initialMessage }) => {
            // STOP THE REDIRECT LOOP: Do NOT invalidate 'conversations' immediately.
            // Invalidating triggers a refetch which might be causing the layout/sidebar to remount or router to reset.
            // queryClient.invalidateQueries({ queryKey: ['conversations'] });

            // INSTEAD: Manually update the conversation list cache (Optimistic-like)
            const newId = response.id || response.conversationId || response.session_id || response._id;
            if (newId) {
                queryClient.setQueryData(['conversations'], (old: any[] = []) => {
                    const newConv = {
                        id: newId,
                        title: (initialMessage || 'New Chat').slice(0, 30),
                        updatedAt: new Date().toISOString(),
                        createdAt: new Date().toISOString(),
                        messageCount: 2, // Initial user message + AI response
                    };
                    // Prepend the new conversation
                    return [newConv, ...old];
                });
            }

            // If the creation response includes an Answer, add it to the message list!
            if (response && response.answer) {
                const now = new Date().toISOString();

                // We suspect the ID might be missing, but if we have it on data:
                const targetId = newId || 'temp-new-id';

                // Add to cache
                queryClient.setQueryData(['chatMessages', targetId], () => {
                    const messagesToSend: Message[] = [];

                    // 1. Add User Message if provided
                    if (initialMessage) {
                        messagesToSend.push({
                            id: `temp-user-init-${Date.now()}`,
                            conversationId: targetId,
                            content: initialMessage,
                            role: 'user',
                            createdAt: now,
                        });
                    }

                    // 2. Add AI Message
                    const aiMsg: Message = {
                        id: `ai-${Date.now()}`,
                        conversationId: targetId,
                        content: response.answer,
                        role: 'assistant',
                        createdAt: now,
                        sources: response.sources?.map((s: any) => ({
                            title: s.title,
                            ref: s.id
                        })),
                        metadata: { confidence: response.confidence }
                    };
                    messagesToSend.push(aiMsg);

                    return messagesToSend;
                });
            }
        }
    });

    // Fetch all conversations history
    const historyQuery = useQuery({
        queryKey: ['conversations'],
        queryFn: chatAPI.getConversations,
        select: (data) => data || [],
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
