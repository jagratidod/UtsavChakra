import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Search,
    Star,
    MapPin,
    Heart,
    Phone,
    LayoutGrid,
    Mic,
    MessageCircle,
    Filter,
    X,
    Check,
    Navigation,
    User
} from 'lucide-react';
import { MOCK_VENDORS } from '../../../utils/constants';
import MobileNav from '../components/MobileNav';

const ALL_CATEGORIES = [
    { id: 'all', label: 'All Services' },
    { id: 'wedding-venues', label: 'Wedding venues' },
    { id: 'home-decors', label: 'Home decors' },
    { id: 'farm-house', label: 'Farm house' },
    { id: 'banquet-hall', label: 'Banquet hall' },
    { id: 'convention-centre', label: 'Convention centre' },
    { id: 'community-hall', label: 'Community Hall' },
    { id: 'religious-centres', label: 'Religious community centres' },
    { id: 'club-house', label: 'Club House' },
    { id: 'conference-hall', label: 'Conference hall' },
    { id: 'auditorium', label: 'Auditorium' },
    { id: 'resort', label: 'Resort' },
    { id: 'beach-resort', label: 'Beach Resort' },
    { id: 'hill-station-resort', label: 'Hill Station Resort' },
    { id: 'destination-resort', label: 'Destination Resort' },
    { id: 'gifting', label: 'Gifting' },
    { id: 'album-designer', label: 'Album designer' },
    { id: 'bartender', label: 'Bartender' },
    { id: 'magicians', label: 'Magicians' },
    { id: 'anchors', label: 'Anchors' },
    { id: 'garlands', label: 'Garlands' },
    { id: 'painting-activities', label: 'Painting Activities' },
    { id: 'german-hangers', label: 'German hangers' },
    { id: 'mangala-vadyam', label: 'Mangala vadyam' },
    { id: 'instant-photobooths', label: 'Instant Photo Booths' },
    { id: 'luxury-car-rentals', label: 'Luxury Wedding Car Rentals' },
    { id: 'hospitality', label: 'Hospitality' },
    { id: 'floral-arrangements', label: 'Floweral Arrangements' },
    { id: 'beauticians', label: 'Beauticians' },
    { id: 'pre-wedding-studios', label: 'Pre wedding studios' },
    { id: 'pre-birthday-studios', label: 'Pre Birthday Studios' },
    { id: 'photographers', label: 'Photographers' },
    { id: 'video-editors', label: 'Video Editors' },
    { id: 'album-designers', label: 'Album designers' },
    { id: 'drone-pilots', label: 'Drone pilots' },
    { id: 'reels-makers', label: 'Reels makers' },
    { id: 'lights-decorators', label: 'Lights decorators' },
    { id: 'fire-works', label: 'Fire works' },
    { id: 'live-food-stalls', label: 'Live food stalls' },
    { id: 'caterings', label: 'Caterings' },
    { id: 'cooking-masters', label: 'Cooking Masters' },
    { id: 'luxury-car-dealers', label: 'Luxury car dealers' },
    { id: 'bridal-groom-couture', label: 'Bridal & Groom Couture' },
    { id: 'wedding-fashions', label: 'Wedding fashions' },
    { id: 'special-effects', label: 'Special effects' },
    { id: 'lighting-and-sound', label: 'Lighting and sound' },
    { id: 'panditis-priests', label: 'Panditis / Priests' },
    { id: 'transport-logistics', label: 'Transport and logistics' },
    { id: 'facility-staff', label: 'Facility Support Staff' },
    { id: 'tent-house', label: "Tent House supplier's" },
    { id: 'birthday-decors', label: 'Birthday decors' },
    { id: 'led-screen', label: 'LED screen' },
    { id: 'live-streaming', label: 'Live Streaming' },
    { id: 'wedding-essentials', label: 'Wedding Essentials' },
    { id: 'live-performances', label: 'Live Performances' }
];

const VendorDirectory = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredVendors, setFilteredVendors] = useState(MOCK_VENDORS);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

    const placeholders = [
        "Search for 'Elite Venues'...",
        "Looking for 'Photographers'?",
        "Find 'Best Caterers' nearby...",
        "Discover 'Mehndi Artists'..."
    ];

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        setWishlist(savedWishlist);
    }, []);

    const toggleWishlist = (vendorId) => {
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
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeout;

        const animate = () => {
            const currentString = placeholders[currentStringIndex];

            if (isDeleting) {
                setAnimatedPlaceholder(currentString.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setAnimatedPlaceholder(currentString.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentString.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % placeholders.length;
                typeSpeed = 500;
            }

            timeout = setTimeout(animate, typeSpeed);
        };

        animate();
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        let results = MOCK_VENDORS;

        if (selectedCategory !== 'all') {
            const cat = ALL_CATEGORIES.find(c => c.id === selectedCategory);
            const label = cat ? cat.label.toLowerCase() : selectedCategory.toLowerCase();
            results = results.filter(v =>
                v.category.toLowerCase().includes(label) ||
                v.category.toLowerCase().replace(/-/g, ' ').includes(label)
            );
        }

        if (searchQuery) {
            results = results.filter(v =>
                v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredVendors(results);
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans">
            {/* Liquid Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF4D6D]/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF8540]/5 rounded-full blur-[120px]"></div>
            </div>

            {/* Premium Sticky Header */}
            <div className="sticky top-0 z-[110] bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-6 pt-12 pb-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 active:scale-95 transition-all hover:border-pink-200 hover:text-[#FF4D6D]"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">Marketplace</h1>
                            <div className="flex items-center gap-1.5 mt-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none">{filteredVendors.length} Pro Partners</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated Search Bar */}
                <div className="relative group transition-all">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-300 group-focus-within:text-[#FF4D6D] transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={animatedPlaceholder}
                        className="w-full bg-gray-50/50 border-gray-100 border rounded-3xl py-5 pl-14 pr-6 text-sm font-bold shadow-inner focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none placeholder:text-gray-300 text-gray-700"
                    />
                </div>
            </div>

            <div className="p-6 pb-40 relative z-10">
                {/* Horizontal Category Pill Filter */}
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em]">Explore Categories</h3>
                        <button
                            onClick={() => setIsFilterModalOpen(true)}
                            className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest flex items-center gap-1.5"
                        >
                            <Filter size={12} /> List All
                        </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-6 px-6">
                        {ALL_CATEGORIES.slice(0, 10).map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`shrink-0 px-6 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat.id
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-xl shadow-gray-200'
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-pink-200 hover:text-[#FF4D6D]'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Vendor Listings - Optimized Grid */}
                <div className="space-y-12">
                    {filteredVendors.length > 0 ? (
                        <div className="grid grid-cols-1 gap-12">
                            {filteredVendors.map((vendor) => (
                                <div
                                    key={vendor.id}
                                    onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                                    className="group cursor-pointer bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/40 border border-gray-100/50 transition-all duration-500 hover:shadow-pink-100 hover:-translate-y-1"
                                >
                                    {/* Cover Image Section */}
                                    <div className="relative h-56 w-full">
                                        {vendor.coverImage ? (
                                            <img
                                                src={vendor.coverImage}
                                                alt={vendor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-[#FF4D6D] to-[#FF8540]"></div>
                                        )}
                                        <div className="absolute inset-0 bg-black/10"></div>

                                        {/* Profile Overlay Branding */}
                                        <div className="absolute inset-x-6 bottom-4 flex items-center gap-4">
                                            <div className="w-24 h-24 rounded-full border-[5px] border-white shadow-2xl overflow-hidden bg-white shrink-0 transform transition-transform group-hover:scale-105 duration-500">
                                                {vendor.profileImage ? (
                                                    <img src={vendor.profileImage} alt={vendor.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-200">
                                                        <User size={36} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-2">
                                                <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full inline-flex items-center gap-1.5 shadow-xl border border-white/50">
                                                    <Star size={12} className="fill-[#FFB800] text-[#FFB800]" />
                                                    <span className="text-[12px] font-black text-gray-900">{vendor.rating}</span>
                                                </div>
                                                <h5 className="text-white text-[12px] font-black uppercase tracking-[0.2em] mt-3 drop-shadow-md">
                                                    {vendor.category}
                                                </h5>
                                            </div>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleWishlist(vendor.id);
                                            }}
                                            className={`absolute top-6 right-6 p-3.5 rounded-full backdrop-blur-md transition-all duration-300 transform active:scale-125 shadow-2xl ${wishlist.includes(vendor.id)
                                                    ? 'bg-[#FF4D6D] text-white shadow-pink-200'
                                                    : 'bg-white/30 text-white border border-white/40 hover:bg-[#FF4D6D]'
                                                }`}
                                        >
                                            <Heart size={22} fill={wishlist.includes(vendor.id) ? "currentColor" : "none"} strokeWidth={2.5} />
                                        </button>
                                    </div>

                                    {/* Content Details */}
                                    <div className="px-8 pt-8 pb-10">
                                        <div className="mb-8">
                                            <h4 className="text-[26px] font-black text-gray-900 tracking-tight group-hover:text-[#FF4D6D] transition-colors leading-tight mb-2">
                                                {vendor.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">
                                                <MapPin size={14} className="text-[#FF4D6D]" /> {vendor.location}
                                            </div>
                                        </div>

                                        {/* Precision Communication Buttons */}
                                        <div className="flex gap-4 pt-8 border-t border-gray-50">
                                            <a
                                                href={`tel:${vendor.phone}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 bg-[#0F172A] text-white rounded-[2rem] flex flex-col items-center justify-center gap-2 py-5 shadow-xl shadow-gray-200 active:scale-95 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                                                    <Phone size={14} fill="white" strokeWidth={3} />
                                                </div>
                                                Call
                                            </a>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert("Voice Direct feature coming soon!");
                                                }}
                                                className="flex-1 bg-[#0EA5E9] text-white rounded-[2rem] flex flex-col items-center justify-center gap-2 py-5 shadow-xl shadow-sky-100 active:scale-95 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                                                    <Mic size={14} fill="white" strokeWidth={3} />
                                                </div>
                                                Record
                                            </button>
                                            <a
                                                href={`https://wa.me/${vendor.phone?.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex-1 bg-[#10B981] text-white rounded-[2rem] flex flex-col items-center justify-center gap-2 py-5 shadow-xl shadow-emerald-100 active:scale-95 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center border border-white/5">
                                                    <MessageCircle size={14} fill="white" strokeWidth={3} />
                                                </div>
                                                WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[4rem] border border-gray-100 shadow-inner px-16 text-center">
                            <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 mb-8">
                                <Navigation size={48} strokeWidth={1} />
                            </div>
                            <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">Search Empty</h4>
                            <p className="text-xs font-bold text-gray-400 mt-3 leading-relaxed">No partners found for this criteria. Try resetting your search filter.</p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                                className="mt-12 px-12 py-5 bg-gray-900 text-white rounded-[1.8rem] font-black text-[11px] uppercase tracking-[0.25em] shadow-2xl active:scale-95 transition-all"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Filter Bottom Sheet Modal */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full rounded-t-[3.5rem] p-10 animate-slide-up shadow-2xl max-h-[85vh] flex flex-col">
                        <div className="flex items-center justify-between mb-10 shrink-0">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tighter italic">Signature Services</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.25em] mt-2">Pick your signature category</p>
                            </div>
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 space-y-4">
                            {ALL_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setIsFilterModalOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-10 py-6 rounded-[2rem] transition-all border ${selectedCategory === cat.id
                                            ? 'bg-pink-50 border-pink-100 text-[#FF4D6D] shadow-inner'
                                            : 'bg-white border-transparent hover:bg-gray-50 text-gray-500'
                                        }`}
                                >
                                    <span className="text-[14px] font-black uppercase tracking-widest">{cat.label}</span>
                                    {selectedCategory === cat.id && <Check size={22} strokeWidth={4} />}
                                </button>
                            ))}
                        </div>

                        <div className="pt-10 pb-6 shrink-0 px-2">
                            <button
                                onClick={() => setIsFilterModalOpen(false)}
                                className="w-full py-7 bg-gray-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.35em] shadow-2xl active:scale-95 transition-all"
                            >
                                Confirm Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default VendorDirectory;
