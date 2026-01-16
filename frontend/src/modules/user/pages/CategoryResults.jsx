import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_VENDORS } from '../../../utils/constants';
import {
    ArrowLeft,
    MapPin,
    Star,
    Heart,
    Sparkles,
    Phone,
    Home,
    Camera,
    Utensils,
    Gift,
    Scissors,
    Mic2,
    Palette,
    Music,
    Search
} from 'lucide-react';

const CATEGORY_MAP = {
    'wedding-venues': { label: 'Wedding venues', icon: Home },
    'home-decors': { label: 'Home decors', icon: Sparkles },
    'farm-house': { label: 'Farm house', icon: Home },
    'banquet-hall': { label: 'Banquet hall', icon: Home },
    'convention-centre': { label: 'Convention centre', icon: Home },
    'community-hall': { label: 'Community Hall', icon: Home },
    'religious-centres': { label: 'Religious community centres', icon: Heart },
    'club-house': { label: 'Club House', icon: Home },
    'conference-hall': { label: 'Conference hall', icon: Mic2 },
    'auditorium': { label: 'Auditorium', icon: Mic2 },
    'resort': { label: 'Resort', icon: Home },
    'beach-resort': { label: 'Beach Resort', icon: Home },
    'hill-station-resort': { label: 'Hill Station Resort', icon: Home },
    'destination-resort': { label: 'Destination Resort', icon: MapPin },
    'gifting': { label: 'Gifting', icon: Gift },
    'album-designer': { label: 'Album designer', icon: Palette },
    'bartender': { label: 'Bartender', icon: Utensils },
    'magicians': { label: 'Magicians', icon: Sparkles },
    'anchors': { label: 'Anchors', icon: Mic2 },
    'garlands': { label: 'Garlands', icon: Palette },
    'painting-activities': { label: 'Painting Activities', icon: Palette },
    'german-hangers': { label: 'German hangers', icon: Home },
    'mangala-vadyam': { label: 'Mangala vadyam', icon: Music },
    'instant-photobooths': { label: 'Instant Photo Booths', icon: Camera },
    'luxury-car-rentals': { label: 'Luxury Wedding Car Rentals', icon: Star },
    'hospitality': { label: 'Hospitality', icon: ArrowLeft },
    'floral-arrangements': { label: 'Floweral Arrangements', icon: Sparkles },
    'beauticians': { label: 'Beauticians', icon: Scissors },
    'pre-wedding-studios': { label: 'Pre wedding studios', icon: Camera },
    'pre-birthday-studios': { label: 'Pre Birthday Studios', icon: Camera },
    'photographers': { label: 'Photographers', icon: Camera },
    'video-editors': { label: 'Video Editors', icon: Camera },
    'drone-pilots': { label: 'Drone pilots', icon: Camera },
    'reels-makers': { label: 'Reels makers', icon: Camera },
    'lights-decorators': { label: 'Lights decorators', icon: Sparkles },
    'fire-works': { label: 'Fire works', icon: Sparkles },
    'live-food-stalls': { label: 'Live food stalls', icon: Utensils },
    'caterings': { label: 'Caterings', icon: Utensils },
    'cooking-masters': { label: 'Cooking Masters', icon: Utensils },
    'luxury-car-dealers': { label: 'Luxury car dealers', icon: Star },
    'bridal-groom-couture': { label: 'Bridal & Groom Couture', icon: Scissors },
    'wedding-fashions': { label: 'Wedding fashions', icon: Scissors },
    'special-effects': { label: 'Special effects', icon: Sparkles },
    'lighting-and-sound': { label: 'Lighting and sound', icon: Mic2 },
    'panditis-priests': { label: 'Panditis / Priests', icon: Heart },
    'transport-logistics': { label: 'Transport and logistics', icon: Star },
    'facility-staff': { label: 'Facility Support Staff', icon: ArrowLeft },
    'tent-house': { label: "Tent House supplier's", icon: Home },
    'birthday-decors': { label: 'Birthday decors', icon: Sparkles },
    'led-screen': { label: 'LED screen', icon: Camera },
    'live-streaming': { label: 'Live Streaming', icon: Camera },
    'wedding-essentials': { label: 'Wedding Essentials', icon: Gift },
    'live-performances': { label: 'Live Performances', icon: Music },
};

const CategoryResults = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filteredVendors, setFilteredVendors] = useState([]);
    const categoryInfo = CATEGORY_MAP[id] || { label: 'Search Results', icon: Sparkles };
    const Icon = categoryInfo.icon;

    useEffect(() => {
        const label = categoryInfo.label.toLowerCase();
        const results = MOCK_VENDORS.filter(v =>
            v.category.toLowerCase().includes(label) ||
            v.category.toLowerCase().replace(/-/g, ' ').includes(label) ||
            id.toLowerCase().replace(/-/g, ' ').includes(v.category.toLowerCase())
        );
        setFilteredVendors(results);
    }, [id, categoryInfo.label]);

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 pt-12 pb-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 active:scale-95 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">{categoryInfo.label}</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{filteredVendors.length} Verified Vendors</p>
                    </div>
                    <div className="ml-auto">
                        <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-[#FF4D6D] border border-pink-100 shadow-sm">
                            <Icon size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-32">
                {/* Search in Category */}
                <div className="relative group mb-10">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-300">
                        <Search size={16} />
                    </div>
                    <input
                        type="text"
                        placeholder={`Search in ${categoryInfo.label}...`}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-xs font-bold shadow-sm focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                    />
                </div>

                {/* Vendor List */}
                <div className="space-y-6">
                    {filteredVendors.length > 0 ? (
                        filteredVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                                className="bg-white p-5 rounded-[2.8rem] border border-gray-50 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex gap-6 hover:shadow-2xl hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                            >
                                <div className="w-28 h-28 bg-gray-50 rounded-[2.2rem] overflow-hidden relative shrink-0 shadow-inner border border-gray-100/50">
                                    <div className="w-full h-full bg-gradient-to-br from-pink-50/50 to-orange-50/50 flex items-center justify-center text-pink-200 group-hover:scale-110 transition-transform duration-500">
                                        <Icon size={36} />
                                    </div>
                                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white">
                                        <Star size={10} className="fill-[#FF4D6D] text-[#FF4D6D]" />
                                        <span className="text-[10px] font-black text-gray-900">{vendor.rating}</span>
                                    </div>
                                </div>

                                <div className="flex-1 py-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-black text-gray-900 group-hover:text-[#FF4D6D] transition-colors line-clamp-1 tracking-tight">{vendor.name}</h4>
                                        <button className="p-2 -mr-2 text-gray-200 hover:text-[#FF4D6D] transition-colors">
                                            <Heart size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-[9px] font-black text-[#FF4D6D] bg-pink-50 px-2 py-1 rounded-lg uppercase tracking-wider border border-pink-100">
                                            {vendor.category}
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                            <MapPin size={12} className="text-gray-300" /> {vendor.location}
                                        </div>
                                    </div>

                                    <div className="mt-auto border-t border-gray-50 pt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                                                <Phone size={10} className="text-emerald-500" />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-400">CONTACT</span>
                                        </div>
                                        <span className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-[0.1em]">Details</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-gray-50 shadow-inner">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
                                <Search size={40} />
                            </div>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-center text-xs">No vendors found in<br />this category yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryResults;
