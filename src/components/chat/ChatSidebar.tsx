import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreHorizontal, Trash2 } from 'lucide-react';
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
    onDelete: (id: string) => void;
    hasNextPage?: boolean;
    fetchNextPage?: () => void;
    isFetchingNextPage?: boolean;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
    open,
    onClose,
    className,
    conversations,
    currentId,
    onSelect,
    onNewChat,
    onDelete,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
}) => {
    const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClick = () => setOpenMenuId(null);
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage?.();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);
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
                            'w-[260px] bg-surface text-text-primary flex flex-col',
                            'border-r border-surface-active', // Semantic border
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="p-3 mb-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 border-surface-active hover:bg-surface-hover text-text-primary bg-transparent transition-colors"
                                onClick={onNewChat}
                            >
                                <span className="flex-1 text-left text-sm">New chat</span>
                                <Plus className="w-4 h-4 text-text-tertiary" />
                            </Button>
                        </div>

                        {/* Scrollable list */}
                        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2 scrollbar-clean">
                            <div className="text-xs font-semibold text-text-tertiary px-2 pt-2 pb-1">
                                Recent
                            </div>

                            {/* Recent Conversations */}
                            {conversations.filter(c => c.id).length === 0 ? (
                                <div className="text-sm text-text-tertiary px-2 italic">No conversations yet</div>
                            ) : (
                                conversations.filter(c => c.id).map((conv, index, arr) => (
                                    <div key={conv.id} className="relative group">
                                        <button
                                            onClick={() => onSelect(conv.id)}
                                            className={clsx(
                                                "w-full text-left px-3 py-2 rounded-lg transition-colors relative overflow-hidden pr-8",
                                                currentId === conv.id
                                                    ? "bg-surface-active text-text-primary font-medium"
                                                    : "text-text-secondary hover:bg-surface-hover"
                                            )}
                                        >
                                            <div className="text-sm truncate relative z-10 block pr-4">
                                                {conv.title || 'New Chat'}
                                            </div>
                                        </button>

                                        {/* Menu Trigger */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenuId(openMenuId === conv.id ? null : conv.id);
                                            }}
                                            className={clsx(
                                                "absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-text-tertiary hover:bg-surface-active hover:text-text-primary z-20 outline-none",
                                                openMenuId === conv.id ? "opacity-100 bg-surface-active" : "opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                                            )}
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {openMenuId === conv.id && (
                                            <div
                                                className={clsx(
                                                    "absolute right-2 w-32 bg-surface border border-surface-active shadow-xl rounded-md z-50 overflow-hidden ring-1 ring-black/5",
                                                    index > arr.length - 3 ? "bottom-full mb-1" : "top-full mt-1"
                                                )}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => {
                                                        onDelete(conv.id);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full text-left px-3 py-2 text-sm text-error hover:bg-error/10 flex items-center gap-2 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete chat
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                            <div ref={loadMoreRef} className="h-4 w-full" />
                            {isFetchingNextPage && <div className="text-center py-2 text-xs text-text-tertiary">Loading...</div>}
                        </div>


                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
