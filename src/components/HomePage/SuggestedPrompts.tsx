import React from 'react';
import { motion } from 'framer-motion';

interface SuggestedPromptsProps {
    prompts: string[];
}

export const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
        >
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    className="px-4 py-2 bg-surface/50 backdrop-blur-sm border border-text-tertiary/20 rounded-full text-sm text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-200"
                >
                    {prompt}
                </button>
            ))}
        </motion.div>
    );
};
