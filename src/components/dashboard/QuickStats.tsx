import React from 'react';
import { MessageSquare, Calendar, Star, TrendingUp } from 'lucide-react';

export const QuickStats: React.FC = () => {
    const stats = [
        { name: 'Total Conversations', value: '12', icon: MessageSquare, change: '+2', changeType: 'increase' },
        { name: 'Daily Streak', value: '5 Days', icon: Calendar, change: 'Keep it up!', changeType: 'neutral' },
        { name: 'Scriptures Read', value: '24', icon: Star, change: '+4', changeType: 'increase' },
        { name: 'Spiritual Growth', value: 'Level 3', icon: TrendingUp, change: 'Rising', changeType: 'increase' },
    ];

    return (
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-lg bg-surface p-5 shadow border border-text-tertiary/10 hover:shadow-md transition-shadow"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-primary/10 p-3">
                                <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-text-secondary">{item.name}</p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                            <p className="text-2xl font-semibold text-text-primary">{item.value}</p>
                            <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <span className="sr-only">{item.changeType === 'increase' ? 'Increased by' : 'Decreased by'}</span>
                                {item.change}
                            </p>
                        </dd>
                    </div>
                )
            })}
        </dl>
    );
};
