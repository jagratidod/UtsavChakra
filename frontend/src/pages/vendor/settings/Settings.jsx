import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Bell, Lock, Shield, ChevronRight,
    LogOut, Trash2, X, AlertTriangle, Eye, EyeOff
} from 'lucide-react';

const VendorSettings = () => {
    const navigate = useNavigate();
    const {
        settings,
        updateSettings,
        logoutVendor,
        showToast
    } = useVendor();

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    // Password Form State
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

    // Toggle Notification Preferences
    const handleToggle = (key) => {
        updateSettings(key, !settings[key]);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordForm.new !== passwordForm.confirm) {
            showToast('Passwords do not match', 'error');
            return;
        }
        // In a real app, verify current password here
        showToast('Password updated successfully', 'success');
        setShowPasswordModal(false);
        setPasswordForm({ current: '', new: '', confirm: '' });
    };

    const handleDeactivate = () => {
        // In a real app, this would call an API
        showToast('Account deactivated', 'info');
        logoutVendor();
        navigate('/vendor/login');
    };

    const notificationSettings = [
        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive updates on your device' },
        { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive updates via SMS' }
    ];

    const alertSettings = [
        { key: 'newRequestAlerts', label: 'New Requests', desc: 'When a client sends a request' },
        { key: 'paymentAlerts', label: 'Payments', desc: 'When a payment is received' },
        { key: 'reviewAlerts', label: 'Reviews', desc: 'When a client writes a review' }
    ];

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
                        <p className="text-xs text-slate-400">Manage account preferences</p>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Security Section */}
                <section>
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Security</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-slate-800 text-sm">Change Password</h3>
                                    <p className="text-xs text-slate-400">Update your account password</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                        </button>
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">General Notifications</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                        {notificationSettings.map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings[item.key] ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-sm">
                                            {item.label}
                                        </h3>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleToggle(item.key)}
                                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${settings[item.key] ? 'bg-brand-pink' : 'bg-slate-200'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Alert Types Section */}
                <section>
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 ml-1">Alert Preferences</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
                        {alertSettings.map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings[item.key] ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-100 text-slate-400'
                                        }`}>
                                        <AlertTriangle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 text-sm">
                                            {item.label}
                                        </h3>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => handleToggle(item.key)}
                                    className={`w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${settings[item.key] ? 'bg-indigo-500' : 'bg-slate-200'
                                        }`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                                        }`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Danger Zone */}
                <section>
                    <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-3 ml-1">Danger Zone</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <button
                            onClick={() => logoutVendor()}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-slate-800 text-sm">Log Out</h3>
                                    <p className="text-xs text-slate-400">Sign out of your account</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                        </button>
                        <button
                            onClick={() => setShowDeactivateModal(true)}
                            className="w-full p-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:bg-red-100">
                                    <Trash2 className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-red-600 text-sm">Deactivate Account</h3>
                                    <p className="text-xs text-red-400">Temporarily disable account</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-red-200" />
                        </button>
                    </div>
                </section>
            </main>

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif font-bold text-slate-800">Change Password</h3>
                            <button onClick={() => setShowPasswordModal(false)}>
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            {['current', 'new', 'confirm'].map((field) => (
                                <div key={field}>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                                        {field === 'confirm' ? 'Confirm Password' : `${field} Password`}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPasswords[field] ? "text" : "password"}
                                            value={passwordForm[field]}
                                            onChange={(e) => setPasswordForm({ ...passwordForm, [field]: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPasswords[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-brand-pink text-white font-bold text-sm shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 transition-all mt-2"
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
                        <div className="flex items-center justify-center mb-4 text-red-500">
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                        </div>
                        <h3 className="text-center font-serif font-bold text-slate-800 text-xl mb-2">Are you sure?</h3>
                        <p className="text-center text-sm text-slate-500 mb-6">
                            This will disable your account and hide your profile from all users. You can reactivate it anytime by logging in.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-500/30"
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
