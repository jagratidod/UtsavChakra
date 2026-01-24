import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, IndianRupee, TrendingUp, Download, Eye,
    CreditCard, Building, Wallet, ChevronRight, AlertCircle, Save
} from 'lucide-react';

const VendorEarnings = () => {
    const navigate = useNavigate();
    const {
        transactions,
        bankDetails,
        updateBankDetails,
        getStats
    } = useVendor();

    const stats = getStats();
    const [activeTab, setActiveTab] = useState('transactions');
    const [isEditingBank, setIsEditingBank] = useState(false);
    const [bankForm, setBankForm] = useState(bankDetails);

    const handleSaveBankDetails = () => {
        updateBankDetails(bankForm);
        setIsEditingBank(false);
    };

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

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
                        <h1 className="text-xl font-serif font-bold text-slate-800">Earnings & Payouts</h1>
                        <p className="text-xs text-slate-400">Track your revenue and payments</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                            <IndianRupee className="w-4 h-4" />
                            <span className="text-sm font-medium">Total Earned</span>
                        </div>
                        <p className="text-3xl font-bold">₹{(stats.totalEarnings / 1000).toFixed(1)}K</p>
                        <p className="text-xs mt-2 opacity-70">Lifetime earnings</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white shadow-lg shadow-amber-500/20">
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                            <Wallet className="w-4 h-4" />
                            <span className="text-sm font-medium">Pending Payout</span>
                        </div>
                        <p className="text-3xl font-bold">₹{stats.pendingPayout.toLocaleString()}</p>
                        <p className="text-xs mt-2 opacity-70">To be processed soon</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-2 text-slate-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-medium">Paid To Bank</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-800">₹{(stats.paidOut / 1000).toFixed(1)}K</p>
                        <p className="text-xs mt-2 text-slate-400">Successfully transferred</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'transactions'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Transactions
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('bank');
                            setBankForm(bankDetails); // Reset form when switching
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'bank'
                                ? 'bg-white text-slate-800 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Bank Details
                    </button>
                </div>

                {activeTab === 'transactions' ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800">Transaction History</h3>
                            <button className="text-xs text-brand-pink font-medium flex items-center gap-1">
                                <Download className="w-3 h-3" />
                                Download Statement
                            </button>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {sortedTransactions.length > 0 ? sortedTransactions.map((transaction) => (
                                <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {transaction.type === 'credit' ? <ArrowLeft className="w-4 h-4 rotate-[-135deg]" /> : <Building className="w-4 h-4" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm">{transaction.eventName}</p>
                                            <p className="text-xs text-slate-400">{new Date(transaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-emerald-600' : 'text-slate-800'
                                            }`}>
                                            {transaction.type === 'credit' ? '+' : '-'} ₹{Math.abs(transaction.amount).toLocaleString()}
                                        </p>
                                        <div className="flex items-center justify-end gap-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'paid' || transaction.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
                                                }`} />
                                            <p className="text-[10px] text-slate-400 uppercase">{transaction.status}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-8 text-center text-slate-400">No transactions yet</div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-serif font-bold text-slate-800 flex items-center gap-2">
                                <Building className="w-5 h-5 text-brand-pink" />
                                Bank Account Details
                            </h3>
                            {isEditingBank ? (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditingBank(false)}
                                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveBankDetails}
                                        className="px-4 py-2 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditingBank(true)}
                                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm hover:bg-slate-200 transition-colors"
                                >
                                    Edit Details
                                </button>
                            )}
                        </div>

                        <div className="space-y-4 max-w-lg">
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 mb-6">
                                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-700">Please ensure all details are correct. Incorrect details used for payouts may result in failed transactions.</p>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Account Holder Name</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankForm.accountHolder}
                                        onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                    />
                                ) : (
                                    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium">
                                        {bankDetails.accountHolder}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Bank Name</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankForm.bankName}
                                        onChange={(e) => setBankForm({ ...bankForm, bankName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                    />
                                ) : (
                                    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium">
                                        {bankDetails.bankName}
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Account Number</label>
                                    {isEditingBank ? (
                                        <input
                                            type="text"
                                            value={bankForm.accountNumber}
                                            onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium font-mono">
                                            •••• {bankDetails.accountNumber.slice(-4)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">IFSC Code</label>
                                    {isEditingBank ? (
                                        <input
                                            type="text"
                                            value={bankForm.ifscCode}
                                            onChange={(e) => setBankForm({ ...bankForm, ifscCode: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none uppercase"
                                        />
                                    ) : (
                                        <div className="px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium font-mono">
                                            {bankDetails.ifscCode}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">UPI ID</label>
                                {isEditingBank ? (
                                    <input
                                        type="text"
                                        value={bankForm.upiId}
                                        onChange={(e) => setBankForm({ ...bankForm, upiId: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none"
                                        placeholder="username@upi"
                                    />
                                ) : (
                                    <div className="px-4 py-3 rounded-xl bg-slate-50 border border-transparent text-slate-800 font-medium">
                                        {bankDetails.upiId}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorEarnings;
