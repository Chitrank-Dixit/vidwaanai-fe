import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
    });

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h1 className="text-3xl font-display font-bold leading-tight text-charcoal dark:text-white">
                    Profile Settings
                </h1>
            </div>

            <div className="bg-white dark:bg-indigo shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-charcoal dark:text-white mb-4">Account Information</h3>

                    {!isEditing ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                                <div className="sm:col-span-2 text-charcoal dark:text-gray-200 font-medium">{user?.fullName}</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                                <div className="sm:col-span-2 text-charcoal dark:text-gray-200">{user?.email}</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
                                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                                <div className="sm:col-span-2">
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                        {/* @ts-ignore */}
                                        {user?.verified || 'Active'}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button onClick={() => setIsEditing(true)} variant="secondary">
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6">
                            <Input
                                label="Full Name"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                            {/* Email usually cleaner not to edit or requires verification flow */}
                            <div className="opacity-50 pointer-events-none">
                                <Input
                                    label="Email (Cannot be changed)"
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                />
                            </div>

                            <div className="flex gap-4">
                                <Button type="button" onClick={() => setIsEditing(false)}>
                                    Save Changes
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    variant="secondary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
