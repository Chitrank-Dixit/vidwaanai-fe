import { useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useAuth } from '@/hooks/useAuth';

export const ChatWindow = () => {
    const { messages, sendMessage, loadMessages, currentConversation, isSending } = useChat();
    const { user } = useAuth();

    useEffect(() => {
        // For now, if no conversation is selected, we could create one or select default
        // This logic might need to be expanded to auto-select or show a sidebar
        if (currentConversation) {
            loadMessages(currentConversation.id);
        }
    }, [currentConversation, loadMessages]);

    const handleSendMessage = async (content: string) => {
        if (!user) return;
        await sendMessage(content);
    };

    return (
        <div className="flex h-full flex-col bg-cream font-sans">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} isLoading={isSending} />
        </div>
    );
};
