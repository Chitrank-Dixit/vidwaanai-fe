import React from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/common/Button';

interface ConversationSidebarProps {
    conversations: any[];
}

export const ConversationSidebar: React.FC<ConversationSidebarProps> = ({ conversations }) => {
    const { createConversation, selectConversation, currentConversation } = useChat();

    return (
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-indigo flex flex-col h-full hidden md:flex">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <Button className="w-full flex items-center justify-center gap-2" onClick={() => createConversation('New Chat')}>
                    <Plus className="h-4 w-4" /> New Chat
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {conversations.map((convo) => (
                    <button
                        key={convo.id}
                        onClick={() => selectConversation(convo.id)}
                        className={`w-full text-left px-3 py-3 rounded-md flex items-center gap-3 transition-colors ${currentConversation?.id === convo.id
                            ? 'bg-saffron/10 text-saffron dark:text-gold'
                            : 'text-charcoal dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-indigo-dark'
                            }`}
                    >
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <div className="min-w-0">
                            <p className="font-medium truncate text-sm">{convo.title || 'New Conversation'}</p>
                            <p className="text-xs text-gray-500 truncate">{convo.lastMessage || 'No messages'}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
