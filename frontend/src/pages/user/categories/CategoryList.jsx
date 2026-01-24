import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Store, Calendar, Home as HomeIcon, Newspaper, MessageCircle, ChevronRight, Search, Bell } from 'lucide-react';

const CategoryList = () => {
    const navigate = useNavigate();
    const [selectedMainCategory, setSelectedMainCategory] = useState("Venues");

    // Comprehensive Category Data matching the sidebar style request
    const categoriesData = {
        "Venues": {
            icon: "🏛️",
            subcategories: [
                { name: "Wedding Venues", icon: "✨" },
                { name: "Banquet Halls", icon: "🏢" },
                { name: "Convention Centres", icon: "🏙️" },
                { name: "Community Halls", icon: "🛖" },
                { name: "Religious Community Halls", icon: "🛐" },
                { name: "Club Houses", icon: "🏊" },
                { name: "Conference Halls", icon: "🎙️" },
                { name: "Auditoriums", icon: "🎭" }
            ]
        },
        "Gifting": {
            icon: "🎁",
            label: "Gifting & Accessories",
            subcategories: [
                { name: "Favors", icon: "🍬" },
                { name: "Packaging", icon: "📦" },
                { name: "Trousseau Packing", icon: "🎀" }
            ]
        },
        "Transport": {
            icon: "🚗",
            label: "Luxury Transport",
            subcategories: [
                { name: "Vintage Cars", icon: "🚙" },
                { name: "Luxury Buses", icon: "🚌" }
            ]
        },
        "Beauty": {
            icon: "💄",
            label: "Beauty, Fashion & Styling",
            subcategories: [
                { name: "Bridal Makeup", icon: "👰" },
                { name: "Groom Styling", icon: "🤵" },
                { name: "Mehendi Artist", icon: "🖐️" }
            ]
        },
        "Photo": {
            icon: "📸",
            label: "Photography & Media",
            subcategories: [
                { name: "Wedding Photography", icon: "📷" },
                { name: "Pre-wedding Shoot", icon: "💑" },
                { name: "Drone Services", icon: "🚁" }
            ]
        },
        "Entertainment": {
            icon: "🎵",
            label: "Entertainment & Live Perfs",
            subcategories: [
                { name: "DJs", icon: "🎧" },
                { name: "Sangeet Choreographer", icon: "💃" },
                { name: "Live Bands", icon: "🎸" }
            ]
        },
        "Decoration": {
            icon: "🎨",
            label: "Decoration",
            subcategories: [
                { name: "Mandap Decor", icon: "🏵️" },
                { name: "Floral Decor", icon: "🌺" }
            ]
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col md:flex-row pb-20 md:pb-0">
            {/* Desktop/Tablet Sidebar wrapper (hidden on mobile usually, but here we make it the main view) */}

            {/* Header - Sticky */}
            <header className="flex justify-between items-center px-4 py-4 border-b border-slate-100 bg-white sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100">
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <h1 className="text-lg font-bold text-slate-800">Shop By Category</h1>
                </div>
                <div className="flex gap-2">
                    <button className="p-2"><Search className="w-5 h-5 text-slate-500" /></button>
                    <button className="p-2"><Bell className="w-5 h-5 text-slate-500" /></button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar (Main Categories) */}
                <div className="w-24 md:w-64 bg-slate-50 h-full overflow-y-auto shrink-0 border-r border-slate-100">
                    <div className="flex flex-col py-2">
                        {Object.keys(categoriesData).map((key) => {
                            const cat = categoriesData[key];
                            const isActive = selectedMainCategory === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setSelectedMainCategory(key)}
                                    className={`flex flex-col items-center justify-center p-4 gap-2 transition-all relative ${isActive ? 'bg-white' : 'hover:bg-slate-100'}`}
                                >
                                    {isActive && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-pink rounded-r-full" />
                                    )}
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm transition-colors ${isActive ? 'bg-brand-light-pink text-brand-pink shadow-brand-pink/20' : 'bg-white text-slate-400 border border-slate-100'}`}>
                                        {cat.icon}
                                    </div>
                                    <span className={`text-[10px] md:text-xs font-bold text-center leading-tight ${isActive ? 'text-brand-pink' : 'text-slate-500'}`}>
                                        {cat.label || key}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content (Subcategories) */}
                <div className="flex-1 bg-white h-full overflow-y-auto p-4 md:p-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="text-xl font-bold text-slate-800">In The Spotlight</h2>
                            <div className="h-1 flex-1 bg-slate-50 ml-4 rounded-full max-w-[100px]">
                                <div className="h-full w-1/2 bg-brand-pink rounded-full"></div>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-6 pl-1 border-l-4 border-orange-500">
                            {(categoriesData[selectedMainCategory].label || selectedMainCategory).toUpperCase()}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                            {categoriesData[selectedMainCategory].subcategories.map((sub, index) => (
                                <div
                                    key={index}
                                    onClick={() => navigate('/user/vendors', { state: { category: selectedMainCategory, subCategory: sub.name } })}
                                    className="flex flex-col items-center gap-3 cursor-pointer group"
                                >
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all group-hover:border-brand-pink/20 relative overflow-hidden">
                                        {/* Mock circular border effect using box-shadow or svg could be added here for exact match */}
                                        <div className="absolute inset-0 border-2 border-slate-100 rounded-full" />
                                        <span className="relative z-10">{sub.icon}</span>
                                        {/* Add a subtle sparkle icon overlaid if desired */}
                                        <span className="absolute top-3 left-4 text-[10px] text-slate-300">✨</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 text-center leading-tight max-w-[80px]">
                                        {sub.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-xl rounded-[32px] flex items-center justify-between px-6 shadow-2xl z-50">
                <button
                    onClick={() => navigate('/user/vendors')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Store className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/planner')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Calendar className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/home')}
                    className="text-white bg-brand-pink p-2 rounded-2xl shadow-lg shadow-brand-pink/20"
                >
                    <HomeIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/news')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Newspaper className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/chat')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
};

export default CategoryList;
