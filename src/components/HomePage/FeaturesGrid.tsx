import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Brain, Search, GitGraph } from 'lucide-react';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: <Brain className="w-8 h-8 text-primary" />,
        title: 'Vedic Knowledge Graph',
        description: 'Semantic understanding of 35,000+ verses connecting ancient wisdom with modern context.',
    },
    {
        icon: <Search className="w-8 h-8 text-secondary" />,
        title: 'Intelligent Search',
        description: 'Hybrid vector and graph-based search to find deep connections across scriptures.',
    },
    {
        icon: <GitGraph className="w-8 h-8 text-accent" />,
        title: 'Multi-hop Reasoning',
        description: 'Discover hidden relationships between concepts like Dharma, Karma, and Moksha.',
    },
];

export const FeaturesGrid: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full bg-surface/50 backdrop-blur-sm border-text-tertiary/10">
                            <div className="mb-4 p-3 bg-surface-hover rounded-xl w-fit">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-text-primary mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
