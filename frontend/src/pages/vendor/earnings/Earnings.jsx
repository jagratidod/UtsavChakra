import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, IndianRupee, TrendingUp, Wallet, Building2,
    ChevronRight, Download, Calendar, CheckCircle2, Clock,
    CreditCard, Smartphone
} from 'lucide-react';

const VendorEarnings = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Mock data
    const earnings = {
        totalEarned: 485000,
        pendingPayout: 75000,
        paidAmount: 410000,
        thisMonth: 125000,
        lastMonth: 95000
    };

    const transactions = [
        { id: 1, eventName: "Patel Wedding", amount: 125000, date: "2026-01-20", status: "paid", type: "credit" },
        { id: 2, eventName: "Corporate Event", amount: 75000, date: "2026-01-18", status: "pending", type: "credit" },
        { id: 3, eventName: "Bank Payout", amount: -100000, date: "2026-01-15", status: "completed", type: "payout" },
        { id: 4, eventName: "Sharma Anniversary", amount: 80000, date: "2026-01-12", status: "paid", type: "credit" },
        { id: 5, eventName: "Birthday Party", amount: 45000, date: "2026-01-08", status: "paid", type: "credit" },
    ];

    const [bankDetails, setBankDetails] = useState({
        accountNumber: "1234567890",
        ifscCode: "HDFC0001234",
        accountHolder: "Royal Events Pvt Ltd",
        upiId: "royalevents@upi"
    });

    const [isEditingBank, setIsEditingBank] = useState(false);

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
                        <h1 className="text-xl font-serif font-bold text-slate-800">Earnings</h1>
                        <p className="text-xs text-slate-400">Track your income & payouts</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Earnings Overview Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2 bg-gradient-to-br from-brand-pink to-brand-dark-pink rounded-2xl p-6 text-white shadow-xl shadow-brand-pink/20">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" />
                                +32% this month
                            </div>
                        </div>
                        <p className="text-white/70 text-sm mb-1">Total Earned</p>
                        <p className="text-4xl font-bold">₹{(earnings.totalEarned / 1000).toFixed(0)}K</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
                            <Clock className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Pending</p>
                        <p className="text-xl font-bold text-slate-800">₹{(earnings.pendingPayout / 1000).toFixed(0)}K</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Paid Out</p>
                        <p className="text-xl font-bold text-slate-800">₹{(earnings.paidAmount / 1000).toFixed(0)}K</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-brand-pink text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => setActiveTab('bank')}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'bank' ? 'bg-brand-pink text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
                    >
                        Bank Details
                    </button>
                </div>

                {activeTab === 'overview' ? (
                    <div className="space-y-3">
                        {transactions.map((tx) => (
                            <div
                                key={tx.id}
                                className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center gap-4"
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                                    {tx.type === 'credit' ? (
                                        <IndianRupee className="w-5 h-5 text-emerald-600" />
                                    ) : (
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-800 text-sm">{tx.eventName}</h4>
                                    <p className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-blue-600'}`}>
                                        {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount / 1000).toFixed(0)}K
                                    </p>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${tx.status === 'paid' || tx.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-4 text-center text-brand-pink font-medium text-sm hover:bg-brand-pink/5 rounded-xl transition-colors">
                            Load More Transactions
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Bank Account Card */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="flex items-center justify-between mb-6">
                                <CreditCard className="w-8 h-8" />
                                <span className="text-xs uppercase tracking-widest opacity-60">Bank Account</span>
                            </div>
                            <p className="text-lg font-mono tracking-widest mb-4">
                                •••• •••• •••• {bankDetails.accountNumber.slice(-4)}
                            </p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase opacity-60 mb-1">Account Holder</p>
                                    <p className="text-sm font-medium">{bankDetails.accountHolder}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase opacity-60 mb-1">IFSC</p>
                                    <p className="text-sm font-medium">{bankDetails.ifscCode}</p>
                                </div>
                            </div>
                        </div>

                        {/* UPI Card */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <Smartphone className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-800">UPI ID</h4>
                                    <p className="text-sm text-slate-500">{bankDetails.upiId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Edit Bank Details */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h4 className="font-serif font-bold text-slate-800 mb-4">Update Bank Details</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Account Number</label>
                                    <input
                                        type="text"
                                        value={bankDetails.accountNumber}
                                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">IFSC Code</label>
                                    <input
                                        type="text"
                                        value={bankDetails.ifscCode}
                                        onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">UPI ID</label>
                                    <input
                                        type="text"
                                        value={bankDetails.upiId}
                                        onChange={(e) => setBankDetails({ ...bankDetails, upiId: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none text-sm"
                                    />
                                </div>
                                <button className="w-full py-4 rounded-xl bg-brand-pink text-white font-bold text-sm shadow-lg shadow-brand-pink/30">
                                    Save Bank Details
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorEarnings;
