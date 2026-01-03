import React from 'react';
import { motion } from 'framer-motion';

export const KnowledgeGraphShowcase: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-24 border-t border-text-tertiary/10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
                    >
                        Visualise the Wisdom
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-text-secondary mb-8 leading-relaxed"
                    >
                        Explore the interconnected nature of Vedic concepts through our interactive Knowledge Graph.
                        See how entities relate to each other across different scriptures and timelines.
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="px-6 py-3 bg-surface-hover border border-primary/30 text-primary rounded-lg hover:bg-surface-active transition-colors"
                    >
                        Explore Graph ↗
                    </motion.button>
                </div>

                <div className="lg:w-1/2 relative">
                    {/* Abstract representation of a graph */}
                    <div className="relative aspect-square max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl" />

                        <svg viewBox="0 0 400 400" className="w-full h-full relative z-10 text-primary">
                            <motion.circle
                                cx="200" cy="200" r="40"
                                fill="currentColor"
                                fillOpacity="0.2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <circle cx="200" cy="200" r="8" fill="currentColor" />

                            {/* Nodes */}
                            {[0, 72, 144, 216, 288].map((angle, i) => {
                                const rad = (angle * Math.PI) / 180;
                                const x = 200 + 120 * Math.cos(rad);
                                const y = 200 + 120 * Math.sin(rad);
                                return (
                                    <g key={i}>
                                        <line x1="200" y1="200" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
                                        <motion.circle
                                            cx={x} cy={y} r="6"
                                            fill="#60A5FA" // Accent
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                        />
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};
