import React from 'react';
import { Bookmark } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="p-4 bg-saffron/10 rounded-full">
                <Bookmark className="h-12 w-12 text-saffron dark:text-gold" />
            </div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">Bookmarks</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Your saved scriptures and passages will appear here.
            </p>
        </div>
    );
};
