import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    Home, FileText, Calendar, CalendarCheck, User, Star,
    IndianRupee, MessageSquare, Bell, Settings, LogOut,
    Menu, X, TrendingUp, Clock, CheckCircle2, Users, ChevronRight
} from 'lucide-react';

const VendorDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        vendor,
        requests,
        bookings,
        notifications,
        getStats,
        logoutVendor
    } = useVendor();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const stats = getStats();

    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/vendor/dashboard' },
        { icon: FileText, label: 'Requests', path: '/vendor/requests', badge: stats.pendingRequests },
        { icon: CalendarCheck, label: 'Bookings', path: '/vendor/bookings' },
        { icon: Calendar, label: 'Availability', path: '/vendor/availability' },
        { icon: User, label: 'Profile', path: '/vendor/profile' },
        { icon: Star, label: 'Reviews', path: '/vendor/reviews' },
        { icon: IndianRupee, label: 'Earnings', path: '/vendor/earnings' },
        { icon: MessageSquare, label: 'Chat', path: '/vendor/chat' },
        { icon: Bell, label: 'Notifications', path: '/vendor/notifications', badge: notifications.filter(n => !n.read).length },
        { icon: Settings, label: 'Settings', path: '/vendor/settings' },
    ];

    const handleLogout = () => {
        logoutVendor();
        navigate('/vendor');
    };

    // Get recent pending requests
    const recentRequests = requests
        .filter(r => r.status === 'pending')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    // Get upcoming bookings
    const upcomingBookings = bookings
        .filter(b => b.status === 'upcoming' || b.status === 'today')
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    const statsCards = [
        {
            label: 'Total Requests',
            value: stats.totalRequests,
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
            change: '+12%'
        },
        {
            label: 'Pending',
            value: stats.pendingRequests,
            icon: Clock,
            color: 'from-amber-500 to-amber-600',
            change: null
        },
        {
            label: 'Accepted',
            value: stats.acceptedOrders,
            icon: CheckCircle2,
            color: 'from-emerald-500 to-emerald-600',
            change: '+8%'
        },
        {
            label: 'Completed',
            value: stats.completedEvents,
            icon: Users,
            color: 'from-purple-500 to-purple-600',
            change: '+15%'
        },
        {
            label: 'Earnings',
            value: `₹${(stats.totalEarnings / 1000).toFixed(0)}K`,
            icon: TrendingUp,
            color: 'from-brand-pink to-brand-dark-pink',
            change: '+32%'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-40 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
                >
                    <Menu className="w-5 h-5 text-slate-600" />
                </button>
                <h1 className="font-serif font-bold text-lg text-slate-800">Dashboard</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate('/vendor/notifications')}
                        className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
                    >
                        <Bell className="w-5 h-5 text-slate-600" />
                        {notifications.filter(n => !n.read).length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {notifications.filter(n => !n.read).length}
                            </span>
                        )}
                    </button>
                </div>
            </header>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white shadow-xl lg:shadow-sm transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between lg:justify-start gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold text-xl">
                            {vendor.businessName.charAt(0)}
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-slate-800 truncate">{vendor.businessName}</h2>
                            <p className="text-xs text-slate-400">{vendor.category}</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"
                        >
                            <X className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-gradient-to-r from-brand-pink to-brand-dark-pink text-white shadow-lg shadow-brand-pink/30'
                                    : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                                {item.badge > 0 && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-brand-pink text-white'
                                        }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 p-6 pb-24 lg:pb-6">
                {/* Welcome Header */}
                <div className="hidden lg:flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-serif font-bold text-slate-800">Welcome back, {vendor.businessName.split(' ')[0]}!</h1>
                        <p className="text-slate-500 text-sm">Here's what's happening with your business</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/vendor/notifications')}
                            className="relative w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow"
                        >
                            <Bell className="w-5 h-5 text-slate-600" />
                            {notifications.filter(n => !n.read).length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {notifications.filter(n => !n.read).length}
                                </span>
                            )}
                        </button>
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold">
                            {vendor.businessName.charAt(0)}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {statsCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-5 text-white shadow-lg ${index === 4 ? 'col-span-2 lg:col-span-1' : ''}`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    {stat.change && (
                                        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{stat.change}</span>
                                    )}
                                </div>
                                <p className="text-white/80 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Recent Requests */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-serif font-bold text-slate-800">Pending Requests</h3>
                            <button
                                onClick={() => navigate('/vendor/requests')}
                                className="text-sm text-brand-pink font-medium flex items-center gap-1 hover:underline"
                            >
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {recentRequests.length > 0 ? recentRequests.map((request) => (
                                <div
                                    key={request.id}
                                    onClick={() => navigate(`/vendor/requests/${request.id}`)}
                                    className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-slate-800 text-sm">{request.eventName}</h4>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">Pending</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(request.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <IndianRupee className="w-3 h-3" />
                                            ₹{(request.budget.min / 1000).toFixed(0)}K - ₹{(request.budget.max / 1000).toFixed(0)}K
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center">
                                    <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm text-slate-400">No pending requests</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-serif font-bold text-slate-800">Upcoming Events</h3>
                            <button
                                onClick={() => navigate('/vendor/bookings')}
                                className="text-sm text-brand-pink font-medium flex items-center gap-1 hover:underline"
                            >
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
                                <div
                                    key={booking.id}
                                    onClick={() => navigate('/vendor/bookings')}
                                    className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-light-pink to-pink-100 flex flex-col items-center justify-center text-brand-pink">
                                            <span className="text-lg font-bold leading-none">{new Date(booking.date).getDate()}</span>
                                            <span className="text-[10px] uppercase">{new Date(booking.date).toLocaleDateString('en-IN', { month: 'short' })}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-slate-800 text-sm mb-1">{booking.eventName}</h4>
                                            <p className="text-xs text-slate-500">{booking.time} • {booking.venue.split(',')[0]}</p>
                                            <p className="text-xs text-slate-400 mt-1">Client: {booking.clientName}</p>
                                        </div>
                                        {booking.status === 'today' && (
                                            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold">TODAY</span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center">
                                    <CalendarCheck className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm text-slate-400">No upcoming events</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats Row */}
                <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Star className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{stats.avgRating}</p>
                                <p className="text-xs text-slate-400">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">{stats.totalReviews}</p>
                                <p className="text-xs text-slate-400">Total Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">₹{(stats.pendingPayout / 1000).toFixed(0)}K</p>
                                <p className="text-xs text-slate-400">Pending Payout</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-slate-800">₹{(stats.paidOut / 1000).toFixed(0)}K</p>
                                <p className="text-xs text-slate-400">Paid Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-40">
                {[
                    { icon: Home, label: 'Home', path: '/vendor/dashboard' },
                    { icon: FileText, label: 'Requests', path: '/vendor/requests', badge: stats.pendingRequests },
                    { icon: Calendar, label: 'Availability', path: '/vendor/availability' },
                    { icon: MessageSquare, label: 'Chat', path: '/vendor/chat' }
                ].map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-pink' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <div className="relative">
                                <Icon className={`w-6 h-6 ${isActive ? 'fill-current bg-brand-pink/10 p-0.5 rounded-lg box-content' : ''}`} />
                                {item.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default VendorDashboard;
