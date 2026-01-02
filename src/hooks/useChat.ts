import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { chatAPI, type Message } from '../api/chat';

export const useChat = (conversationId?: string) => {
    const queryClient = useQueryClient();
    const [isStreaming, setIsStreaming] = useState(false);

    // Fetch messages for active conversation
    const messagesQuery = useQuery({
        queryKey: ['chatMessages', conversationId],
        queryFn: () => chatAPI.getMessages(conversationId!),
        enabled: !!conversationId && conversationId !== 'undefined' && !conversationId.startsWith('temp-'),
        staleTime: 60000,
        select: (data) => data || [],
    });

    const streamMessage = async (content: string) => {
        if (!conversationId) return;

        setIsStreaming(true);

        // 1. Optimistic User Update
        const now = new Date().toISOString();
        queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => [
            ...old,
            {
                id: `temp-user-${Date.now()}`,
                conversationId,
                content,
                role: 'user',
                createdAt: now,
            },
            {
                id: `ai-streaming-${Date.now()}`,
                conversationId,
                content: '', // Start empty
                role: 'assistant',
                createdAt: now,
                isStreaming: true
            }
        ]);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const API_BASE_URL = import.meta.env.VITE_API_URL || '';

            const response = await fetch(`${API_BASE_URL}/api/chat/stream`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
                },
                body: JSON.stringify({ conversationId, question: content })
            });

            if (!response.ok) throw new Error(response.statusText);
            if (!response.body) throw new Error('No response body');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let aiContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.slice(6);
                        if (dataStr === '[DONE]') continue;
                        try {
                            const data = JSON.parse(dataStr);
                            if (data.token) {
                                aiContent += data.token;

                                // Update Cache
                                queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => {
                                    const newMessages = [...old];
                                    const lastMsg = newMessages[newMessages.length - 1];
                                    if (lastMsg && lastMsg.role === 'assistant') {
                                        lastMsg.content = aiContent;
                                    }
                                    return newMessages;
                                });
                            }
                        } catch (e) {
                            // ignore
                        }
                    }
                }
            }
        } catch (error) {
            console.warn("Streaming failed, falling back to standard send", error);
            try {
                // Fallback: Use standard REST API
                const completion = await chatAPI.sendMessage(conversationId, content, 'user');

                // Update Cache: Replace the empty streaming message with the full response
                queryClient.setQueryData(['chatMessages', conversationId], (old: Message[] = []) => {
                    // Normalize sources
                    const sources = completion.sources?.map((s: any) => ({
                        title: s.title,
                        ref: s.id
                    }));

                    return old.map(m => {
                        // Find our specific placeholder using the timestamp if possible, 
                        // or just the last assistant message that is streaming.
                        if (m.isStreaming) {
                            return {
                                ...m,
                                id: completion.id || m.id,
                                content: completion.answer,
                                isStreaming: false,
                                sources: sources,
                                metadata: { confidence: completion.confidence }
                            };
                        }
                        return m;
                    });
                });
            } catch (fallbackError) {
                console.error("Fallback failed", fallbackError);
            }
        } finally {
            setIsStreaming(false);
            // Invalidate to ensure consistency, but delay slightly or trust the update?
            // If we invalidate immediately, we might see a flash. 
            // The optimistic update above should be enough. 
            // We can invalidate strictly if fallback failed.
            // But let's invalidate to be safe, syncing with server state.
            queryClient.invalidateQueries({ queryKey: ['chatMessages', conversationId] });
        }
    };

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

        // STREAMING
        streamMessage,
        isStreaming,

        createConversation: createConversationMutation.mutateAsync,
        isCreating: createConversationMutation.isPending,

        history: historyQuery.data || [],
        isLoadingHistory: historyQuery.isLoading,
    };
};
