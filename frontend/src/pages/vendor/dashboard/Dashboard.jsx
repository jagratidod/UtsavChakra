import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Calendar, Users, Star, Wallet,
    Bell, Settings, Menu, X, ChevronRight, TrendingUp, Clock,
    CheckCircle2, XCircle, IndianRupee, CalendarCheck, MessageSquare,
    User, LogOut, Home
} from 'lucide-react';

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Mock data for dashboard
    const stats = {
        totalRequests: 45,
        pendingRequests: 8,
        acceptedOrders: 12,
        completedEvents: 25,
        totalEarnings: 485000
    };

    const recentRequests = [
        { id: 1, eventName: "Sharma Wedding", eventType: "Wedding", date: "2026-02-15", location: "Mumbai", status: "pending", budget: "₹2L - 3L" },
        { id: 2, eventName: "Rahul's Birthday", eventType: "Birthday", date: "2026-02-10", location: "Pune", status: "accepted", budget: "₹50K - 80K" },
        { id: 3, eventName: "Gupta Anniversary", eventType: "Anniversary", date: "2026-02-20", location: "Delhi", status: "pending", budget: "₹1L - 1.5L" },
    ];

    const upcomingEvents = [
        { id: 1, name: "Patel Wedding", date: "2026-01-28", time: "6:00 PM", venue: "Grand Palace, Mumbai" },
        { id: 2, name: "Corporate Event", date: "2026-01-30", time: "10:00 AM", venue: "Taj Hotel, Pune" },
    ];

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/vendor/dashboard", active: true },
        { icon: FileText, label: "Requests", path: "/vendor/requests", badge: stats.pendingRequests },
        { icon: CalendarCheck, label: "Bookings", path: "/vendor/bookings" },
        { icon: Calendar, label: "Availability", path: "/vendor/availability" },
        { icon: User, label: "Profile", path: "/vendor/profile" },
        { icon: Star, label: "Reviews", path: "/vendor/reviews" },
        { icon: Wallet, label: "Earnings", path: "/vendor/earnings" },
        { icon: MessageSquare, label: "Chat", path: "/vendor/chat" },
        { icon: Bell, label: "Notifications", path: "/vendor/notifications" },
        { icon: Settings, label: "Settings", path: "/vendor/settings" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700';
            case 'accepted': return 'bg-emerald-100 text-emerald-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'counter_offer': return 'bg-blue-100 text-blue-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                U
                            </div>
                            <div>
                                <h2 className="font-serif font-bold text-slate-800">Utsav Chakra</h2>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Vendor Portal</p>
                            </div>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {sidebarItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30' : 'text-slate-600 hover:bg-slate-50'}`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-brand-pink'}`} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-72">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-serif font-bold text-slate-800">Dashboard</h1>
                                <p className="text-xs text-slate-400">Welcome back, Royal Events!</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold">
                                R
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{stats.totalRequests}</p>
                            <p className="text-xs text-slate-400 font-medium">Total Requests</p>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-amber-600" />
                                </div>
                                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">New</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{stats.pendingRequests}</p>
                            <p className="text-xs text-slate-400 font-medium">Pending</p>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{stats.acceptedOrders}</p>
                            <p className="text-xs text-slate-400 font-medium">Accepted</p>
                        </div>

                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <CalendarCheck className="w-5 h-5 text-purple-600" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-slate-800">{stats.completedEvents}</p>
                            <p className="text-xs text-slate-400 font-medium">Completed</p>
                        </div>

                        <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-brand-pink to-brand-dark-pink rounded-2xl p-5 shadow-lg shadow-brand-pink/20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <IndianRupee className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white">₹{(stats.totalEarnings / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-white/80 font-medium">Total Earnings</p>
                        </div>
                    </div>

                    {/* Recent Requests & Upcoming Events */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Recent Requests */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100">
                                <h3 className="font-serif font-bold text-slate-800">Recent Requests</h3>
                                <button
                                    onClick={() => navigate('/vendor/requests')}
                                    className="text-xs font-bold text-brand-pink uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    View All <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {recentRequests.map((request) => (
                                    <div
                                        key={request.id}
                                        onClick={() => navigate(`/vendor/requests/${request.id}`)}
                                        className="p-5 hover:bg-slate-50 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h4 className="font-semibold text-slate-800">{request.eventName}</h4>
                                                <p className="text-xs text-slate-400">{request.eventType} • {request.location}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(request.status)}`}>
                                                {request.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(request.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IndianRupee className="w-3 h-3" />
                                                {request.budget}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                            <div className="flex items-center justify-between p-5 border-b border-slate-100">
                                <h3 className="font-serif font-bold text-slate-800">Upcoming Events</h3>
                            </div>
                            <div className="p-5 space-y-4">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="p-4 bg-slate-50 rounded-xl">
                                        <h4 className="font-semibold text-slate-800 mb-1">{event.name}</h4>
                                        <p className="text-xs text-slate-400 mb-2">{event.venue}</p>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="px-2 py-1 bg-brand-pink/10 text-brand-pink rounded-lg font-medium">
                                                {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            </span>
                                            <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded-lg font-medium">
                                                {event.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {upcomingEvents.length === 0 && (
                                    <div className="text-center py-8 text-slate-400">
                                        <CalendarCheck className="w-10 h-10 mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">No upcoming events</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default VendorDashboard;
