import { useEffect, useRef } from 'react';
import type { Message } from '@/types/chat';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
    messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto w-full">
            <div className="mx-auto flex max-w-4xl flex-col pb-4">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef} />
            </div>
        </div>
    );
};
