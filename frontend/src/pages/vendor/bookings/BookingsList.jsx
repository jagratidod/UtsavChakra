import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, MapPin, Clock, Users, IndianRupee,
    Phone, MessageSquare, Download, ChevronRight, CheckCircle2,
    CalendarCheck, CalendarClock, History
} from 'lucide-react';

const VendorBookings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upcoming');

    // Mock bookings data
    const bookings = {
        upcoming: [
            {
                id: 1,
                eventName: "Patel Wedding Reception",
                eventType: "Wedding",
                date: "2026-01-28",
                time: "6:00 PM",
                venue: "Grand Palace, Mumbai",
                clientName: "Rahul Patel",
                clientPhone: "+91 9876543210",
                guestCount: 400,
                paymentStatus: "partially_paid",
                totalAmount: 250000,
                paidAmount: 125000,
                category: "Decoration"
            },
            {
                id: 2,
                eventName: "Corporate Annual Meet",
                eventType: "Corporate",
                date: "2026-01-30",
                time: "10:00 AM",
                venue: "Taj Hotel, Pune",
                clientName: "TechCorp India",
                clientPhone: "+91 9988776655",
                guestCount: 200,
                paymentStatus: "paid",
                totalAmount: 150000,
                paidAmount: 150000,
                category: "Photography"
            },
        ],
        today: [
            {
                id: 3,
                eventName: "Singh Engagement",
                eventType: "Engagement",
                date: "2026-01-24",
                time: "5:00 PM",
                venue: "Royal Garden, Jaipur",
                clientName: "Karan Singh",
                clientPhone: "+91 9123456789",
                guestCount: 150,
                paymentStatus: "paid",
                totalAmount: 80000,
                paidAmount: 80000,
                category: "Decoration"
            },
        ],
        completed: [
            {
                id: 4,
                eventName: "Sharma Anniversary",
                eventType: "Anniversary",
                date: "2026-01-15",
                time: "7:00 PM",
                venue: "The Oberoi, Delhi",
                clientName: "Mr. & Mrs. Sharma",
                clientPhone: "+91 9876501234",
                guestCount: 100,
                paymentStatus: "paid",
                totalAmount: 120000,
                paidAmount: 120000,
                category: "Catering"
            },
            {
                id: 5,
                eventName: "Gupta Birthday Bash",
                eventType: "Birthday",
                date: "2026-01-10",
                time: "8:00 PM",
                venue: "Home Garden, Lucknow",
                clientName: "Ankit Gupta",
                clientPhone: "+91 9012345678",
                guestCount: 50,
                paymentStatus: "paid",
                totalAmount: 45000,
                paidAmount: 45000,
                category: "DJ & Music"
            },
        ]
    };

    const tabs = [
        { key: 'upcoming', label: 'Upcoming', icon: CalendarClock, count: bookings.upcoming.length },
        { key: 'today', label: "Today's", icon: CalendarCheck, count: bookings.today.length },
        { key: 'completed', label: 'Completed', icon: History, count: bookings.completed.length },
    ];

    const getPaymentBadge = (status) => {
        switch (status) {
            case 'paid': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Fully Paid' };
            case 'partially_paid': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Partial' };
            default: return { bg: 'bg-red-100', text: 'text-red-700', label: 'Unpaid' };
        }
    };

    const currentBookings = bookings[activeTab] || [];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
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
                        <h1 className="text-xl font-serif font-bold text-slate-800">Bookings</h1>
                        <p className="text-xs text-slate-400">Manage your confirmed events</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                    {tabs.map(tab => {
                        const TabIcon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all ${activeTab === tab.key
                                        ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-pink/50'
                                    }`}
                            >
                                <TabIcon className="w-4 h-4" />
                                <span className="text-sm font-semibold">{tab.label}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20' : 'bg-slate-100'
                                    }`}>
                                    {tab.count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Bookings List */}
                <div className="space-y-4">
                    {currentBookings.map((booking) => {
                        const paymentBadge = getPaymentBadge(booking.paymentStatus);
                        return (
                            <div
                                key={booking.id}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-slate-800">{booking.eventName}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${paymentBadge.bg} ${paymentBadge.text}`}>
                                                {paymentBadge.label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">{booking.eventType} • {booking.category}</p>
                                    </div>
                                </div>

                                {/* Event Details Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                                            <Calendar className="w-3 h-3" />
                                            Date & Time
                                        </div>
                                        <p className="font-medium text-slate-800 text-sm">
                                            {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {booking.time}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                                            <MapPin className="w-3 h-3" />
                                            Venue
                                        </div>
                                        <p className="font-medium text-slate-800 text-sm truncate">{booking.venue}</p>
                                    </div>
                                </div>

                                {/* Client & Payment */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold text-sm">
                                            {booking.clientName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">{booking.clientName}</p>
                                            <p className="text-xs text-slate-400">{booking.clientPhone}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-brand-pink">₹{(booking.paidAmount / 1000).toFixed(0)}K</p>
                                        <p className="text-[10px] text-slate-400">of ₹{(booking.totalAmount / 1000).toFixed(0)}K</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-4">
                                    <button className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                                        <MessageSquare className="w-4 h-4" />
                                        Chat
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 transition-all">
                                        <Download className="w-4 h-4" />
                                        Invoice
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                    {currentBookings.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <CalendarCheck className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="font-semibold text-slate-600 mb-1">No {activeTab} bookings</h3>
                            <p className="text-sm text-slate-400">Bookings will appear here once confirmed</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default VendorBookings;
