import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Menu, Database } from 'lucide-react';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatInputBox } from '../components/chat/ChatInputBox';
import { ChatMessage } from '../components/chat/ChatMessage';
import { useChat } from '../hooks/useChat';
import { UserDropdown } from '../components/layout/UserDropdown';
import { useAuth } from '../hooks/useAuth';



export const ChatInterface: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q');

    // We would manage conversation ID here, potentially creating a new one if needed
    // For now, we'll assume a 'new' context or manage ID via state if utilizing the hook's creation capability
    const [conversationId, setConversationId] = useState<string | undefined>(undefined);

    const { messages, sendMessage, isSending, createConversation, isCreating, history } = useChat(conversationId);

    // Local state for optimistic updates during new chat creation
    const [pendingMessage, setPendingMessage] = useState<string | null>(null);

    // Handle initial query from homepage
    useEffect(() => {
        if (initialQuery && !conversationId) {
            handleSendMessage(initialQuery);
        }
    }, [initialQuery]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSendMessage = async (text: string) => {
        try {
            let currentConvId = conversationId;

            if (!currentConvId) {
                setPendingMessage(text);
                try {
                    // Create new conversation on first message
                    // The backend might return the Answer immediately here!
                    const { response } = await createConversation({
                        title: text.slice(0, 30) + "...",
                        initialMessage: text
                    });

                    // Check if we got an ID (standard flow) or an Answer (immediate flow)
                    // If the response contains an answer, we treat it as Success.
                    // We TRY to find an ID to continue the chat.
                    const newId = response.id || response.conversationId || response.conversation_id;

                    if (newId) {
                        currentConvId = newId;
                        setConversationId(currentConvId);
                    } else if (response.answer) {
                        // Fallback to temp ID if we got an answer but no ID (stateless backend?)
                        // This matches the key used in useChat's mutation onSuccess
                        currentConvId = 'temp-new-id';
                        setConversationId(currentConvId);
                    }

                    if (response.answer) {
                        // It's already answered! We are done for this turn.
                        return; // pendingMessage will be cleared in finally logic or implicit unmount/rerender
                    }
                } finally {
                    // Start clearing it, but only if we have switched to a conversationId (where cache takes over)
                    // Ideally, we clear sort of immediately because the result will swap in.
                    setPendingMessage(null);
                }
            }

            if (currentConvId) {
                await sendMessage({ content: text, role: 'user' });
            }
        } catch (error) {
            console.error("Failed to send message", error);
            setPendingMessage(null);
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
                    console.log('[UI] Sidebar selected ID:', id);
                    setConversationId(id);
                }}
                onNewChat={() => setConversationId(undefined)}
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
                                    onEntityClick: handleEntityClick
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

                        {(isSending || isCreating) && (
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
                            disabled={isSending}
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
