import React, { useState } from 'react';
import {
    AlertTriangle,
    Zap,
    MapPin,
    Clock,
    Phone,
    CheckCircle2,
    MessageCircle,
    X,
    Send,
    Navigation,
    Info
} from 'lucide-react';

const EmergencySupport = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('choice'); // 'choice', 'form', 'success'
    const [formData, setFormData] = useState({
        item: '',
        quantity: '',
        location: 'Madhapur, Hyderabad',
        timeframe: 'Within 2 hours',
        budget: '',
        phone: '+91 98765 43210',
        notes: ''
    });

    const categories = [
        "LED Par Lights", "Flower Decoration", "Generator", "Sound System", "Manpower", "Catering Service"
    ];

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('success');
        // In a real app, this would send a push to nearby vendors
    };

    return (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end sm:justify-center items-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-white rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up-subtle max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 bg-gradient-to-r from-red-600 to-orange-500 text-white shrink-0">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={20} className="animate-pulse" />
                            <h2 className="text-xl font-black uppercase tracking-tight">Emergency Assist</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                            <X size={20} />
                        </button>
                    </div>
                    <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Urgent Requirement - Connect with nearby partners</p>
                </div>

                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {step === 'choice' && (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-black text-gray-900 leading-tight">Need something urgently?</h3>
                                <p className="text-xs text-gray-500 mt-1">Submit a requirement and we'll alert all nearby vendors instantly.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => setStep('form')}
                                    className="p-6 rounded-[2rem] border-2 border-dashed border-red-100 bg-red-50/50 hover:bg-red-50 hover:border-red-200 transition-all text-left flex items-center gap-6 group"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <Zap size={28} fill="currentColor" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 uppercase tracking-tight">Request Urgent Help</h4>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-red-400/80 italic">Alert nearby partners within 50KM</p>
                                    </div>
                                </button>

                                <div className="p-6 rounded-[2.5rem] bg-gray-50 border border-gray-100 opacity-60">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-white rounded-xl text-gray-400 shadow-sm">
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Community Rules</h4>
                                            <p className="text-[10px] text-gray-400 mt-1">Only use for active on-ground emergencies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 'form' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">What do you need?</label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, item: cat })}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.item === cat
                                                        ? 'bg-red-600 text-white shadow-lg shadow-red-100 scale-105'
                                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Or type specific item..."
                                        className="w-full mt-3 bg-gray-50 border border-transparent rounded-2xl p-4 text-sm font-bold text-gray-800 focus:bg-white focus:border-red-200 outline-none transition-all"
                                        value={formData.item}
                                        onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quantity</label>
                                        <input
                                            type="text"
                                            placeholder="Example: 10 units"
                                            className="w-full mt-1 bg-gray-50 border border-transparent rounded-2xl p-4 text-sm font-bold text-gray-800 focus:bg-white focus:border-red-200 outline-none transition-all"
                                            value={formData.quantity}
                                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Time Required</label>
                                        <select
                                            className="w-full mt-1 bg-gray-50 border border-transparent rounded-2xl p-4 text-sm font-bold text-gray-800 focus:bg-white focus:border-red-200 outline-none transition-all appearance-none"
                                            value={formData.timeframe}
                                            onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                                        >
                                            <option>Within 1 hour</option>
                                            <option>Within 2 hours</option>
                                            <option>By Today</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Location (Auto-detected)</label>
                                    <div className="mt-1 flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-transparent">
                                        <Navigation size={18} className="text-red-500" />
                                        <span className="text-sm font-bold text-gray-800">{formData.location}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Budget (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="Example: ₹5000"
                                            className="w-full mt-1 bg-gray-50 border border-transparent rounded-2xl p-4 text-sm font-bold text-gray-800 focus:bg-white focus:border-red-200 outline-none transition-all"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Contact Number</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full mt-1 bg-gray-50 border border-transparent rounded-2xl p-4 text-sm font-bold text-gray-800 focus:bg-white focus:border-red-200 outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-[1.8rem] bg-gradient-to-r from-red-600 to-orange-500 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                <Send size={20} />
                                Broadcast Requirement
                            </button>
                        </form>
                    )}

                    {step === 'success' && (
                        <div className="py-10 flex flex-col items-center text-center space-y-6 animate-scale-in">
                            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-red-500 relative">
                                <CheckCircle2 size={60} strokeWidth={3} />
                                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Alert Sent!</h3>
                                <p className="text-xs text-gray-500 mt-2 max-w-[280px] leading-relaxed">Your requirement has been broadcasted to all partners within <span className="text-red-500 font-bold">25KM</span>. You will receive responses shortly.</p>
                            </div>
                            <div className="w-full bg-gray-50 rounded-3xl p-6 border border-dashed border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Broadcasting</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse delay-150"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
                                        <div className="h-full bg-red-500 w-[65%] animate-[progress_3s_ease-in-out_infinite]"></div>
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black text-gray-400 uppercase tracking-tighter">
                                        <span>Searching Partners</span>
                                        <span>64 Nearby</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-4 text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                            >
                                Close Window
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const IncomingAlert = ({ alert, onRespond }) => {
    return (
        <div className="bg-white border-2 border-red-50 rounded-[2.5rem] p-6 shadow-[0_20px_40px_rgba(255,77,109,0.1)] relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
            {/* Urgent Badge */}
            <div className="absolute top-0 right-10 bg-red-600 text-white px-6 py-2 rounded-b-2xl flex items-center gap-2 animate-bounce-subtle">
                <Zap size={14} fill="white" />
                <span className="text-[10px] font-black uppercase tracking-widest">Urgent Assist</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Requester Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shadow-sm">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black text-red-600 tracking-[0.2em] uppercase leading-none mb-1">Incoming Requirement</h4>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight italic font-serif leading-none">
                                {alert.requesterName}
                            </h3>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-red-50/30 rounded-2xl p-4 border border-red-100/50">
                            <h2 className="text-lg font-black text-gray-900 leading-none mb-1 flex items-center gap-2">
                                {alert.item}
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-lg border border-red-100 uppercase tracking-tighter">Qty: {alert.quantity}</span>
                            </h2>
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed mt-2">{alert.notes}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">📍 Location</p>
                                    <p className="text-[10px] font-bold text-gray-700 leading-none">{alert.location}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">⏱ Deadline</p>
                                    <p className="text-[10px] font-bold text-red-600 leading-none">{alert.deadline}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-3 justify-center">
                    <button
                        onClick={() => onRespond('provide', alert)}
                        className="flex items-center justify-center gap-3 bg-red-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-red-200 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
                    >
                        <Zap size={18} fill="white" />
                        I Can Provide
                    </button>
                    <div className="flex gap-3">
                        <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest">
                            <Phone size={16} />
                            Call
                        </button>
                        <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 p-4 rounded-2xl transition-all flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest">
                            <MessageCircle size={16} />
                            Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmergencySupport;
