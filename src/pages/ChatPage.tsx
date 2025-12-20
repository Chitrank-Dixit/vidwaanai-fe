import React, { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { ConversationSidebar } from '@/components/chat/ConversationSidebar';

export const ChatPage: React.FC = () => {
    const { conversations, loadConversations } = useChat();

    useEffect(() => {
        loadConversations();
    }, [loadConversations]);

    return (
        <div className="flex h-[calc(100vh-64px)] -m-4 sm:-m-6 lg:-m-8">
            {/* Sidebar - hidden on mobile, need mobile drawer logic if full responsive, but sticking to requested structure */}
            <ConversationSidebar conversations={conversations} />
            <div className="flex-1 h-full min-w-0">
                <ChatContainer />
            </div>
        </div>
    );
};
