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
                <h1 className="text-3xl font-display font-bold leading-tight text-text-primary">
                    Profile Settings
                </h1>
            </div>

            <div className="bg-surface shadow rounded-lg overflow-hidden border border-gray-100 dark:border-none">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-text-primary mb-4">Account Information</h3>

                    {!user ? (
                        <div className="py-8 text-center text-text-tertiary">
                            Loading profile information...
                        </div>
                    ) : !isEditing ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                                <div className="sm:col-span-2 text-text-primary font-medium">{user.fullName || 'N/A'}</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <label className="text-sm font-medium text-text-secondary">Email</label>
                                <div className="sm:col-span-2 text-text-primary">{user.email || 'N/A'}</div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
                                <label className="text-sm font-medium text-text-secondary">Status</label>
                                <div className="sm:col-span-2">
                                    <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
                                        {/* @ts-ignore */}
                                        {user.verified || 'Active'}
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
