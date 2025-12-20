import React from 'react';
import { Flower2 } from 'lucide-react';

export const MeditationsPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
            <div className="p-4 bg-saffron/10 rounded-full">
                <Flower2 className="h-12 w-12 text-saffron dark:text-gold" />
            </div>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">Meditations</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Guided meditations for spiritual growth. Coming soon to help you find your center.
            </p>
        </div>
    );
};
