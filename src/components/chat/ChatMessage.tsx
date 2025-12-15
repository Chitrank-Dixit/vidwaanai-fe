import type { Message } from '@/types/chat';
import { cn } from '@/utils/cn';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex w-full items-start gap-4 p-4',
                isUser ? 'flex-row-reverse bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-800'
            )}
        >
            <div
                className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    isUser ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                )}
            >
                {isUser ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div className={cn('flex-1 space-y-2 overflow-hidden', isUser ? 'text-right' : 'text-left')}>
                <div className="prose prose-slate dark:prose-invert max-w-none break-words inline-block text-left">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
                <div className="text-xs text-slate-400">
                    {new Date(message.createdAt).toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
};
