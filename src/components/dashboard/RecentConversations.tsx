import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface Conversation {
    id: string;
    title: string;
    lastMessage?: string;
    timestamp?: string; // or Date
}

interface RecentConversationsProps {
    conversations: Conversation[];
}

export const RecentConversations: React.FC<RecentConversationsProps> = ({ conversations }) => {
    return (
        <div className="rounded-lg bg-white dark:bg-indigo shadow border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-charcoal dark:text-white">Recent Conversations</h3>
                <Link to="/chat" className="text-sm font-medium text-saffron hover:text-saffron-dark dark:text-gold hover:underline flex items-center gap-1">
                    View all <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="px-4 py-5 sm:p-6">
                {conversations.length > 0 ? (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {conversations.map((convo) => (
                            <li key={convo.id} className="py-4 hover:bg-gray-50 dark:hover:bg-indigo-dark/50 -mx-4 px-4 transition-colors">
                                <Link to={`/chat?id=${convo.id}`} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cream dark:bg-indigo-dark border border-gray-200 dark:border-gray-600">
                                            <MessageSquare className="h-6 w-6 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-charcoal dark:text-white group-hover:text-saffron transition-colors">
                                            {convo.title || 'Untitled Conversation'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {convo.lastMessage || 'No messages yet'}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-sm text-gray-400">
                                        {convo.timestamp ? new Date(convo.timestamp).toLocaleDateString() : 'Just now'}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                        <p>No conversations yet.</p>
                        <Link to="/chat" className="mt-2 text-saffron font-medium hover:underline">Start a new chat</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
