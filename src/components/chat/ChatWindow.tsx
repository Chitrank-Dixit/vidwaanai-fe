import { useEffect } from 'react';
import { useChatStore } from '@/store/chatStore';
import { socketService } from '@/services/socketService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useAuthStore } from '@/store/authStore';

export const ChatWindow = () => {
    const { messages, addMessage } = useChatStore();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        socketService.connect();
        return () => {
            socketService.disconnect();
        }
    }, []);

    const handleSendMessage = (content: string) => {
        if (!user) return;

        // Optimistic update
        const newMessage = {
            id: Date.now().toString(),
            conversationId: 'default',
            userId: user.id,
            content,
            role: 'user' as const,
            createdAt: new Date().toISOString(),
            status: 'sending' as const,
        };

        addMessage(newMessage);
        socketService.sendMessage(content, 'default');

        // Mock response for MVP without backend
        setTimeout(() => {
            const botMessage = {
                id: (Date.now() + 1).toString(),
                conversationId: 'default',
                userId: 'bot',
                content: `Echo: ${content}`,
                role: 'assistant' as const,
                createdAt: new Date().toISOString(),
            };
            addMessage(botMessage);
        }, 1000);
    };

    return (
        <div className="flex h-full flex-col bg-white dark:bg-slate-950">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} isLoading={false} />
        </div>
    );
};
