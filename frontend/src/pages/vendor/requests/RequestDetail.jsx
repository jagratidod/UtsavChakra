import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Calendar, MapPin, Clock, Users, IndianRupee,
    Phone, MessageSquare, User, FileText, CheckCircle2, XCircle,
    RefreshCw, Send, X, AlertCircle
} from 'lucide-react';

const RequestDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showCounterModal, setShowCounterModal] = useState(false);

    // Form states
    const [acceptForm, setAcceptForm] = useState({ finalPrice: '', advancePercent: '50', notes: '' });
    const [rejectForm, setRejectForm] = useState({ reason: '' });
    const [counterForm, setCounterForm] = useState({ newPrice: '', message: '' });

    // Mock request data
    const request = {
        id: id,
        eventName: "Sharma Wedding Reception",
        eventType: "Wedding",
        status: "pending",
        createdAt: "2026-01-22",

        // Event Details
        date: "2026-02-15",
        time: "6:00 PM",
        venue: "Grand Palace Banquet Hall",
        location: "Andheri West, Mumbai, Maharashtra",
        guestCount: 500,
        category: "Decoration",
        budget: { min: 200000, max: 300000 },
        specialRequirements: "Traditional Indian theme with marigold flowers. Need stage decoration, entrance mandap, and photo booth setup. Prefer pastel colors with gold accents.",

        // User Details
        user: {
            name: "Priya Sharma",
            phone: "98XXXXXX10", // Masked until accepted
            email: "priya.s***@gmail.com",
            profileImage: null
        },
        eventDescription: "Our daughter's wedding reception. Looking for elegant and traditional decorations that blend modern aesthetics with Indian traditions."
    };

    const handleAccept = (e) => {
        e.preventDefault();
        console.log("Accepting with:", acceptForm);
        // API call would go here
        setShowAcceptModal(false);
        navigate('/vendor/requests');
    };

    const handleReject = (e) => {
        e.preventDefault();
        console.log("Rejecting with:", rejectForm);
        setShowRejectModal(false);
        navigate('/vendor/requests');
    };

    const handleCounter = (e) => {
        e.preventDefault();
        console.log("Counter offer:", counterForm);
        setShowCounterModal(false);
        navigate('/vendor/requests');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-32">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/vendor/requests')}
                        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-serif font-bold text-slate-800">Request Details</h1>
                        <p className="text-xs text-slate-400">#{request.id} • {request.category}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase">
                        {request.status}
                    </span>
                </div>
            </header>

            <main className="p-6 space-y-6">
                {/* Event Header Card */}
                <div className="bg-gradient-to-br from-brand-pink to-brand-dark-pink rounded-2xl p-6 text-white shadow-xl shadow-brand-pink/20">
                    <h2 className="text-2xl font-serif font-bold mb-2">{request.eventName}</h2>
                    <p className="text-white/80 text-sm mb-4">{request.eventType} Event</p>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-xs text-white/70 uppercase tracking-wider">Date</span>
                            </div>
                            <p className="font-semibold">{new Date(request.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-xs text-white/70 uppercase tracking-wider">Time</span>
                            </div>
                            <p className="font-semibold">{request.time}</p>
                        </div>
                    </div>
                </div>

                {/* User Details */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-brand-pink" />
                        Client Information
                    </h3>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold text-xl">
                            {request.user.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-800">{request.user.name}</h4>
                            <p className="text-sm text-slate-400 flex items-center gap-2">
                                <Phone className="w-3 h-3" />
                                {request.user.phone}
                                <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Visible after accept</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-600 leading-relaxed">{request.eventDescription}</p>
                    </div>
                </div>

                {/* Event Details */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="font-serif font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-brand-pink" />
                        Event Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                                <MapPin className="w-3 h-3" />
                                Venue
                            </div>
                            <p className="font-medium text-slate-800 text-sm">{request.venue}</p>
                            <p className="text-xs text-slate-500">{request.location}</p>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-1">
                                <Users className="w-3 h-3" />
                                Guest Count
                            </div>
                            <p className="font-medium text-slate-800 text-sm">{request.guestCount} Guests</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-brand-light-pink to-pink-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-brand-dark-pink uppercase tracking-wider mb-1">
                            <IndianRupee className="w-3 h-3" />
                            Budget Range
                        </div>
                        <p className="font-bold text-xl text-brand-pink">
                            ₹{(request.budget.min / 1000).toFixed(0)}K - ₹{(request.budget.max / 1000).toFixed(0)}K
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Special Requirements</p>
                        <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-4">
                            {request.specialRequirements}
                        </p>
                    </div>
                </div>
            </main>

            {/* Fixed Bottom Actions */}
            {request.status === 'pending' && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-2xl">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowRejectModal(true)}
                            className="flex-1 py-4 rounded-xl border-2 border-red-200 text-red-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                            Reject
                        </button>
                        <button
                            onClick={() => setShowCounterModal(true)}
                            className="flex-1 py-4 rounded-xl border-2 border-blue-200 text-blue-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Counter
                        </button>
                        <button
                            onClick={() => setShowAcceptModal(true)}
                            className="flex-[1.5] py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            Accept Request
                        </button>
                    </div>
                </div>
            )}

            {/* Accept Modal */}
            {showAcceptModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-slate-800">Accept Request</h3>
                            <button onClick={() => setShowAcceptModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                        <form onSubmit={handleAccept} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Final Price (₹)</label>
                                <input
                                    type="number"
                                    value={acceptForm.finalPrice}
                                    onChange={(e) => setAcceptForm({ ...acceptForm, finalPrice: e.target.value })}
                                    placeholder="Enter your final price"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Advance Required (%)</label>
                                <select
                                    value={acceptForm.advancePercent}
                                    onChange={(e) => setAcceptForm({ ...acceptForm, advancePercent: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink outline-none"
                                >
                                    <option value="25">25%</option>
                                    <option value="50">50%</option>
                                    <option value="75">75%</option>
                                    <option value="100">100% (Full Payment)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Message (Optional)</label>
                                <textarea
                                    value={acceptForm.notes}
                                    onChange={(e) => setAcceptForm({ ...acceptForm, notes: e.target.value })}
                                    placeholder="Add a note for the client..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                                <CheckCircle2 className="w-5 h-5" />
                                Confirm & Accept
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-slate-800">Reject Request</h3>
                            <button onClick={() => setShowRejectModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                        <form onSubmit={handleReject} className="space-y-4">
                            <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-700">This action cannot be undone. The client will be notified of your decision.</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Reason (Optional)</label>
                                <textarea
                                    value={rejectForm.reason}
                                    onChange={(e) => setRejectForm({ ...rejectForm, reason: e.target.value })}
                                    placeholder="Let the client know why you're declining..."
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-red-500 text-white font-bold flex items-center justify-center gap-2">
                                <XCircle className="w-5 h-5" />
                                Confirm Rejection
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Counter Offer Modal */}
            {showCounterModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-slate-800">Counter Offer</h3>
                            <button onClick={() => setShowCounterModal(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                <X className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>
                        <form onSubmit={handleCounter} className="space-y-4">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                                <p className="text-xs text-blue-600 uppercase tracking-wider mb-1">Client's Budget</p>
                                <p className="font-bold text-blue-800">₹{(request.budget.min / 1000).toFixed(0)}K - ₹{(request.budget.max / 1000).toFixed(0)}K</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Your Price (₹)</label>
                                <input
                                    type="number"
                                    value={counterForm.newPrice}
                                    onChange={(e) => setCounterForm({ ...counterForm, newPrice: e.target.value })}
                                    placeholder="Enter your counter price"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Explain Your Offer</label>
                                <textarea
                                    value={counterForm.message}
                                    onChange={(e) => setCounterForm({ ...counterForm, message: e.target.value })}
                                    placeholder="e.g., 'Due to premium materials and extended setup time...'"
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-transparent focus:border-brand-pink focus:ring-2 focus:ring-brand-pink/20 outline-none resize-none"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                                <Send className="w-5 h-5" />
                                Send Counter Offer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestDetail;
