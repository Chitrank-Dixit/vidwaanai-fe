import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Menu, Settings, Database } from 'lucide-react';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { ChatInputBox } from '../components/chat/ChatInputBox';
import { ChatMessage } from '../components/chat/ChatMessage';
import { useChat } from '../hooks/useChat';



export const ChatInterface: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get('q');

    // We would manage conversation ID here, potentially creating a new one if needed
    // For now, we'll assume a 'new' context or manage ID via state if utilizing the hook's creation capability
    const [conversationId, setConversationId] = useState<string | undefined>(undefined);

    const { messages, sendMessage, isSending, createConversation, history } = useChat(conversationId);

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
                // Create new conversation on first message
                const newConv = await createConversation(text.slice(0, 30) + "...");
                if (newConv.success && newConv.data) {
                    currentConvId = newConv.data.id;
                    setConversationId(currentConvId);
                }
            }

            if (currentConvId) {
                await sendMessage({ content: text, role: 'user' });
            }
        } catch (error) {
            console.error("Failed to send message", error);
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
                onSelect={(id) => setConversationId(id)}
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
                        <button className="p-2 hover:bg-surface-hover rounded-lg text-text-secondary">
                            <Settings className="w-5 h-5" />
                        </button>
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
                        {isSending && (
                            <div className="flex justify-start animate-pulse mb-8">
                                <div className="bg-surface-hover h-12 w-32 rounded-lg"></div>
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
