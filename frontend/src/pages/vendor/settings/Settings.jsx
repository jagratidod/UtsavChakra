import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Lock, Bell, Eye, EyeOff, Shield, LogOut,
    ChevronRight, ToggleLeft, ToggleRight, AlertTriangle
} from 'lucide-react';

const VendorSettings = () => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        newRequestAlerts: true,
        paymentAlerts: true,
        reviewAlerts: true,
        marketingEmails: false
    });

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    const toggleSetting = (key) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        console.log('Changing password:', passwordForm);
        setShowPasswordModal(false);
        setPasswordForm({ current: '', new: '', confirm: '' });
    };

    const handleDeactivate = () => {
        console.log('Deactivating account');
        navigate('/vendor');
    };

    const ToggleSwitch = ({ enabled, onToggle }) => (
        <button onClick={onToggle} className="transition-colors">
            {enabled ? (
                <ToggleRight className="w-10 h-6 text-brand-pink" />
            ) : (
                <ToggleLeft className="w-10 h-6 text-slate-300" />
            )}
        </button>
    );

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/vendor/dashboard')}
                        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-slate-800">Settings</h1>
                        <p className="text-xs text-slate-400">Manage your account preferences</p>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Security Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-serif font-bold text-slate-800 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-brand-pink" />
                            Security
                        </h3>
                    </div>
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-slate-800 text-sm">Change Password</p>
                                <p className="text-xs text-slate-400">Update your account password</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </button>
                </div>

                {/* Notifications Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-serif font-bold text-slate-800 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-brand-pink" />
                            Notification Preferences
                        </h3>
                    </div>

                    <div className="divide-y divide-slate-50">
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800 text-sm">Email Notifications</p>
                                <p className="text-xs text-slate-400">Receive updates via email</p>
                            </div>
                            <ToggleSwitch enabled={settings.emailNotifications} onToggle={() => toggleSetting('emailNotifications')} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800 text-sm">Push Notifications</p>
                                <p className="text-xs text-slate-400">In-app notifications</p>
                            </div>
                            <ToggleSwitch enabled={settings.pushNotifications} onToggle={() => toggleSetting('pushNotifications')} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-800 text-sm">SMS Alerts</p>
                                <p className="text-xs text-slate-400">Get SMS for important updates</p>
                            </div>
                            <ToggleSwitch enabled={settings.smsNotifications} onToggle={() => toggleSetting('smsNotifications')} />
                        </div>
                    </div>
                </div>

                {/* Alert Types */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100">
                        <h3 className="font-medium text-slate-800 text-sm">Alert Types</h3>
                    </div>

                    <div className="divide-y divide-slate-50">
                        <div className="p-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">New Request Alerts</p>
                            <ToggleSwitch enabled={settings.newRequestAlerts} onToggle={() => toggleSetting('newRequestAlerts')} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">Payment Alerts</p>
                            <ToggleSwitch enabled={settings.paymentAlerts} onToggle={() => toggleSetting('paymentAlerts')} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">Review Alerts</p>
                            <ToggleSwitch enabled={settings.reviewAlerts} onToggle={() => toggleSetting('reviewAlerts')} />
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <p className="text-sm text-slate-600">Marketing Emails</p>
                            <ToggleSwitch enabled={settings.marketingEmails} onToggle={() => toggleSetting('marketingEmails')} />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
                    <div className="p-4 border-b border-red-100 bg-red-50">
                        <h3 className="font-serif font-bold text-red-700 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Danger Zone
                        </h3>
                    </div>

                    <button
                        onClick={() => setShowDeactivateModal(true)}
                        className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-red-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-medium text-red-700 text-sm">Deactivate Account</p>
                                <p className="text-xs text-red-400">Temporarily disable your profile</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-300" />
                    </button>
                </div>
            </main>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-serif font-bold text-slate-800">Change Password</h3>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.current ? 'text' : 'password'}
                                        value={passwordForm.current}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.new ? 'text' : 'password'}
                                        value={passwordForm.new}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showPasswords.confirm ? 'text' : 'password'}
                                        value={passwordForm.confirm}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                        className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-xl bg-brand-pink text-white font-bold text-sm shadow-lg shadow-brand-pink/30"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Deactivate Modal */}
            {showDeactivateModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in duration-200">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-slate-800 mb-2">Deactivate Account?</h3>
                            <p className="text-sm text-slate-500">Your profile will be hidden from users. You can reactivate anytime by logging in.</p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm"
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorSettings;
