import type { Message } from '@/types/chat';
import { cn } from '@/utils/cn';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex w-full items-start gap-4 p-4',
                isUser ? 'flex-row-reverse' : ''
            )}
        >
            <div
                className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md z-10',
                    isUser ? 'bg-saffron text-white border-2 border-white' : 'bg-white text-purple border-2 border-purple/20'
                )}
            >
                {isUser ? <User size={20} /> : <span className="text-xl">🕉️</span>}
            </div>

            <div className={cn(
                'flex-1 space-y-2 overflow-hidden rounded-2xl p-4 shadow-sm relative max-w-[85%]',
                isUser
                    ? 'bg-saffron text-white rounded-tr-none shadow-md'
                    : 'bg-white text-charcoal border border-silver rounded-tl-none shadow-sm dark:bg-indigo-light dark:text-gray-100'
            )}>
                {/* Decorative Corner for Agent */}
                {!isUser && (
                    <div className="absolute top-0 left-0 h-4 w-4">
                        <svg viewBox="0 0 10 10" className="text-silver fill-current opacity-50">
                            <path d="M0 0 L10 0 L0 10 Z" />
                        </svg>
                    </div>
                )}

                <div className={cn("prose max-w-none break-words font-body", isUser ? "prose-invert text-white marker:text-white/70" : "prose-stone dark:prose-invert")}>
                    <ReactMarkdown
                        components={{
                            code({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={vscDarkPlus as any}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{ borderRadius: '0.5rem', margin: '1rem 0' }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={cn("rounded px-1 py-0.5 font-medium", isUser ? "bg-white/20 text-white" : "bg-black/5 text-purple")} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
                <div className={cn("text-xs mt-2 flex items-center gap-1", isUser ? "text-white/70" : "text-charcoal/50")}>
                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};
