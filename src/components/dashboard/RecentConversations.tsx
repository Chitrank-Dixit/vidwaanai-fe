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
        <div className="rounded-lg bg-surface shadow border border-text-tertiary/10">
            <div className="border-b border-text-tertiary/10 px-4 py-5 sm:px-6 flex items-center justify-between">
                <h3 className="text-base font-semibold leading-6 text-text-primary">Recent Conversations</h3>
                <Link to="/chat" className="text-sm font-medium text-primary hover:text-primary-hover hover:underline flex items-center gap-1">
                    View all <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="px-4 py-5 sm:p-6">
                {conversations.length > 0 ? (
                    <ul className="divide-y divide-text-tertiary/10">
                        {conversations.map((convo) => (
                            <li key={convo.id} className="py-4 hover:bg-surface-hover -mx-4 px-4 transition-colors">
                                <Link to={`/chat?id=${convo.id}`} className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background border border-text-tertiary/10">
                                            <MessageSquare className="h-6 w-6 text-text-tertiary" aria-hidden="true" />
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                                            {convo.title || 'Untitled Conversation'}
                                        </p>
                                        <p className="text-sm text-text-secondary truncate">
                                            {convo.lastMessage || 'No messages yet'}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-sm text-text-tertiary">
                                        {convo.timestamp ? new Date(convo.timestamp).toLocaleDateString() : 'Just now'}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-6 text-text-tertiary">
                        <p>No conversations yet.</p>
                        <Link to="/chat" className="mt-2 text-primary font-medium hover:underline">Start a new chat</Link>
                    </div>
                )}
            </div>
        </div>
    );
};
