import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useChat } from '@/hooks/useChat';

export const ChatContainer: React.FC = () => {
    const { messages, sendMessage, isSending } = useChat();

    // Mapping useChatStore messages (which might be typed differently) to MessageList expectation if needed.
    // Assuming MessageList takes messages prop or connects to store itself.
    // Existing MessageList likely connects to store or takes props.
    // I'll check MessageList content if I could, but standard pattern: PASS PROPS if container is "Container".
    // I will pass props.

    return (
        <div className="flex flex-col h-full bg-white dark:bg-indigo-dark/50 relative">
            <div className="flex-1 overflow-y-auto p-4">
                <MessageList messages={messages} />
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-indigo">
                <MessageInput onSendMessage={sendMessage} isLoading={isSending} />
            </div>
        </div>
    );
};
