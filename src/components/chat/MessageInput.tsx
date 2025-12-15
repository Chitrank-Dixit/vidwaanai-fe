import { useState, useRef, type KeyboardEvent } from 'react';
import { Button } from '@/components/common/Button';
import { Send } from 'lucide-react';

interface MessageInputProps {
    onSendMessage: (content: string) => void;
    isLoading: boolean;
}

export const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
    const [content, setContent] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = () => {
        if (!content.trim() || isLoading) return;
        onSendMessage(content);
        setContent('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mx-auto flex max-w-4xl gap-4">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 resize-none rounded-md border border-slate-300 bg-transparent p-3 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:text-white"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '200px' }}
                />
                <Button onClick={handleSubmit} disabled={!content.trim() || isLoading} className="h-auto">
                    <Send size={20} />
                </Button>
            </div>
        </div>
    );
};
