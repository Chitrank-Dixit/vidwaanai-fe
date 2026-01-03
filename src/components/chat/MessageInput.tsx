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
        <div className="border-t border-text-tertiary/10 bg-background p-4 shrink-0">
            <div className="mx-auto flex max-w-4xl gap-4 items-end">
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask Vidwaan..."
                        disabled={isLoading}
                        className="w-full resize-none rounded-lg border-2 border-text-tertiary/10 bg-surface p-4 pr-12 text-text-primary placeholder:text-text-tertiary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 font-body shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        rows={1}
                        style={{ minHeight: '60px', maxHeight: '200px' }}
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() || isLoading}
                    className="h-[60px] w-auto px-6 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                    {isLoading ? <span className="animate-spin">⏳</span> : <><span>Send</span> <Send size={18} /></>}
                </Button>
            </div>
        </div>
    );
};
