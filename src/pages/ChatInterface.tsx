import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Menu, Database } from 'lucide-react';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatInputBox } from '../components/chat/ChatInputBox';
import { ChatMessage } from '../components/chat/ChatMessage';
import { useChat } from '../hooks/useChat';
import { UserDropdown } from '../components/layout/UserDropdown';
import { useAuth } from '../hooks/useAuth';



import { useNavigate, useParams } from 'react-router-dom';
import { chatAPI } from '../api/chat';
import { useQueryClient } from '@tanstack/react-query';

export const ChatInterface: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { "*": pathParam } = useParams();
    const queryClient = useQueryClient();

    // Prioritize URL param, fallback to undefined (new chat)
    // Handle edge case where ID might be literally "undefined" string
    const conversationId = (!pathParam || pathParam === 'undefined') ? undefined : pathParam;
    const initialQuery = searchParams.get('q');

    // Redirect if URL is literally /chat/undefined (cleanup)
    useEffect(() => {
        if (pathParam === 'undefined') {
            navigate('/chat', { replace: true });
        }
    }, [pathParam, navigate]);

    const {
        messages,
        createConversation,
        isCreating,
        history,
        streamMessage,
        isStreaming
    } = useChat(conversationId);

    // Local state for optimistic updates during new chat creation
    const [pendingMessage, setPendingMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle initial query from homepage
    useEffect(() => {
        if (initialQuery && !conversationId) {
            handleSendMessage(initialQuery);
        }
    }, [initialQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSendMessage = async (text: string) => {
        setIsSubmitting(true);
        try {
            // Case 1: Existing Conversation
            if (conversationId) {
                // Use streaming method
                await streamMessage(text);
                return;
            }

            // Case 2: New Conversation
            setPendingMessage(text);
            try {
                // 1. Create the conversation
                const { response } = await createConversation({
                    title: text.slice(0, 30) + "...",
                    initialMessage: text
                });

                const responseData = response.response || response;
                // INSTRUMENTATION: Expose response to browser agent for verification
                (window as any).DEBUG_LAST_ChatResponse = response;
                console.log('[DEBUG] createConversation Raw Response:', response);

                // ROBUST EXTRACTION: Check all possible paths for ID
                const newId =
                    // Direct top-level
                    response.id || response._id || response.conversationId || response.conversation_id || response.session_id ||
                    // Nested in .data (common Axios/API pattern)
                    response.data?.id || response.data?._id || response.data?.conversationId ||
                    // Nested in .conversation (some backends wrap it)
                    response.conversation?.id || response.conversation?._id ||
                    // Legacy/Nested structure
                    responseData.id || responseData.conversationId || responseData._id;

                // Avoid navigating to 'undefined' string or empty ID
                if (newId && newId !== 'undefined') {
                    // 1. SEED USER MESSAGE (Optimistic) - BEFORE Navigation
                    const now = new Date().toISOString();
                    queryClient.setQueryData(['chatMessages', newId], [
                        {
                            id: `init-user-${Date.now()}`,
                            conversationId: newId,
                            content: text,
                            role: 'user',
                            createdAt: now
                        }
                    ]);

                    // 2. NAVIGATE IMMEDIATELY
                    navigate(`/chat/${newId}`);

                    // 3. UPDATE CACHE WITH AI RESPONSE (from Creation Response)
                    if (responseData.answer || responseData.content) {
                        queryClient.setQueryData(['chatMessages', newId], (old: any[] = []) => [
                            ...old,
                            {
                                id: responseData.messageId || `init-ai-${Date.now()}`,
                                conversationId: newId,
                                content: responseData.answer || responseData.content,
                                role: 'assistant',
                                createdAt: new Date().toISOString(),
                                sources: responseData.sources,
                                metadata: { confidence: responseData.confidence }
                            }
                        ]);
                    }
                } else {
                    console.error("Critical: Initial conversation ID is missing or invalid", response);
                    // Stay on current page or show error, do NOT navigate to /chat/undefined
                }
            } finally {
                setPendingMessage(null);
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setPendingMessage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEntityClick = (entity: string) => {
        handleSendMessage(`Tell me more about ${entity}`);
    };

    return (
        <div className="flex h-screen bg-background text-text-primary overflow-hidden">
            {/* Sidebar */}
            <ChatSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                conversations={history}
                currentId={conversationId}
                onSelect={(id) => {
                    navigate(`/chat/${id}`);
                }}
                onNewChat={() => navigate('/chat')}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full relative w-full">
                {/* Header */}
                <header className="h-16 border-b border-text-tertiary/10 bg-surface/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-surface-hover rounded-lg text-text-secondary"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-lg">Vidwaan</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-surface-hover rounded-lg text-text-secondary">
                            <Database className="w-5 h-5" />
                        </button>
                        <UserDropdown user={useAuth().user} />
                    </div>
                </header>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
                    <div className="max-w-3xl mx-auto w-full pb-32">
                        {/* Messages mapped from hook */}
                        {messages.map((msg: any) => (
                            <ChatMessage
                                key={msg.id}
                                message={{
                                    ...msg,
                                    onEntityClick: handleEntityClick,
                                    isStreaming: msg.isStreaming
                                }}
                            />
                        ))}

                        {/* Optimistic Pending User Message for New Chats */}
                        {pendingMessage && (
                            <ChatMessage
                                key="pending-init"
                                message={{
                                    id: 'pending-init',
                                    role: 'user',
                                    content: pendingMessage,
                                }}
                            />
                        )}

                        {(isSubmitting || isCreating) && (
                            <div className="flex justify-start animate-pulse mb-8">
                                <div className="bg-surface-hover h-12 w-32 rounded-lg flex items-center justify-center">
                                    <span className="text-text-tertiary text-sm">Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-20 pb-8 px-4">
                    <div className="max-w-3xl mx-auto">
                        <ChatInputBox
                            onSubmit={handleSendMessage}
                            disabled={isSubmitting}
                            placeholder="Ask follow-up question..."
                        />
                        <div className="text-center mt-3">
                            <span className="text-xs text-text-tertiary">
                                AI can make mistakes. Check important info.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
