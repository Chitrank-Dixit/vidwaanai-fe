import React, { useState } from 'react';
import clsx from 'clsx';
import { Loader2, Send } from 'lucide-react'; // Assuming lucide-react is available, or use a substitute

interface ChatInputBoxProps {
    onSubmit: (text: string) => void;
    placeholder?: string;
    size?: 'small' | 'large';
    disabled?: boolean;
}

export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
    onSubmit,
    placeholder = 'Ask anything...',
    size = 'small',
    disabled
}) => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim() && !disabled) {
            onSubmit(text);
            setText('');
        }
    };

    return (
        <div
            className={clsx(
                'relative rounded-full w-full max-w-2xl mx-auto',
                'bg-surface/80 backdrop-blur-md',
                'border border-text-tertiary/20 focus-within:border-primary/50',
                'focus-within:ring-4 focus-within:ring-primary/5',
                'transition-all duration-300',
                size === 'large' && 'p-2 shadow-xl hover:shadow-2xl',
                size === 'small' && 'p-1.5 shadow-lg'
            )}
        >
            <div className="flex items-center gap-3 pl-4 pr-1">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={clsx(
                        'flex-1 bg-transparent text-text-primary placeholder-text-tertiary/50',
                        'focus:outline-none min-w-0',
                        size === 'large' && 'text-lg py-2',
                        size === 'small' && 'text-base py-1.5'
                    )}
                />
                <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || disabled}
                    className={clsx(
                        'flex-shrink-0 rounded-full flex items-center justify-center',
                        'bg-gradient-to-r from-primary to-secondary',
                        'text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-all duration-200',
                        size === 'large' && 'w-12 h-12',
                        size === 'small' && 'w-10 h-10'
                    )}
                >
                    {disabled ? (
                        <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                        <Send className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
};
