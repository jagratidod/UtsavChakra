import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Navigation,
    ChevronDown,
    ArrowRight,
    LayoutGrid,
    Check,
    Sparkles
} from 'lucide-react';
import { VENDOR_CATEGORIES } from '../../../utils/constants';

const UserPreferences = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setTimeout(() => {
                        setAddress(`Secunderabad, Hyderabad, TS`);
                        setIsLocating(false);
                    }, 1000);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsLocating(false);
                    alert("Could not detect location. Please type manually.");
                }
            );
        } else {
            setIsLocating(false);
            alert("Geolocation is not supported by your browser.");
        }
    };

    const handleContinue = () => {
        localStorage.setItem('user_preference_location', address);
        localStorage.setItem('user_preference_category', selectedCategory);
        navigate('/user/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] relative overflow-hidden font-sans">
            {/* Background Aesthetic Decorations */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF4D6D]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[#FF8540]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col min-h-screen px-7 py-10">
                {/* Refined Progress Indicator */}
                <div className="flex items-center gap-2 mb-12">
                    <div className="h-1.5 flex-[1.5] bg-[#FF4D6D] rounded-full shadow-sm shadow-pink-100"></div>
                    <div className="h-1.5 flex-1 bg-gray-100 rounded-full"></div>
                    <div className="h-1.5 flex-1 bg-gray-100 rounded-full"></div>
                </div>

                <div className="flex-1 max-w-md mx-auto w-full flex flex-col">
                    <header className="mb-14 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 rounded-full mb-4">
                            <Sparkles size={12} className="text-[#FF4D6D]" />
                            <span className="text-[10px] font-bold text-[#FF4D6D] uppercase tracking-wider">Step 2 of 3</span>
                        </div>
                        <h1 className="text-[34px] font-black text-gray-900 tracking-tight leading-[1.05] mb-3">
                            Personalize Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D6D] to-[#FF8540]">Celebration</span>
                        </h1>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.15em] max-w-[80%]">
                            Let's tailor your experience for the perfect event
                        </p>
                    </header>

                    <div className="space-y-10 flex-1">
                        {/* Location Section */}
                        <section className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[12px] font-black text-gray-900 uppercase tracking-widest">
                                    Event Location
                                </label>
                            </div>
                            <div className="space-y-3">
                                <div className="relative group transition-all">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF4D6D]">
                                        <MapPin size={20} className="text-gray-300" />
                                    </div>
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder="City or area name..."
                                        className="w-full bg-white border border-gray-100 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold shadow-sm shadow-gray-100/50 focus:bg-white focus:border-[#FF4D6D]/30 focus:ring-4 focus:ring-[#FF4D6D]/5 transition-all outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                <button
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="w-full py-4.5 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-gray-500 text-[11px] font-black uppercase tracking-widest hover:border-pink-200 hover:text-[#FF4D6D] transition-all active:scale-[0.98] shadow-sm"
                                >
                                    <Navigation size={16} className={`${isLocating ? 'animate-spin' : ''} text-[#FF8540]`} />
                                    {isLocating ? 'Locating...' : 'Use My Current Location'}
                                </button>
                            </div>
                        </section>

                        {/* Category Section */}
                        <section className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                            <label className="text-[12px] font-black text-gray-900 uppercase tracking-widest px-1">
                                Looking for a Service?
                            </label>
                            <div className="relative">
                                <button
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                    className={`w-full bg-white border rounded-2xl py-5 px-6 flex items-center justify-between text-sm font-bold transition-all active:scale-[0.98] shadow-sm ${showCategoryDropdown ? 'border-[#FF4D6D]/30 ring-4 ring-[#FF4D6D]/5' : 'border-gray-100'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                                            <LayoutGrid size={18} className="text-[#FF4D6D]" />
                                        </div>
                                        <span className={selectedCategory ? 'text-gray-900' : 'text-gray-300'}>
                                            {selectedCategory || "Select Category (Optional)"}
                                        </span>
                                    </div>
                                    <ChevronDown size={20} className={`text-gray-300 transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180 text-[#FF4D6D]' : ''}`} />
                                </button>

                                {showCategoryDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[60] py-3 max-h-[280px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 scrollbar-hide">
                                        <div className="sticky top-0 bg-white px-6 py-2 mb-1 border-b border-gray-50">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Available Services</p>
                                        </div>
                                        {VENDOR_CATEGORIES.map((cat) => (
                                            <div
                                                key={cat}
                                                className="px-8 py-4 text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-pink-50 transition-colors flex items-center justify-between text-gray-500 hover:text-[#FF4D6D]"
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setShowCategoryDropdown(false);
                                                }}
                                            >
                                                {cat}
                                                {selectedCategory === cat && <Check size={16} strokeWidth={3} className="text-[#FF4D6D]" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Bottom Action Section */}
                    <div className="mt-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <button
                            onClick={handleContinue}
                            disabled={!address}
                            className="group w-full py-5.5 relative overflow-hidden rounded-2xl transition-all active:scale-[0.96] disabled:opacity-40 disabled:active:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8540]"></div>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                            <div className="relative flex items-center justify-center gap-3 text-white">
                                <span className="text-[13px] font-black uppercase tracking-[0.25em]">Ready to Explore</span>
                                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                            </div>
                        </button>
                        <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] px-4 leading-relaxed">
                            Your selections help us show you <br /> the most relevant vendors
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPreferences;

