import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MapPin,
    Navigation,
    ArrowRight,
    Check,
    Sparkles,
    ChevronDown,
    LayoutGrid
} from 'lucide-react';
import { VENDOR_CATEGORIES } from '../../../utils/constants';

const UserPreferences = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [animatedWord, setAnimatedWord] = useState(0);

    const words = ['Dream', 'Perfect', 'Special', 'Magical'];

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimatedWord((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const handleGetLocation = () => {
        setIsLocating(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                () => {
                    setTimeout(() => {
                        setAddress(`Hyderabad, Telangana`);
                        setIsLocating(false);
                    }, 1000);
                },
                () => {
                    setIsLocating(false);
                    alert("Could not detect location. Please type manually.");
                }
            );
        } else {
            setIsLocating(false);
        }
    };

    const handleContinue = () => {
        localStorage.setItem('user_preference_location', address);
        localStorage.setItem('user_preference_category', selectedCategory);
        navigate('/user/dashboard');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setShowCategoryDropdown(false);
        if (showCategoryDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showCategoryDropdown]);

    return (
        <div className="min-h-screen min-h-[100dvh] bg-[#FDFCFD] relative overflow-hidden font-sans max-w-[440px] mx-auto shadow-2xl shadow-blue-900/10 border-x border-white">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-[#2D328C]/5 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none -translate-y-1/3 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-orange-400/10 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10 flex flex-col min-h-screen min-h-[100dvh] px-5 py-6 pb-8">
                {/* Progress Indicator */}
                <div className="flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="h-1 sm:h-1.5 flex-1 bg-[#2D328C] rounded-full shadow-sm shadow-blue-200"></div>
                    <div className="h-1 sm:h-1.5 flex-1 bg-[#2D328C] rounded-full shadow-sm shadow-blue-200"></div>
                    <div className="h-1 sm:h-1.5 flex-1 bg-gray-100 rounded-full"></div>
                </div>

                {/* Header with Animated Text */}
                <header className="mb-8 animate-in fade-in slide-in-from-top-6 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2D328C]/5 rounded-full mb-4 border border-[#2D328C]/10">
                        <Sparkles size={10} className="text-orange-500" />
                        <span className="text-[8px] sm:text-[9px] font-black text-[#2D328C] uppercase tracking-[0.2em]">Personalize</span>
                    </div>

                    <h1 className="text-[28px] sm:text-[32px] font-black text-[#2D328C] italic tracking-tighter leading-[1] mb-3">
                        Your<br />
                        <span className="relative inline-block h-[34px] sm:h-[38px] overflow-hidden">
                            {words.map((word, idx) => (
                                <span
                                    key={word}
                                    className={`absolute left-0 transition-all duration-500 text-orange-500 ${idx === animatedWord
                                            ? 'translate-y-0 opacity-100'
                                            : idx < animatedWord
                                                ? '-translate-y-full opacity-0'
                                                : 'translate-y-full opacity-0'
                                        }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </span>
                        <span className="text-[#2D328C]"> Day</span>
                    </h1>
                    <p className="text-gray-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em]">
                        Help us find your perfect vendors
                    </p>
                </header>

                <div className="flex-1 space-y-4">
                    {/* Location Section */}
                    <section className="animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
                        <div className="bg-white rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_10px_30px_rgba(45,50,140,0.05)] border border-gray-100">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2D328C] flex items-center justify-center shadow-lg shadow-blue-900/20">
                                    <MapPin size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[11px] sm:text-[12px] font-black text-[#2D328C] uppercase tracking-wide">Location</h3>
                                    <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-widest">Where's your event?</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="City or Area..."
                                    className="flex-1 min-w-0 bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 px-3 sm:px-4 text-[12px] sm:text-[13px] font-bold text-[#2D328C] focus:bg-white focus:border-[#2D328C]/30 focus:ring-2 focus:ring-[#2D328C]/5 transition-all outline-none placeholder:text-gray-300 placeholder:font-medium"
                                />
                                <button
                                    onClick={handleGetLocation}
                                    disabled={isLocating}
                                    className="px-3 sm:px-4 py-3 sm:py-3.5 bg-[#2D328C] rounded-xl text-white active:scale-95 transition-all shadow-lg shadow-blue-900/20 hover:bg-[#1E2266] shrink-0"
                                >
                                    <Navigation size={16} className={isLocating ? 'animate-spin' : ''} />
                                </button>
                            </div>
                            {address && (
                                <div className="mt-2 sm:mt-3 flex items-center gap-2 animate-in fade-in duration-300">
                                    <Check size={12} className="text-green-500 shrink-0" />
                                    <span className="text-[9px] sm:text-[10px] font-bold text-green-600 truncate">{address}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Categories Dropdown Section */}
                    <section className="animate-in fade-in slide-in-from-left-6 duration-700 delay-300">
                        <div className="bg-white rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-5 shadow-[0_10px_30px_rgba(45,50,140,0.05)] border border-gray-100">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <LayoutGrid size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[11px] sm:text-[12px] font-black text-[#2D328C] uppercase tracking-wide">Category</h3>
                                    <p className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-widest">What are you looking for?</p>
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowCategoryDropdown(!showCategoryDropdown);
                                    }}
                                    className={`w-full bg-gray-50 border rounded-xl py-3 sm:py-4 px-3 sm:px-4 flex items-center justify-between text-[12px] sm:text-[13px] font-bold transition-all active:scale-[0.99] ${showCategoryDropdown
                                            ? 'border-[#2D328C]/30 bg-white ring-2 ring-[#2D328C]/5'
                                            : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <span className={`truncate ${selectedCategory ? 'text-[#2D328C]' : 'text-gray-300 font-medium'}`}>
                                        {selectedCategory || "Select a category..."}
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-400 transition-transform duration-300 shrink-0 ml-2 ${showCategoryDropdown ? 'rotate-180 text-[#2D328C]' : ''}`}
                                    />
                                </button>

                                {showCategoryDropdown && (
                                    <div
                                        className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl shadow-blue-900/10 z-[60] py-2 max-h-[200px] sm:max-h-[240px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 no-scrollbar"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="px-3 sm:px-4 py-2 border-b border-gray-50 mb-1 sticky top-0 bg-white">
                                            <p className="text-[7px] sm:text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">Available Services</p>
                                        </div>
                                        {VENDOR_CATEGORIES.map((cat) => (
                                            <div
                                                key={cat}
                                                className={`px-3 sm:px-4 py-3 text-[11px] sm:text-[12px] font-bold cursor-pointer transition-colors flex items-center justify-between ${selectedCategory === cat
                                                        ? 'bg-[#2D328C]/5 text-[#2D328C]'
                                                        : 'text-gray-500 hover:bg-orange-50 hover:text-orange-600 active:bg-orange-100'
                                                    }`}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setShowCategoryDropdown(false);
                                                }}
                                            >
                                                <span className="truncate pr-2">{cat}</span>
                                                {selectedCategory === cat && (
                                                    <Check size={14} className="text-[#2D328C] shrink-0" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {selectedCategory && (
                                <div className="mt-2 sm:mt-3 flex items-center justify-between animate-in fade-in duration-300">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <Check size={12} className="text-green-500 shrink-0" />
                                        <span className="text-[9px] sm:text-[10px] font-bold text-green-600 truncate">{selectedCategory}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCategory('')}
                                        className="text-[8px] sm:text-[9px] font-black text-orange-500 uppercase tracking-widest hover:underline shrink-0 ml-2"
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Bottom CTA - Fixed at bottom for mobile */}
                <div className="mt-6 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
                    <button
                        onClick={handleContinue}
                        disabled={!address}
                        className="group w-full py-4 sm:py-5 relative overflow-hidden rounded-xl sm:rounded-2xl transition-all active:scale-[0.97] disabled:opacity-40 disabled:active:scale-100 shadow-xl shadow-blue-900/20"
                    >
                        <div className="absolute inset-0 bg-[#2D328C]"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <div className="relative flex items-center justify-center gap-2 sm:gap-3 text-white">
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] italic">Explore Vendors</span>
                            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </div>
                    </button>
                    <p className="text-center text-[9px] sm:text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-3 sm:mt-4">
                        Category is optional
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserPreferences;
