import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import type { Message } from '@/types/chat';

class SocketService {
    private socket: Socket | null = null;
    private url: string = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

    connect() {
        const token = useAuthStore.getState().token;
        if (!token) return;

        if (this.socket?.connected) return;

        this.socket = io(this.url, {
            auth: { token },
            transports: ['websocket'],
        });

        this.setupListeners();
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    private setupListeners() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        this.socket.on('message:receive', (message: Message) => {
            // We need to adapt the message to match the store's expectation if different
            useChatStore.getState().addMessage(message);
        });

        // Error handling
        this.socket.on('error', (error: any) => {
            console.error('Socket error:', error);
        });
    }

    sendMessage(content: string, conversationId: string) {
        if (!this.socket) return;

        const token = useAuthStore.getState().token;
        if (!token) return;

        this.socket.emit('message:send', { content, conversationId });
    }
}

export const socketService = new SocketService();
