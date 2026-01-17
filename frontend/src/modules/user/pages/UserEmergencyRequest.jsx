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
    Info,
    Search,
    HeartPulse,
    ChevronDown
} from 'lucide-react';
import { saveEmergencyAlert } from '../../../utils/emergencyStore';

const UserEmergencyRequest = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('form'); // 'form', 'success'
    const [formData, setFormData] = useState({
        serviceNeeded: '',
        location: 'Madhapur, Hyderabad',
        timeframe: 'Immediately',
        budget: 'Flexible',
        phone: '+91 91234 56789',
        notes: ''
    });

    const urgentServices = [
        "Extra Catering", "Back-up Generator", "Emergency Sound Prep", "Quick Decor Change", "Last Minute MC", "Security/Bouncers"
    ];

    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const timeOptions = [
        "Immediately (High Alert)",
        "Within 1 hour",
        "Within 3 hours",
        "Sometime Today"
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        saveEmergencyAlert({
            requesterName: 'Premium User',
            item: formData.serviceNeeded,
            quantity: 'As needed',
            location: formData.location,
            deadline: formData.timeframe,
            budget: formData.budget,
            notes: formData.notes,
            contact: formData.phone
        });
        setStep('success');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-[440px] mx-auto shadow-2xl shadow-pink-900/5 border-x border-gray-50 relative overflow-x-hidden">
            {/* User SOS Header */}
            <div className="px-6 py-10 bg-gradient-to-br from-[#FF4D6D] to-[#FF8E53] text-white shrink-0 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="flex justify-between items-center mb-8 relative z-10">

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                        <HeartPulse size={18} className="animate-pulse text-white" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Emergency Assist</span>
                    </div>
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-script tracking-tight leading-none mb-4">Partner Help needed?</h1>
                    <p className="text-sm font-bold text-white/90 leading-relaxed max-w-[300px]">Send an SOS alert to all top-rated vendors within 25KM. Get responses in minutes.</p>
                </div>
            </div>

            <div className="flex-1 -mt-8 bg-white rounded-t-[3.5rem] p-8 space-y-8 z-20 shadow-[0_-20px_50px_rgba(255,142,83,0.1)]">
                {step === 'form' ? (
                    <form onSubmit={handleSubmit} className="space-y-8 pb-10">
                        <div className="space-y-6">
                            {/* Service Needed */}
                            <div>
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">What's the Emergency?</label>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {urgentServices.map(service => (
                                        <button
                                            key={service}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, serviceNeeded: service })}
                                            className={`px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${formData.serviceNeeded === service
                                                ? 'bg-[#FF4D6D] text-white shadow-xl shadow-pink-100 scale-105'
                                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent hover:border-pink-50'
                                                }`}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative group mt-6">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#FF4D6D] transition-colors">
                                        <Search size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Or describe what's missing..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-[1.8rem] py-5 pl-14 pr-6 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:ring-4 focus:ring-pink-500/5 focus:border-[#FF4D6D] transition-all placeholder:text-gray-300 shadow-inner"
                                        value={formData.serviceNeeded}
                                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Location View */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Incident Location</label>
                                <div className="flex items-center gap-4 bg-gradient-to-br from-pink-50/50 to-orange-50/50 border border-pink-100/50 rounded-[1.8rem] p-5">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#FF4D6D] shadow-lg shadow-pink-100 shrink-0">
                                        <Navigation size={22} fill="currentColor" className="animate-bounce" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Auto-Tracked Venue</span>
                                        <span className="text-base font-black text-gray-800 tracking-tight">{formData.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Time & Contact - Custom Merged Dropdown */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 relative">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">How Soon?</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                            className={`w-full bg-gray-50 border border-gray-100 p-4 text-sm font-bold text-gray-800 outline-none flex items-center justify-between transition-all ${isTimeDropdownOpen
                                                ? 'rounded-t-[1.5rem] border-pink-200 bg-white shadow-[0_10px_30px_rgba(255,77,109,0.05)]'
                                                : 'rounded-[1.5rem] focus:border-[#FF4D6D]'
                                                }`}
                                        >
                                            <span className={formData.timeframe ? 'text-gray-800' : 'text-gray-300'}>
                                                {formData.timeframe || 'Select Time'}
                                            </span>
                                            <ChevronDown size={18} className={`text-[#FF4D6D] transition-transform duration-300 ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isTimeDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 z-50 bg-white border-x border-b border-pink-100 rounded-b-[1.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.08)] overflow-hidden animate-slide-down-subtle">
                                                {timeOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        className={`w-full px-5 py-4 text-left text-[11px] font-black uppercase tracking-widest transition-colors hover:bg-pink-50 ${formData.timeframe === option ? 'bg-pink-50 text-[#FF4D6D]' : 'text-gray-600'
                                                            }`}
                                                        onClick={() => {
                                                            setFormData({ ...formData, timeframe: option });
                                                            setIsTimeDropdownOpen(false);
                                                        }}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Direct Contact</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] p-4 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-[#FF4D6D] transition-all placeholder:text-gray-300"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quick Message to Vendors</label>
                                <textarea
                                    placeholder="Explain the urgency (e.g., Guest count increased, rain issues, etc.)"
                                    className="w-full bg-gray-50 border border-gray-100 rounded-[1.8rem] p-6 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-[#FF4D6D] transition-all min-h-[120px] resize-none placeholder:text-gray-300 shadow-inner"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#FF4D6D] to-[#FF8E53] text-white font-black uppercase tracking-[0.2em] py-6 rounded-[2rem] shadow-2xl shadow-pink-100 active:scale-95 transition-all flex items-center justify-center gap-4"
                        >
                            <Zap size={22} fill="white" className="animate-pulse" />
                            Broadcast SOS Alert
                        </button>
                    </form>
                ) : (
                    <div className="py-14 flex flex-col items-center text-center space-y-10 animate-scale-in">
                        <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center text-[#FF4D6D] relative">
                            <CheckCircle2 size={80} strokeWidth={3} />
                            <div className="absolute inset-0 bg-[#FF4D6D] rounded-full animate-ping opacity-20"></div>
                            <div className="absolute -inset-4 bg-pink-100/30 rounded-full animate-pulse blur-xl"></div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">HELP IS COMING!</h2>
                            <p className="text-[10px] text-gray-500 mt-5 max-w-[280px] leading-relaxed font-black uppercase tracking-[0.2em]">Your SOS is live for <span className="text-[#FF4D6D]">128 Partners</span> near Madhapur.</p>
                        </div>

                        <div className="w-full bg-gray-50 rounded-[3rem] p-10 border border-dashed border-gray-200 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#FF4D6D] to-transparent animate-shimmer"></div>
                            <div className="flex justify-between items-center mb-8 px-2">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Network Scanning</span>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 bg-[#FF4D6D] rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-[#FF4D6D] rounded-full animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 bg-[#FF4D6D] rounded-full animate-pulse delay-150"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded-full w-full overflow-hidden shadow-inner">
                                    <div className="h-full bg-gradient-to-r from-[#FF4D6D] to-[#FF8E53] w-[85%] animate-[progress_1.5s_ease-in-out_infinite]"></div>
                                </div>
                                <div className="flex justify-between text-[11px] font-black text-gray-500 uppercase tracking-widest px-1">
                                    <span className="flex items-center gap-1.5"><Radar size={14} className="animate-spin-slow" /> Searching Partners</span>
                                    <span className="text-[#FF4D6D] italic">12 Found</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <button
                                onClick={() => navigate('/user/dashboard')}
                                className="py-5 text-[11px] font-black text-gray-800 uppercase tracking-[0.2em] border-2 border-gray-100 rounded-[1.8rem] hover:bg-gray-50 transition-all active:scale-95"
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/user/messages')}
                                className="py-5 text-[11px] font-black text-white bg-gray-900 uppercase tracking-[0.2em] rounded-[1.8rem] hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200"
                            >
                                Check Replies
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserEmergencyRequest;
