import React from 'react';
import { Users } from 'lucide-react';

export const DiscussionsPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="p-4 bg-saffron/10 rounded-full">
                <Users className="h-12 w-12 text-saffron dark:text-gold" />
            </div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">Discussions</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Engage with the community and share your thoughts. Coming soon.
            </p>
        </div>
    );
};
