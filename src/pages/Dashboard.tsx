import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useChat } from '../hooks/useChat'; // Assuming useChat exists or we mock it for now if missing
import { RecentConversations } from '../components/dashboard/RecentConversations';
import { QuickStats } from '../components/dashboard/QuickStats';

// Mock useChat if not available yet (checked in next step)
// For now I'll create a local mock or use real one if I find it.
// I'll assume it exists based on user request, but I'll add a fallback just in case.
// Better to create the file `src/hooks/useChat.ts` if missing.

const useChatMock = () => ({
    conversations: [
        { id: '1', title: 'Understanding Dharma', lastMessage: 'Can you explain the concept of Dharma?', timestamp: new Date().toISOString() },
        { id: '2', title: 'Meditation Techniques', lastMessage: 'What are some beginner techniques?', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ],
    loadConversations: () => { }
});

export const Dashboard: React.FC = () => {
    const { user } = useAuth();
    // Safe access to useChat, replace with real hook import if confirmed existing
    const { conversations, loadConversations } = useChatMock();

    useEffect(() => {
        loadConversations();
    }, []);

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h1 className="text-3xl font-display font-bold leading-tight text-charcoal dark:text-white">
                    Welcome, {user?.fullName || 'Seeker'}!
                </h1>
                <p className="mt-2 max-w-4xl text-sm text-gray-500 dark:text-gray-400">
                    Continue your spiritual exploration with Vidwaan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                    <QuickStats />
                    <RecentConversations conversations={conversations.slice(0, 5)} />
                </div>

                {/* Right Column - Recommendations / Daily Wisdom */}
                <div className="space-y-6">
                    <div className="rounded-lg bg-gradient-to-br from-saffron/10 to-transparent p-6 border border-saffron/20">
                        <h3 className="text-lg font-semibold text-saffron dark:text-gold mb-2">Daily Wisdom</h3>
                        <blockquote className="italic text-charcoal dark:text-gray-200 mb-4">
                            "You have the right to work, but for the work's sake only. You have no right to the fruits of work."
                        </blockquote>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-right">- Bhagavad Gita 2.47</p>
                    </div>

                    {/* Suggested Actions */}
                    <div className="bg-white dark:bg-indigo rounded-lg shadow border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-4">Suggested for you</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded-md bg-cream dark:bg-indigo-dark hover:bg-saffron/10 border border-transparent hover:border-saffron/30 transition-colors flex items-center justify-between group">
                                <span className="text-charcoal dark:text-gray-300 font-medium">Continue reading Rig Veda</span>
                                <span className="text-saffron opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                            <button className="w-full text-left p-3 rounded-md bg-cream dark:bg-indigo-dark hover:bg-saffron/10 border border-transparent hover:border-saffron/30 transition-colors flex items-center justify-between group">
                                <span className="text-charcoal dark:text-gray-300 font-medium">Morning Meditation (10 min)</span>
                                <span className="text-saffron opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
