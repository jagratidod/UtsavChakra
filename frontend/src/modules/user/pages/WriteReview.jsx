import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Share2,
    Star,
    CheckSquare,
    Square,
    PenTool,
    Calendar,
    User,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

const WriteReview = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [shareOnFacebook, setShareOnFacebook] = useState(false);
    const [vendorName, setVendorName] = useState('');
    const [experience, setExperience] = useState('');
    const [functionDate, setFunctionDate] = useState('');
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = experience.trim().split(/\s+/).filter(word => word.length > 0);
        setWordCount(words.length);
    }, [experience]);

    const renderStars = () => {
        return [1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-all duration-300 active:scale-150 relative group"
            >
                {star <= (hoverRating || rating) && (
                    <div className="absolute inset-0 bg-[#86BC25]/20 blur-xl rounded-full animate-pulse"></div>
                )}
                <Star
                    size={36}
                    strokeWidth={1.5}
                    className={`transition-all duration-500 transform ${star <= (hoverRating || rating)
                        ? 'fill-[#86BC25] text-[#86BC25] scale-110 rotate-[72deg]'
                        : 'text-gray-200 group-hover:text-gray-300'
                        }`}
                />
            </button>
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return alert("Please give a star rating!");
        if (wordCount < 50) return alert(`Please write at least 50 words. Current count: ${wordCount}`);
        alert("Thank you! Your signature review has been submitted.");
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans flex flex-col relative overflow-hidden max-w-[440px] mx-auto shadow-2xl shadow-gray-200/50 border-x border-gray-50">
            {/* Liquid Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FF4D6D]/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#86BC25]/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Premium Header */}
            <div className="sticky top-0 z-[100] bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-6 py-5 flex items-center justify-between shadow-sm">

                <div className="text-center">
                    <h1 className="text-2xl font-script text-[#FF4D6D] tracking-tight">Share Your Experience</h1>
                    <div className="flex items-center justify-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#86BC25] animate-pulse"></div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Premium Content</span>
                    </div>
                </div>
                <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                    <Share2 size={22} />
                </button>
            </div>

            <div className="flex-1 p-6 relative z-10 space-y-12 max-w-lg mx-auto w-full pb-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                {/* Hero Intro */}
                <div className="space-y-4">
                    <div className="w-16 h-16 bg-[#FF4D6D]/10 rounded-3xl flex items-center justify-center text-[#FF4D6D] mb-6 shadow-inner">
                        <PenTool size={32} />
                    </div>
                    <h2 className="text-[32px] font-black text-gray-900 leading-[1.1] tracking-tight">
                        Share your <span className="text-[#FF4D6D]">Elite Experience</span>
                    </h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                        Your feedback helps the community discover the best wedding experts.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Business Selection */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <User size={14} className="text-[#FF4D6D]" />
                            <label className="text-[11px] font-black uppercase text-gray-900 tracking-[0.2em]">Select Vendor</label>
                        </div>
                        <div className="relative group">
                            <input
                                required
                                type="text"
                                placeholder="E.g. Signature Photographers"
                                className="w-full bg-white border border-gray-100 rounded-2xl py-5 px-6 text-sm font-bold shadow-sm focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none transition-all placeholder:text-gray-300"
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Elite Rating Section */}
                    <div className="space-y-5 bg-white/50 backdrop-blur-md border border-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                        <div className="text-center space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-900 tracking-[0.2em]">Rate your experience</label>
                            <p className="text-[10px] font-bold text-gray-400">Tap to express your satisfaction</p>
                        </div>
                        <div className="flex justify-center gap-4 py-2">
                            {renderStars()}
                        </div>
                    </div>

                    {/* Deep Experience Textarea */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center gap-2">
                                <Sparkles size={14} className="text-[#86BC25]" />
                                <label className="text-[11px] font-black uppercase text-gray-900 tracking-[0.2em]">Your Narrative</label>
                            </div>
                            <span className={`text-[10px] font-black tracking-widest ${wordCount >= 50 ? 'text-[#86BC25]' : 'text-gray-400'}`}>
                                {wordCount}/50 WORDS
                            </span>
                        </div>
                        <div className="relative">
                            <textarea
                                required
                                placeholder="Describe the service quality, professionalism, and special moments..."
                                className="w-full bg-white border border-gray-100 rounded-[2rem] p-8 text-sm font-medium h-52 shadow-sm focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 outline-none transition-all placeholder:text-gray-200 resize-none leading-relaxed"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            ></textarea>
                            <div className={`absolute bottom-6 right-8 transition-all duration-500 ${wordCount >= 50 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                                <CheckCircle2 className="text-[#86BC25]" size={24} fill="#86BC25" fillOpacity={0.1} />
                            </div>
                        </div>
                    </div>

                    {/* Date Details */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar size={14} className="text-[#FF4D6D]" />
                            <label className="text-[11px] font-black uppercase text-gray-900 tracking-[0.2em]">Event Date</label>
                        </div>
                        <input
                            required
                            type="text"
                            placeholder="Select Signature Date"
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => (e.target.type = "text")}
                            className="w-full bg-white border border-gray-100 rounded-2xl py-5 px-6 text-sm font-bold shadow-sm focus:border-pink-200 outline-none transition-all placeholder:text-gray-300"
                            value={functionDate}
                            onChange={(e) => setFunctionDate(e.target.value)}
                        />
                    </div>

                    {/* Social Logic */}
                    <div
                        className="group flex items-center justify-between bg-white/50 backdrop-blur-sm border border-white p-6 rounded-[2rem] cursor-pointer shadow-sm active:scale-95 transition-all"
                        onClick={() => setShareOnFacebook(!shareOnFacebook)}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${shareOnFacebook ? 'bg-[#1877F2]' : 'bg-gray-50'
                                }`}>
                                {shareOnFacebook
                                    ? <CheckSquare size={24} className="text-white" />
                                    : <Square size={24} className="text-gray-200" />
                                }
                            </div>
                            <div>
                                <span className="text-[13px] font-black text-gray-900 uppercase tracking-wider block">Share on Socials</span>
                                <span className="text-[10px] font-bold text-gray-400">Post this review to your feed</span>
                            </div>
                        </div>
                    </div>

                    {/* Submission Core */}
                    <button
                        type="submit"
                        className="w-full relative group overflow-hidden bg-gray-900 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-gray-200 active:scale-95 transition-all mt-4"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D6D] to-[#FF8540] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span className="relative z-10">Signature Submission</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WriteReview;
