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
        <div className="border-t border-silver/50 bg-cream/80 p-4 dark:border-purple-dark dark:bg-indigo shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] backdrop-blur-sm">
            <div className="mx-auto flex max-w-4xl gap-4 items-end">
                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Vidwaan..."
                    className="flex-1 resize-none rounded-lg border border-silver bg-white p-3 focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 dark:border-purple-light dark:bg-indigo-light dark:text-white font-body shadow-sm transition-colors text-charcoal placeholder:text-gray-400"
                    rows={1}
                    style={{ minHeight: '50px', maxHeight: '200px' }}
                />
                <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isLoading}
                    className="h-[50px] w-[50px] rounded-lg bg-saffron hover:bg-saffron-light text-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all"
                >
                    {isLoading ? <span className="animate-spin">⏳</span> : <Send size={20} />}
                </Button>
            </div>
        </div>
    );
};
