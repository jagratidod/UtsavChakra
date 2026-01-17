import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    Send,
    ChevronLeft,
    Zap,
    Scale,
    Clock,
    MapPin,
    Phone,
    CheckCircle2,
    Navigation,
    Info
} from 'lucide-react';

const EmergencyRequest = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('form'); // 'form', 'success'
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('success');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative overflow-x-hidden">
            {/* Header */}
            <div className="px-6 py-8 bg-gradient-to-br from-red-600 to-orange-500 text-white shrink-0 shadow-lg">
                <div className="flex justify-between items-center mb-6">

                    <div className="flex items-center gap-2">
                        <Zap size={18} fill="white" className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Priority SOS</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-4xl font-script tracking-tight leading-none mb-4">Request Support</h1>
                    <p className="text-sm font-bold text-white/80 leading-relaxed max-w-[280px]">Fill the form below to alert all nearby vendors within 50KM instantly.</p>
                </div>
            </div>

            <div className="flex-1 -mt-6 bg-white rounded-t-[3rem] p-8 space-y-8 z-10">
                {step === 'form' ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            {/* Requirement Type */}
                            <div>
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Requirement Type</label>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, item: cat })}
                                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.item === cat
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
                                    placeholder="Or type specific item name..."
                                    className="w-full mt-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all placeholder:text-gray-300"
                                    value={formData.item}
                                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                                />
                            </div>

                            {/* Qty & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quantity</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: 5 units"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-red-200 transition-all"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Deadline</label>
                                    <select
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-red-200 transition-all appearance-none"
                                        value={formData.timeframe}
                                        onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                                    >
                                        <option>Within 1 hour</option>
                                        <option>Within 2 hours</option>
                                        <option>Within 4 hours</option>
                                        <option>By Today</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Broadcast Location</label>
                                <div className="flex items-center gap-3 bg-red-50/30 border border-red-50 rounded-2xl p-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shadow-sm shrink-0">
                                        <Navigation size={20} fill="currentColor" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Current Venue</span>
                                        <span className="text-sm font-black text-gray-800 tracking-tight">{formData.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Budget & Phone */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Est. Budget</label>
                                    <input
                                        type="text"
                                        placeholder="Ex: ₹2000"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-red-200 transition-all"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Phone</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-red-200 transition-all"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Additional Notes</label>
                                <textarea
                                    placeholder="Specific details or urgency notes..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-red-200 transition-all min-h-[100px] resize-none"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-red-200 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <Send size={20} />
                            Launch SOS Broadcast
                        </button>
                    </form>
                ) : (
                    <div className="py-10 flex flex-col items-center text-center space-y-8 animate-scale-in">
                        <div className="w-28 h-28 bg-red-50 rounded-full flex items-center justify-center text-red-500 relative">
                            <CheckCircle2 size={70} strokeWidth={3} />
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none">Alert Live!</h2>
                            <p className="text-xs text-gray-500 mt-4 max-w-[280px] leading-relaxed font-bold uppercase tracking-wider">Your requirement is active for <span className="text-red-600">64 partners</span> within 25KM radius.</p>
                        </div>
                        <div className="w-full bg-gray-50 rounded-[2.5rem] p-8 border border-dashed border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Active Scan</span>
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-150"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2.5 bg-gray-200 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[78%] animate-[progress_2s_ease-in-out_infinite]"></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <span>Syncing Network</span>
                                    <span className="text-red-600 italic">Fast Trace</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/vendor/emergency-hub')}
                            className="w-full py-5 text-[11px] font-black text-gray-800 uppercase tracking-[0.2em] border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-all"
                        >
                            Monitor Responses
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmergencyRequest;
