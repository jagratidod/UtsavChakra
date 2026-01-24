import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, Filter, Calendar, MapPin, IndianRupee,
    Clock, CheckCircle2, XCircle, RefreshCw, ChevronRight, Users
} from 'lucide-react';

const VendorRequests = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock requests data
    const allRequests = [
        {
            id: 1,
            eventName: "Sharma Wedding Reception",
            eventType: "Wedding",
            date: "2026-02-15",
            time: "6:00 PM",
            location: "Mumbai, Maharashtra",
            category: "Decoration",
            budget: "₹2,00,000 - ₹3,00,000",
            status: "pending",
            userName: "Priya Sharma",
            guestCount: 500,
            createdAt: "2026-01-22"
        },
        {
            id: 2,
            eventName: "Rahul's 25th Birthday",
            eventType: "Birthday Party",
            date: "2026-02-10",
            time: "7:00 PM",
            location: "Pune, Maharashtra",
            category: "Photography",
            budget: "₹50,000 - ₹80,000",
            status: "accepted",
            userName: "Rahul Verma",
            guestCount: 100,
            createdAt: "2026-01-20"
        },
        {
            id: 3,
            eventName: "Gupta Golden Anniversary",
            eventType: "Anniversary",
            date: "2026-02-20",
            time: "12:00 PM",
            location: "Delhi NCR",
            category: "Catering",
            budget: "₹1,00,000 - ₹1,50,000",
            status: "pending",
            userName: "Ankit Gupta",
            guestCount: 200,
            createdAt: "2026-01-23"
        },
        {
            id: 4,
            eventName: "Mehta Engagement",
            eventType: "Engagement",
            date: "2026-02-05",
            time: "5:00 PM",
            location: "Ahmedabad, Gujarat",
            category: "Decoration",
            budget: "₹75,000 - ₹1,00,000",
            status: "rejected",
            userName: "Sneha Mehta",
            guestCount: 150,
            createdAt: "2026-01-18"
        },
        {
            id: 5,
            eventName: "Singh Sangeet Night",
            eventType: "Sangeet",
            date: "2026-02-12",
            time: "8:00 PM",
            location: "Jaipur, Rajasthan",
            category: "DJ & Music",
            budget: "₹40,000 - ₹60,000",
            status: "counter_offer",
            userName: "Karan Singh",
            guestCount: 300,
            createdAt: "2026-01-21"
        },
    ];

    const filters = [
        { key: 'all', label: 'All', count: allRequests.length },
        { key: 'pending', label: 'Pending', count: allRequests.filter(r => r.status === 'pending').length },
        { key: 'accepted', label: 'Accepted', count: allRequests.filter(r => r.status === 'accepted').length },
        { key: 'rejected', label: 'Rejected', count: allRequests.filter(r => r.status === 'rejected').length },
        { key: 'counter_offer', label: 'Counter', count: allRequests.filter(r => r.status === 'counter_offer').length },
    ];

    const filteredRequests = allRequests.filter(request => {
        const matchesFilter = activeFilter === 'all' || request.status === activeFilter;
        const matchesSearch = request.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            request.userName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, label: 'Pending' };
            case 'accepted':
                return { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2, label: 'Accepted' };
            case 'rejected':
                return { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Rejected' };
            case 'counter_offer':
                return { bg: 'bg-blue-100', text: 'text-blue-700', icon: RefreshCw, label: 'Counter Offer' };
            default:
                return { bg: 'bg-slate-100', text: 'text-slate-700', icon: Clock, label: status };
        }
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
                        <h1 className="text-xl font-serif font-bold text-slate-800">Requests</h1>
                        <p className="text-xs text-slate-400">Manage incoming event requests</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Search & Filter */}
                <div className="mb-6">
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by event or client name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 focus:outline-none transition-all"
                        />
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {filters.map(filter => (
                            <button
                                key={filter.key}
                                onClick={() => setActiveFilter(filter.key)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeFilter === filter.key
                                        ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-pink/50'
                                    }`}
                            >
                                <span className="text-sm font-medium">{filter.label}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeFilter === filter.key ? 'bg-white/20' : 'bg-slate-100'
                                    }`}>
                                    {filter.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                    {filteredRequests.map((request) => {
                        const statusConfig = getStatusConfig(request.status);
                        const StatusIcon = statusConfig.icon;

                        return (
                            <div
                                key={request.id}
                                onClick={() => navigate(`/vendor/requests/${request.id}`)}
                                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-pink/20 cursor-pointer transition-all"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-slate-800">{request.eventName}</h3>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1 ${statusConfig.bg} ${statusConfig.text}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500">{request.eventType} • By {request.userName}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Calendar className="w-4 h-4 text-brand-pink" />
                                        <span>{new Date(request.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-4 h-4 text-brand-pink" />
                                        <span>{request.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <MapPin className="w-4 h-4 text-brand-pink" />
                                        <span className="truncate">{request.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Users className="w-4 h-4 text-brand-pink" />
                                        <span>{request.guestCount} Guests</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600">
                                            {request.category}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-sm font-semibold text-brand-pink">
                                        <IndianRupee className="w-4 h-4" />
                                        <span>{request.budget}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filteredRequests.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="font-semibold text-slate-600 mb-1">No requests found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your filters or search query</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default VendorRequests;
