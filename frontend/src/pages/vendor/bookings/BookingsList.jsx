import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Calendar, MapPin, Clock, Users, IndianRupee,
    Phone, MessageSquare, Download, CheckCircle2,
    CalendarCheck, CalendarClock, History
} from 'lucide-react';

const VendorBookings = () => {
    const navigate = useNavigate();
    const { bookings, completeBooking } = useVendor();
    const [activeTab, setActiveTab] = useState('upcoming');

    // Categorize bookings
    const today = new Date().toISOString().split('T')[0];

    const categorizedBookings = {
        upcoming: bookings.filter(b => b.date > today && b.status !== 'completed'),
        today: bookings.filter(b => b.date === today || b.status === 'today'),
        completed: bookings.filter(b => b.status === 'completed')
    };

    const tabs = [
        { key: 'upcoming', label: 'Upcoming', icon: CalendarClock, count: categorizedBookings.upcoming.length },
        { key: 'today', label: "Today's", icon: CalendarCheck, count: categorizedBookings.today.length },
        { key: 'completed', label: 'Completed', icon: History, count: categorizedBookings.completed.length },
    ];

    const getPaymentBadge = (status) => {
        switch (status) {
            case 'paid': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Fully Paid' };
            case 'partially_paid': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Partial' };
            default: return { bg: 'bg-red-100', text: 'text-red-700', label: 'Unpaid' };
        }
    };

    const currentBookings = categorizedBookings[activeTab] || [];

    const handleCompleteEvent = (bookingId) => {
        completeBooking(bookingId);
    };

    const generateInvoice = (booking) => {
        // Create a simple text invoice and download
        const invoiceContent = `
========================================
              INVOICE
========================================
Invoice #: INV-${booking.id}
Date: ${new Date().toLocaleDateString('en-IN')}

EVENT DETAILS
----------------------------------------
Event: ${booking.eventName}
Type: ${booking.eventType}
Date: ${new Date(booking.date).toLocaleDateString('en-IN')}
Time: ${booking.time}
Venue: ${booking.venue}
Guests: ${booking.guestCount}

CLIENT DETAILS
----------------------------------------
Name: ${booking.clientName}
Phone: ${booking.clientPhone}
Email: ${booking.clientEmail}

PAYMENT SUMMARY
----------------------------------------
Total Amount:     ₹${booking.totalAmount.toLocaleString()}
Amount Paid:      ₹${booking.paidAmount.toLocaleString()}
Balance Due:      ₹${(booking.totalAmount - booking.paidAmount).toLocaleString()}
Status:           ${booking.paymentStatus.toUpperCase()}

========================================
        Thank you for your business!
========================================
        `;

        const blob = new Blob([invoiceContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice-${booking.id}-${booking.eventName.replace(/\s+/g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

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
                                    {booking.status === 'today' && (
                                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold animate-pulse">
                                            TODAY
                                        </span>
                                    )}
                                </div>

                                {/* Event Details Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-slate-50 rounded-xl p-3">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                                            <Calendar className="w-3 h-3" />
                                            Date & Time
                                        </div>
                                        <p className="font-medium text-slate-800 text-sm">
                                            {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {booking.time}
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
                                        <p className="font-bold text-brand-pink">₹{booking.paidAmount.toLocaleString()}</p>
                                        <p className="text-[10px] text-slate-400">of ₹{booking.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar for Payment */}
                                <div className="mt-3">
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-brand-pink to-brand-dark-pink rounded-full transition-all duration-500"
                                            style={{ width: `${(booking.paidAmount / booking.totalAmount) * 100}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 text-right">
                                        {Math.round((booking.paidAmount / booking.totalAmount) * 100)}% paid
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 mt-4">
                                    <a
                                        href={`tel:${booking.clientPhone}`}
                                        className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Call
                                    </a>
                                    <button
                                        onClick={() => navigate('/vendor/chat')}
                                        className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Chat
                                    </button>
                                    <button
                                        onClick={() => generateInvoice(booking)}
                                        className="flex-1 py-3 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        Invoice
                                    </button>
                                </div>

                                {/* Complete Button for Today's Events */}
                                {(activeTab === 'today' || activeTab === 'upcoming') && booking.status !== 'completed' && (
                                    <button
                                        onClick={() => handleCompleteEvent(booking.id)}
                                        className="w-full mt-3 py-3 rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Mark as Completed
                                    </button>
                                )}
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
