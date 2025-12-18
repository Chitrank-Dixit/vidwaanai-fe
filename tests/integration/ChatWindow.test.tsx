import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatWindow } from '../../src/components/chat/ChatWindow';
import { useChat } from '../../src/hooks/useChat';
import { useAuth } from '../../src/hooks/useAuth';

// Mock hooks
vi.mock('../../src/hooks/useChat', () => ({
    useChat: vi.fn(),
}));

vi.mock('../../src/hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

// Mock react-markdown
vi.mock('react-markdown', () => ({
    default: ({ children }: { children: string }) => <div>{children}</div>
}));

// Mock SyntaxHighlighter
vi.mock('react-syntax-highlighter', () => ({
    Prism: ({ children }: { children: string }) => <pre>{children}</pre>,
}));

describe('ChatWindow Integration', () => {
    const mockSendMessage = vi.fn();
    const mockLoadConversations = vi.fn();
    const mockLoadMessages = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        Element.prototype.scrollIntoView = vi.fn();

        // Setup default auth mock
        (useAuth as any).mockReturnValue({
            user: { id: '1', fullName: 'Test User' },
            login: vi.fn(),
        });

        // Setup default chat mock
        (useChat as any).mockReturnValue({
            messages: [],
            isLoading: false,
            isSending: false,
            error: null,
            sendMessage: mockSendMessage,
            loadConversations: mockLoadConversations,
            loadMessages: mockLoadMessages,
            currentConversation: null,
        });
    });

    it('renders chat window correctly', () => {
        render(<ChatWindow />);
        expect(screen.getByPlaceholderText(/ask vidwaan/i)).toBeInTheDocument();
    });

    it('displays messages', () => {
        (useChat as any).mockReturnValue({
            messages: [
                { id: '1', role: 'user', content: 'Hello', createdAt: new Date().toISOString() },
                { id: '2', role: 'assistant', content: 'Hi there', createdAt: new Date().toISOString() },
            ],
            isLoading: false,
            isSending: false,
            error: null,
            sendMessage: mockSendMessage,
            loadConversations: mockLoadConversations,
            loadMessages: mockLoadMessages,
            currentConversation: { id: '1', title: 'Test' },
        });

        render(<ChatWindow />);
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Hi there')).toBeInTheDocument();
    });

    it('handles message submission', async () => {
        render(<ChatWindow />);
        const input = screen.getByPlaceholderText(/ask vidwaan/i);
        fireEvent.change(input, { target: { value: 'New message' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });
        await waitFor(() => {
            expect(mockSendMessage).toHaveBeenCalledWith('New message');
        });
    });

    it('disables input while sending', () => {
        (useChat as any).mockReturnValue({
            messages: [],
            isLoading: false,
            isSending: true,
            error: null,
            sendMessage: mockSendMessage,
            loadConversations: mockLoadConversations,
            loadMessages: mockLoadMessages,
            currentConversation: null,
        });

        render(<ChatWindow />);
        expect(screen.getByPlaceholderText(/ask vidwaan/i)).toBeDisabled();
    });
});
