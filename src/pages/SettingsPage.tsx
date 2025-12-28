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
                <h1 className="text-3xl font-display font-bold leading-tight text-text-primary">
                    Settings
                </h1>
            </div>

            <div className="space-y-6">
                {/* Display Prefs */}
                <div className="bg-surface shadow rounded-lg overflow-hidden border border-text-tertiary/10">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium leading-6 text-text-primary mb-4">Display Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-text-tertiary/10 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-text-primary block">Theme</label>
                                    <p className="text-text-secondary">Choose your preferred interface theme</p>
                                </div>
                                <select
                                    value={settings.theme}
                                    onChange={(e) =>
                                        setSettings({ ...settings, theme: e.target.value })
                                    }
                                    className="mt-1 block w-32 rounded-md border-text-tertiary/20 bg-surface-hover py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm text-text-primary"
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                    <option value="auto">Auto</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-text-tertiary/10 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-text-primary block">Language</label>
                                    <p className="text-text-secondary">Select your preferred language</p>
                                </div>
                                <select
                                    value={settings.language}
                                    onChange={(e) =>
                                        setSettings({ ...settings, language: e.target.value })
                                    }
                                    className="mt-1 block w-32 rounded-md border-text-tertiary/20 bg-surface-hover py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm text-text-primary"
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
                <div className="bg-surface shadow rounded-lg overflow-hidden border border-text-tertiary/10">
                    <div className="px-4 py-5 sm:p-6">
                        <h2 className="text-lg font-medium leading-6 text-text-primary mb-4">Notifications</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-text-tertiary/10 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-text-primary block">Push Notifications</label>
                                    <p className="text-text-secondary">Receive notifications on your device</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={() => handleToggle('notifications')}
                                    className="h-4 w-4 rounded border-gray-300 text-saffron focus:ring-saffron"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-text-tertiary/10 last:border-0 text-sm">
                                <div>
                                    <label className="font-medium text-text-primary block">Email Updates</label>
                                    <p className="text-text-secondary">Receive email updates about new content</p>
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
