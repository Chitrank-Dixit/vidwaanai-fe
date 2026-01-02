import React from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
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
                            'w-[260px] bg-[#171717] text-gray-200 flex flex-col',
                            'border-r border-white/10', // Subtle border
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="p-3 mb-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2 border-white/20 hover:bg-white/10 text-white bg-transparent transition-colors"
                                onClick={onNewChat}
                            >
                                <span className="flex-1 text-left text-sm">New chat</span>
                                <Plus className="w-4 h-4 text-gray-400" />
                            </Button>
                        </div>

                        {/* Scrollable list */}
                        <div className="flex-1 overflow-y-auto px-3 py-1 space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <div className="text-xs font-semibold text-gray-500 px-2 pt-2 pb-1">
                                Recent
                            </div>

                            {/* Recent Conversations */}
                            {conversations.filter(c => c.id).length === 0 ? (
                                <div className="text-sm text-gray-500 px-2 italic">No conversations yet</div>
                            ) : (
                                conversations.filter(c => c.id).map((conv) => (
                                    <button
                                        key={conv.id}
                                        onClick={() => onSelect(conv.id)}
                                        className={clsx(
                                            "w-full text-left px-3 py-2 rounded-lg transition-colors group relative overflow-hidden",
                                            currentId === conv.id
                                                ? "bg-white/10 text-white"
                                                : "text-gray-300 hover:bg-white/5"
                                        )}
                                    >
                                        <div className="text-sm font-medium truncate relative z-10">
                                            {conv.title || 'New Chat'}
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-white/10 mt-auto">
                            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-sm text-gray-200">
                                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold">
                                    CD
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="truncate font-medium">Chitrank Dixit</div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
