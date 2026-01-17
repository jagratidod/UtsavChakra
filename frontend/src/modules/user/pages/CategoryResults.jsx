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
    Search,
    ChevronLeft,
    MessageCircle,
    Bell
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

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
    const [wishlist, setWishlist] = useState([]);
    const categoryInfo = CATEGORY_MAP[id] || { label: 'Search Results', icon: Sparkles };
    const Icon = categoryInfo.icon;

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        setWishlist(savedWishlist);
    }, []);

    const toggleWishlist = (e, vendorId) => {
        e.stopPropagation();
        let newWishlist;
        if (wishlist.includes(vendorId)) {
            newWishlist = wishlist.filter(id => id !== vendorId);
        } else {
            newWishlist = [...wishlist, vendorId];
        }
        setWishlist(newWishlist);
        localStorage.setItem('user_wishlist', JSON.stringify(newWishlist));
    };

    useEffect(() => {
        const label = categoryInfo.label.toLowerCase();
        const userLocation = localStorage.getItem('user_preference_location') || '';
        const locationLower = userLocation.toLowerCase();

        // First filter by category
        let results = MOCK_VENDORS.filter(v =>
            v.category.toLowerCase().includes(label) ||
            v.category.toLowerCase().replace(/-/g, ' ').includes(label) ||
            label.includes(v.category.toLowerCase()) ||
            (id && id.toLowerCase().replace(/-/g, ' ').includes(v.category.toLowerCase()))
        );

        // Then filter by user's preferred location if available
        if (locationLower) {
            const locationFiltered = results.filter(v =>
                v.location?.toLowerCase().includes(locationLower) ||
                v.city?.toLowerCase().includes(locationLower) ||
                locationLower.includes(v.city?.toLowerCase() || '')
            );
            // If location filter returns results, use them; otherwise show all category results
            if (locationFiltered.length > 0) {
                results = locationFiltered;
            }
        }

        setFilteredVendors(results);
    }, [id, categoryInfo.label]);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative">
            {/* Premium Header */}
            <div className="bg-[#2D328C] px-5 pt-10 pb-20 rounded-b-[2.5rem] relative overflow-hidden shrink-0 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="absolute top-20 -left-10 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 border border-white/10 shadow-lg">
                                <Icon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 italic">Browsing</span>
                                <h1 className="text-sm font-black text-white uppercase tracking-widest italic leading-none">{categoryInfo.label}</h1>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping"></div>
                        </div>
                    </div>

                    {/* Compact Integrated Search */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={14} />
                        <input
                            type="text"
                            placeholder={`Search in ${categoryInfo.label}...`}
                            className="w-full h-10 bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 text-[11px] font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/20 transition-all font-sans"
                        />
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="flex-1 px-5 pt-10 space-y-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{filteredVendors.length} Verified Options</span>
                </div>

                {filteredVendors.length > 0 ? (
                    <div className="space-y-6">
                        {filteredVendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                                className="group bg-white rounded-[1.8rem] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all active:scale-[0.98]"
                            >
                                <div className="relative h-44 overflow-hidden">
                                    <img src={vendor.coverImage || `https://images.unsplash.com/photo-${vendor.id % 2 === 0 ? '1519167758481-83f550bb49b3' : '1511795409834-ef04bbd61622'}?w=800&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={vendor.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                                    {/* Profile Branding Overlay */}
                                    <div className="absolute left-4 bottom-4 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl border-2 border-white shadow-xl overflow-hidden bg-white">
                                            <img src={vendor.profileImage || 'https://i.pravatar.cc/100'} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-white font-black text-sm tracking-tight uppercase leading-none drop-shadow-md">{vendor.name}</h4>
                                            <span className="text-white/70 text-[8px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                                                <MapPin size={8} /> {vendor.location}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => toggleWishlist(e, vendor.id)}
                                        className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all ${wishlist.includes(vendor.id) ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-white/20 text-white border border-white/20'}`}
                                    >
                                        <Heart size={14} fill={wishlist.includes(vendor.id) ? "white" : "none"} />
                                    </button>
                                </div>

                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Starting from</span>
                                            <span className="text-[13px] font-black text-[#1E226A]">₹{vendor.packages?.[0]?.price?.toLocaleString() || '10,000'}</span>
                                        </div>
                                        <div className="w-[1px] h-6 bg-gray-100"></div>
                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 rounded-lg">
                                            <Star size={10} className="fill-orange-400 text-orange-400" />
                                            <span className="text-[10px] font-black text-orange-700">{vendor.rating}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <a
                                            href={`tel:${vendor.phone}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-9 h-9 rounded-xl bg-[#2D328C] text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
                                        >
                                            <Phone size={14} />
                                        </a>
                                        <a
                                            href={`https://wa.me/${vendor.phone}`}
                                            target="_blank"
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md active:scale-90 transition-all font-sans"
                                        >
                                            <MessageCircle size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner px-10 text-center">
                        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-gray-200 mb-6 border border-gray-100">
                            <Search size={24} />
                        </div>
                        <h4 className="text-xs font-black text-[#1E226A] uppercase tracking-widest mb-2">No results found</h4>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter leading-relaxed">No vendors match this category yet.<br />Try exploring the general directory.</p>
                        <button
                            onClick={() => navigate('/user/vendor-directory')}
                            className="mt-6 px-8 py-3 bg-[#2D328C] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-blue-100"
                        >
                            Open Directory
                        </button>
                    </div>
                )}
            </div>

            <MobileNav />
        </div>
    );
};

export default CategoryResults;
