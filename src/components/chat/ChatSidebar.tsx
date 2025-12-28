import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import type { Conversation } from '../../api/chat';

interface ChatSidebarProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    conversations: Conversation[];
    currentId?: string;
    onSelect: (id: string) => void;
    onNewChat: () => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    open,
    onClose,
    className,
    conversations,
    currentId,
    onSelect,
    onNewChat
}) => {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay for mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                    />

                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                        className={clsx(
                            'fixed md:static inset-y-0 left-0 z-50',
                            'w-72 bg-surface border-r border-text-tertiary/10',
                            'flex flex-col',
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-text-tertiary/10 flex items-center justify-between">
                            <span className="font-semibold text-text-primary flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-primary" />
                                History
                            </span>
                            <button
                                onClick={onClose}
                                className="md:hidden p-1 hover:bg-surface-hover rounded-md text-text-secondary"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* New Chat Button */}
                        <div className="p-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 border-dashed border-text-tertiary/30"
                                onClick={onNewChat}
                            >
                                <Plus className="w-4 h-4" />
                                New Conversation
                            </Button>
                        </div>

                        {/* Scrollable list */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
                                Recent
                            </div>

                            {/* Mock items */}
                            {/* Recent Conversations */}
                            {conversations.length === 0 ? (
                                <div className="text-sm text-text-tertiary px-2 italic">No conversations yet</div>
                            ) : (
                                conversations.map((conv) => (
                                    <button
                                        key={conv.id}
                                        onClick={() => onSelect(conv.id)}
                                        className={clsx(
                                            "w-full text-left p-3 rounded-lg transition-colors group",
                                            currentId === conv.id ? "bg-surface-active" : "hover:bg-surface-hover"
                                        )}
                                    >
                                        <div className={clsx(
                                            "text-sm font-medium truncate transition-colors",
                                            currentId === conv.id ? "text-primary" : "text-text-primary group-hover:text-primary"
                                        )}>
                                            {conv.title}
                                        </div>
                                        <div className="text-xs text-text-tertiary mt-1 flex justify-between">
                                            <span>{new Date(conv.updatedAt).toLocaleDateString()}</span>
                                            <span>{conv.messageCount} msgs</span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer / User Profile placeholder */}
                        <div className="p-4 border-t border-text-tertiary/10">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-hover cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-primary/20" />
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-text-primary truncate">User Name</div>
                                    <div className="text-xs text-text-secondary">Free Plan</div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
