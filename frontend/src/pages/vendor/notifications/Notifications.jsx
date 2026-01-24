import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Bell, CheckCircle2, Calendar, IndianRupee,
    MessageSquare, AlertCircle, Clock, Trash2, Check
} from 'lucide-react';

const VendorNotifications = () => {
    const navigate = useNavigate();
    const {
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification
    } = useVendor();

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'new_request': return { icon: Bell, bg: 'bg-brand-pink', color: 'text-white' };
            case 'payment': return { icon: IndianRupee, bg: 'bg-emerald-500', color: 'text-white' };
            case 'accepted': return { icon: CheckCircle2, bg: 'bg-blue-500', color: 'text-white' };
            case 'reminder': return { icon: Calendar, bg: 'bg-amber-500', color: 'text-white' };
            case 'review': return { icon: MessageSquare, bg: 'bg-purple-500', color: 'text-white' };
            default: return { icon: AlertCircle, bg: 'bg-slate-500', color: 'text-white' };
        }
    };

    const handleNotificationClick = (notification) => {
        markNotificationRead(notification.id);
        if (notification.actionUrl) {
            navigate(notification.actionUrl);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Helper to format time relative (e.g., "5 mins ago")
    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/vendor/dashboard')}
                            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-serif font-bold text-slate-800">Notifications</h1>
                            <p className="text-xs text-slate-400">{unreadCount} unread</p>
                        </div>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllNotificationsRead}
                            className="text-sm text-brand-pink font-medium hover:underline flex items-center gap-1"
                        >
                            <Check className="w-4 h-4" />
                            Mark all read
                        </button>
                    )}
                </div>
            </header>

            <main className="p-6">
                {notifications.length > 0 ? (
                    <div className="space-y-3">
                        {notifications.map((notification) => {
                            const iconConfig = getNotificationIcon(notification.type);
                            const IconComponent = iconConfig.icon;

                            return (
                                <div
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`bg-white rounded-2xl p-4 shadow-sm border cursor-pointer transition-all ${notification.read
                                            ? 'border-slate-100 opacity-70 hover:opacity-100'
                                            : 'border-brand-pink/20 border-l-4 border-l-brand-pink bg-pink-50/10'
                                        } hover:shadow-md`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl ${iconConfig.bg} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                            <IconComponent className={`w-5 h-5 ${iconConfig.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className={`font-semibold text-sm ${notification.read ? 'text-slate-600' : 'text-slate-800'}`}>
                                                    {notification.title}
                                                </h4>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteNotification(notification.id);
                                                    }}
                                                    className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{notification.message}</p>
                                            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(notification.time)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="font-semibold text-slate-600 mb-1">No notifications</h3>
                        <p className="text-sm text-slate-400">You're all caught up!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorNotifications;
