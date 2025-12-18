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
                'flex w-full items-start gap-4 p-4 hover:bg-black/[0.02] transition-colors group',
                isUser ? 'flex-row-reverse' : ''
            )}
        >
            <div
                className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm z-10 border-2 bg-white',
                    isUser ? 'border-saffron text-saffron' : 'border-purple text-purple'
                )}
            >
                {isUser ? <User size={20} /> : <Bot size={20} />}
            </div>

            <div className={cn(
                'flex-1 space-y-2 rounded-xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow relative max-w-[80%] bg-white border-l-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]',
                isUser
                    ? 'border-l-saffron rounded-tr-none'
                    : 'border-l-purple rounded-tl-none'
            )}>

                <div className="prose prose-stone max-w-none break-words font-body text-charcoal">
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
                                    <code className="bg-cream-light border border-silver rounded px-1.5 py-0.5 font-medium text-purple text-sm" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-charcoal/90">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1 text-charcoal/90">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1 text-charcoal/90">{children}</ol>,
                            blockquote: ({ children }) => <blockquote className="border-l-4 border-gold pl-4 italic text-charcoal/80 my-2">{children}</blockquote>
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-silver/30">
                    <span className="text-xs text-charcoal/50 font-medium">
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {/* Action Buttons Placeholder */}
                    <div className="hidden group-hover:flex gap-2">
                        <button className="text-xs text-saffron hover:bg-saffron/10 px-2 py-1 rounded transition-colors">Copy</button>
                        <button className="text-xs text-saffron hover:bg-saffron/10 px-2 py-1 rounded transition-colors">Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
