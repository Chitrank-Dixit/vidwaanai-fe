import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';

// Types
export interface MessageEntity {
    name: string;
    type: string;
    description?: string;
}

export interface MessageSource {
    title: string;
    ref: string;
}

export interface MessageProps {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    entities?: MessageEntity[];
    sources?: MessageSource[];
    onEntityClick?: (entity: string) => void;
}

export const UserMessage: React.FC<{ content: string }> = ({ content }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-6"
    >
        <div className="max-w-[85%] md:max-w-2xl flex gap-3 flex-row-reverse">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center border border-white/10">
                <User className="w-5 h-5 text-text-secondary" />
            </div>
            <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-2xl rounded-tr-sm px-5 py-3 shadow-lg">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    </motion.div>
);

export const AssistantMessage: React.FC<MessageProps> = ({ content, entities, sources, onEntityClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start mb-8"
    >
        <div className="max-w-[90%] md:max-w-3xl flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mt-1">
                <Sparkles className="w-4 h-4 text-primary" />
            </div>

            <div className="flex-1 space-y-4">
                {/* Main Content */}
                <Card className="bg-surface border-text-tertiary/10 !p-5 leading-relaxed text-text-primary shadow-sm hover:shadow-md transition-shadow">
                    <div className="prose prose-invert max-w-none">
                        {/* We can use ReactMarkdown here later */}
                        <p className="whitespace-pre-wrap">{content}</p>
                    </div>
                </Card>

                {/* Entities Context */}
                {entities && entities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {entities.map((entity, i) => (
                            <span
                                onClick={() => onEntityClick?.(entity.name)}
                                key={i}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-hover border border-text-tertiary/10 text-xs text-text-secondary cursor-pointer hover:border-primary/50 hover:text-primary transition-colors"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {entity.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Sources Context */}
                {sources && sources.length > 0 && (
                    <div className="bg-surface/50 rounded-lg p-3 border border-text-tertiary/10">
                        <h4 className="flex items-center gap-2 text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                            <BookOpen className="w-3 h-3" /> Sources
                        </h4>
                        <div className="space-y-1">
                            {sources.map((src, i) => (
                                <div key={i} className="text-sm text-text-secondary hover:text-primary cursor-pointer transition-colors truncate">
                                    {src.ref} • {src.title}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </motion.div>
);

export const ChatMessage: React.FC<{ message: MessageProps }> = ({ message }) => {
    if (message.role === 'user') return <UserMessage content={message.content} />;
    return <AssistantMessage {...message} />;
};
