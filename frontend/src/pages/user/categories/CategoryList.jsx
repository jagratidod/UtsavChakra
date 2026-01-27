import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, Search, Bell } from 'lucide-react';

const CategoryList = () => {
    const navigate = useNavigate();
    const [openCategory, setOpenCategory] = useState("Venues");

    const categoriesData = {
        "Venues": {
            // Light Blue
            bgColor: "bg-[#e0e7ff]",
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2698&auto=format&fit=crop",
            label: "Venues",
            subtext: "Banquet Halls, Marriage Garden...",
            subcategories: [
                "Banquet Halls",
                "Marriage Garden / Lawns",
                "Wedding Resorts",
                "Small Function / Party Halls",
                "Destination Wedding Venues",
                "Kalyana Mandapams",
                "4 Star & Above Hotels",
                "5 Star Luxury Hotels",
                "Wedding Farmhouses"
            ]
        },
        "Photographers": {
            // Light Peach/Orange
            bgColor: "bg-[#ffedd5]",
            image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=2787&auto=format&fit=crop",
            label: "Photographers",
            subtext: "Photographers",
            subcategories: [
                "Wedding Photography",
                "Candid Photography",
                "Pre-Wedding Shoots",
                "Cinematography",
                "Traditional Photography",
                "Drone Services",
                "Photo Booths"
            ]
        },
        "Makeup": {
            // Light Pink
            bgColor: "bg-[#fce7f3]", // pink-100/200ish
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2671&auto=format&fit=crop",
            label: "Makeup",
            subtext: "Bridal Makeup Artists, Family...",
            subcategories: [
                "Bridal Makeup",
                "Airbrush Makeup",
                "Guest/Family Makeup",
                "Hairstyling"
            ]
        },
        "Planning": {
            // Light Orange/Coral
            bgColor: "bg-[#ffccbc]", // deep orange 100ish or custom
            image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2670&auto=format&fit=crop",
            label: "Planning & Decor",
            subtext: "Wedding Planners, Decorators",
            subcategories: [
                "Wedding Planners",
                "Decorators",
                "Small Event Planners"
            ]
        },
        "Virtual": {
            // Light Yellow/Beige
            bgColor: "bg-[#fef3c7]",
            image: "https://images.unsplash.com/photo-1609234656388-0aa9325c9bce?q=80&w=2670&auto=format&fit=crop",
            label: "Virtual Planning",
            subtext: "Virtual planning",
            subcategories: [
                "Virtual Assistants",
                "Online Consultations"
            ]
        },
        "Mehndi": {
            // Light Brown/Earth
            bgColor: "bg-[#e7e5e4]",
            image: "https://images.unsplash.com/photo-1563804809605-7268b8a57371?q=80&w=2670&auto=format&fit=crop",
            label: "Mehndi",
            subtext: "Mehendi Artists",
            subcategories: [
                "Bridal Mehndi",
                "Guest Mehndi"
            ]
        }
    };

    const toggleCategory = (key) => {
        if (openCategory === key) {
            setOpenCategory(null);
        } else {
            setOpenCategory(key);
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <header className="flex justify-between items-center px-5 py-4 bg-white rounded-b-[24px] shadow-sm mb-2 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100">
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <h1 className="text-xl font-bold text-slate-800">Vendor Categories</h1>
                </div>
                <div className="flex gap-2">
                    <button className="p-2"><Search className="w-5 h-5 text-slate-500" /></button>
                    <button className="p-2 bg-slate-50 rounded-full"><Bell className="w-5 h-5 text-slate-500" /></button>
                </div>
            </header>

            <div className="flex flex-col">
                {Object.entries(categoriesData).map(([key, data]) => {
                    const isOpen = openCategory === key;

                    return (
                        <div key={key} className="border-b border-white">
                            {/* Accordion Header / Card */}
                            <div
                                onClick={() => toggleCategory(key)}
                                className={`relative h-28 overflow-hidden cursor-pointer transition-all duration-300 ${data.bgColor}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-between px-6 z-10">
                                    <div className="flex flex-col max-w-[55%]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2 className="text-xl font-bold text-slate-800 leading-tight">
                                                {data.label}
                                            </h2>
                                            <ChevronDown className={`w-5 h-5 text-slate-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                        </div>
                                        <p className="text-xs text-slate-600 font-medium truncate opacity-80">{data.subtext}</p>
                                    </div>
                                </div>

                                {/* Decorative Half-Circle Image */}
                                <div className="absolute top-0 bottom-0 right-0 w-[45%] h-full">
                                    {/* Used a pseudo-circle clip visually with border-radius */}
                                    <img
                                        src={data.image}
                                        alt={data.label}
                                        className="w-full h-full object-cover rounded-l-[100px] shadow-[-10px_0_20px_rgba(0,0,0,0.05)] border-l-4 border-white/50"
                                    />
                                </div>
                            </div>

                            {/* Accordion Content */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="bg-white py-2 px-6">
                                    <button
                                        onClick={() => navigate('/user/vendors', { state: { category: key } })}
                                        className="w-full text-left py-4 text-sm font-bold text-slate-800 border-b border-slate-100"
                                    >
                                        View All {data.label}
                                    </button>
                                    {data.subcategories.map((sub, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => navigate('/user/vendors', { state: { category: key, subCategory: sub } })}
                                            className="w-full text-left py-4 text-sm font-medium text-slate-600 border-b border-slate-50 hover:text-brand-pink transition-colors"
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryList;
