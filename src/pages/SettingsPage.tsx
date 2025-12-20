import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/common/Button';

export const SettingsPage: React.FC = () => {
    // const { user } = useAuth();
    const [settings, setSettings] = useState({
        theme: 'light',
        language: 'en',
        notifications: true,
        emailUpdates: false,
    });

    const handleToggle = (key: string) => {
        // @ts-ignore
        setSettings((prev) => ({
            ...prev,
            // @ts-ignore
            [key]: !prev[key],
        }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h1 className="text-3xl font-display font-bold leading-tight text-charcoal dark:text-white">
                    Settings
                </h1>
            </div>

            <div className="space-y-6">
                {/* Display Prefs */}
                <div className="bg-white dark:bg-indigo shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium leading-6 text-charcoal dark:text-white mb-4">Display Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-charcoal dark:text-gray-200 block">Theme</label>
                                    <p className="text-gray-500 dark:text-gray-400">Choose your preferred interface theme</p>
                                </div>
                                <select
                                    value={settings.theme}
                                    onChange={(e) =>
                                        setSettings({ ...settings, theme: e.target.value })
                                    }
                                    className="mt-1 block w-32 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-indigo-dark py-2 pl-3 pr-10 text-base focus:border-saffron focus:outline-none focus:ring-saffron sm:text-sm text-charcoal dark:text-white"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-charcoal dark:text-gray-200 block">Language</label>
                                    <p className="text-gray-500 dark:text-gray-400">Select your preferred language</p>
                                </div>
                                <select
                                    value={settings.language}
                                    onChange={(e) =>
                                        setSettings({ ...settings, language: e.target.value })
                                    }
                                    className="mt-1 block w-32 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-indigo-dark py-2 pl-3 pr-10 text-base focus:border-saffron focus:outline-none focus:ring-saffron sm:text-sm text-charcoal dark:text-white"
                                >
                                    <option value="en">English</option>
                                    <option value="hi">Hindi</option>
                                    <option value="sa">Sanskrit</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white dark:bg-indigo shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium leading-6 text-charcoal dark:text-white mb-4">Notifications</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-charcoal dark:text-gray-200 block">Push Notifications</label>
                                    <p className="text-gray-500 dark:text-gray-400">Receive notifications on your device</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={() => handleToggle('notifications')}
                                    className="h-4 w-4 rounded border-gray-300 text-saffron focus:ring-saffron"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-charcoal dark:text-gray-200 block">Email Updates</label>
                                    <p className="text-gray-500 dark:text-gray-400">Receive email updates about new content</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailUpdates}
                                    onChange={() => handleToggle('emailUpdates')}
                                    className="h-4 w-4 rounded border-gray-300 text-saffron focus:ring-saffron"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button>Save Settings</Button>
                </div>
            </div>
        </div>
    );
};
