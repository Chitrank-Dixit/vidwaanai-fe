export interface Message {
    id: string;
    conversationId: string;
    userId: string;
    content: string;
    role: 'user' | 'assistant';
    createdAt: string;
    updatedAt?: string;
    status?: 'sending' | 'sent' | 'failed';
}

export interface Conversation {
    id: string;
    userId: string;
    title: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
}
