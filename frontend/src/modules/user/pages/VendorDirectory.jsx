import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    SlidersHorizontal,
    X,
    Check,
    Navigation,
    User,
    ChevronDown,
    ChevronUp,
    Scale,
    Sparkles,
    Trash2,
    Calendar,
    ChevronLeft
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
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredVendors, setFilteredVendors] = useState(MOCK_VENDORS);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [categorySearchQuery, setCategorySearchQuery] = useState('');

    const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
    const [selectedDate, setSelectedDate] = useState('');
    const [showSmartFilters, setShowSmartFilters] = useState(false);

    const [pendingPrice, setPendingPrice] = useState(200000);
    const [pendingDate, setPendingDate] = useState('');

    const [compareList, setCompareList] = useState([]);
    const [showCompareModal, setShowCompareModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");

    const placeholders = ["Elite Venues", "Photographers", "Caterers", "Mehndi Artists"];

    // Read search query from URL params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlSearch = searchParams.get('search');
        if (urlSearch) {
            setSearchQuery(urlSearch);
        }
    }, [location.search]);

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

    const toggleCompare = (e, vendorId) => {
        e.stopPropagation();
        if (compareList.includes(vendorId)) {
            setCompareList(compareList.filter(id => id !== vendorId));
        } else if (compareList.length < 3) {
            setCompareList([...compareList, vendorId]);
        }
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
            let typeSpeed = isDeleting ? 30 : 60;
            if (!isDeleting && currentCharIndex === currentString.length) {
                typeSpeed = 2000;
                isDeleting = true;
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
        const userLocation = localStorage.getItem('user_preference_location') || '';
        const locationLower = userLocation.toLowerCase();

        let results = MOCK_VENDORS;

        // Filter by category
        if (selectedCategory !== 'all') {
            const cat = ALL_CATEGORIES.find(c => c.id === selectedCategory);
            const label = cat ? cat.label.toLowerCase() : selectedCategory.toLowerCase();
            results = results.filter(v => v.category.toLowerCase().includes(label));
        }

        // Filter by search query
        if (searchQuery) {
            results = results.filter(v =>
                v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by user's preferred location
        if (locationLower && !searchQuery) {
            const locationFiltered = results.filter(v =>
                v.location?.toLowerCase().includes(locationLower) ||
                v.city?.toLowerCase().includes(locationLower) ||
                locationLower.includes(v.city?.toLowerCase() || '')
            );
            if (locationFiltered.length > 0) {
                results = locationFiltered;
            }
        }

        // Filter by price range
        results = results.filter(v => {
            const lowPrice = v.packages ? Math.min(...v.packages.map(p => p.price)) : 0;
            return lowPrice >= priceRange.min && lowPrice <= priceRange.max;
        });

        setFilteredVendors(results);
    }, [selectedCategory, searchQuery, priceRange, selectedDate]);

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative">
            {/* Minimal Header Container */}
            <div className="bg-[#2D328C] px-5 pt-10 pb-20 rounded-b-[2.5rem] relative overflow-hidden shrink-0 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 animate-pulse"></div>
                <div className="absolute top-20 -left-10 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <button onClick={() => navigate(-1)} className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-95 transition-all">
                            <ChevronLeft size={16} strokeWidth={3} />
                        </button>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Vendor Directory</span>
                        <div className="w-8 h-8"></div>
                    </div>

                    {/* Compact Integrated Search */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-orange-400 transition-colors" size={14} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={`Search ${animatedPlaceholder}...`}
                                className="w-full h-10 bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 text-[11px] font-bold text-white placeholder:text-white/20 outline-none focus:bg-white/20 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => setShowSmartFilters(!showSmartFilters)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${showSmartFilters ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/50 border border-white/10'}`}
                        >
                            <SlidersHorizontal size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Smart Filters Dropdown */}
            {showSmartFilters && (
                <div className="px-5 -mt-12 relative z-[100] animate-in slide-in-from-top-4 duration-300">
                    <div className="bg-white rounded-[1.5rem] p-5 shadow-2xl border border-gray-50 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-[#1E226A] uppercase tracking-widest">Filter Search</span>
                            <button onClick={() => { setPendingPrice(200000); setPriceRange({ min: 0, max: 200000 }); }} className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Reset</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Budget: ₹{pendingPrice.toLocaleString()}</label>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                step="5000"
                                value={pendingPrice}
                                onChange={(e) => setPendingPrice(parseInt(e.target.value))}
                                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2D328C]"
                            />
                        </div>
                        <button
                            onClick={() => { setPriceRange({ min: 0, max: pendingPrice }); setShowSmartFilters(false); }}
                            className="w-full bg-[#2D328C] text-white py-3 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg shadow-blue-100"
                        >
                            Apply Criteria
                        </button>
                    </div>
                </div>
            )}

            {/* Category Pilla Bar */}
            <div className="px-5 py-4 overflow-x-auto no-scrollbar flex gap-2 shrink-0 bg-white sticky top-0 z-[80] border-b border-gray-50">
                {ALL_CATEGORIES.slice(0, 10).map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap text-[9px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-[#2D328C] text-white shadow-md' : 'bg-gray-50 text-gray-400 border border-gray-100 hover:bg-white hover:text-[#2D328C]'}`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* List Header */}
            <div className="px-5 py-5 flex justify-between items-center">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{filteredVendors.length} Studios Found</span>
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center gap-1.5 text-[9px] font-black text-[#2D328C] uppercase tracking-widest"
                >
                    <LayoutGrid size={12} /> Categories
                </button>
            </div>

            {/* Main Vendor List */}
            <div className="flex-1 px-5 space-y-6 pb-20">
                {filteredVendors.map((vendor) => (
                    <div
                        key={vendor.id}
                        onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                        className="group bg-white rounded-[1.8rem] overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all active:scale-[0.98]"
                    >
                        <div className="relative h-44 overflow-hidden">
                            <img src={vendor.coverImage || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={vendor.name} />
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
                                onClick={(e) => { e.stopPropagation(); toggleWishlist(vendor.id); }}
                                className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all ${wishlist.includes(vendor.id) ? 'bg-orange-500 text-white' : 'bg-white/20 text-white border border-white/20'}`}
                            >
                                <Heart size={14} fill={wishlist.includes(vendor.id) ? "white" : "none"} />
                            </button>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[7px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Entry Pricing</span>
                                    <span className="text-[13px] font-black text-[#1E226A]">₹{vendor.packages?.[0]?.price?.toLocaleString() || '10k'}</span>
                                </div>
                                <div className="w-[1px] h-6 bg-gray-100"></div>
                                <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 rounded-lg">
                                    <Star size={10} className="fill-orange-400 text-orange-400" />
                                    <span className="text-[10px] font-black text-orange-700">{vendor.rating}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => toggleCompare(e, vendor.id)}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${compareList.includes(vendor.id) ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
                                >
                                    <Scale size={16} />
                                </button>
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
                                    className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md active:scale-90 transition-all"
                                >
                                    <MessageCircle size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Compare Bar Mobile */}
            {compareList.length > 0 && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] z-[150] animate-in slide-in-from-bottom-5">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl p-3 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {compareList.map(id => (
                                    <div key={id} className="w-8 h-8 rounded-lg border-2 border-gray-900 overflow-hidden bg-white">
                                        <img src={MOCK_VENDORS.find(v => v.id === id)?.profileImage} className="w-full h-full object-cover" alt="" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">{compareList.length}/3 Chosen</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setCompareList([])} className="p-2 text-white/40"><X size={16} /></button>
                            <button
                                onClick={() => setShowCompareModal(true)}
                                className="bg-orange-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest"
                            >
                                Compare
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* All Categories Modal Refined */}
            {isFilterModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[200] flex items-end justify-center px-4 pb-4">
                    <div className="bg-white w-full max-w-[400px] rounded-[2rem] p-6 animate-in slide-in-from-bottom-10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-[#1E226A] uppercase tracking-widest italic">All Services</h3>
                            <button onClick={() => setIsFilterModalOpen(false)} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 active:scale-90"><X size={16} /></button>
                        </div>

                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                            <input
                                type="text"
                                placeholder="Filter category..."
                                value={categorySearchQuery}
                                onChange={(e) => setCategorySearchQuery(e.target.value)}
                                className="w-full h-10 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-100 rounded-xl pl-10 pr-4 text-[11px] font-bold outline-none transition-all"
                            />
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 pr-1">
                            {ALL_CATEGORIES
                                .filter(cat => cat.label.toLowerCase().includes(categorySearchQuery.toLowerCase()))
                                .map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setIsFilterModalOpen(false); }}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${selectedCategory === cat.id ? 'bg-blue-50 text-[#2D328C]' : 'hover:bg-gray-50 text-gray-600'}`}
                                    >
                                        <span className="text-[11px] font-black uppercase tracking-tight">{cat.label}</span>
                                        {selectedCategory === cat.id && <Check size={14} strokeWidth={4} />}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Comparison Logic remains as per requirement but with compact UI */}
            {showCompareModal && (
                <div className="fixed inset-0 z-[300] bg-white flex flex-col p-5 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-black text-[#1E226A] uppercase tracking-widest italic">Metrics View</h3>
                        <button onClick={() => setShowCompareModal(false)} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400"><X size={20} /></button>
                    </div>

                    <div className="flex-1 overflow-x-auto no-scrollbar">
                        <table className="w-full text-left min-w-[600px] border-separate border-spacing-x-4">
                            <thead>
                                <tr>
                                    <th className="pb-8 w-32"><span className="text-[8px] font-black uppercase text-gray-300 tracking-[0.2em]">Grid Meta</span></th>
                                    {compareList.map(id => {
                                        const v = MOCK_VENDORS.find(vend => vend.id === id);
                                        return (
                                            <th key={id} className="pb-8 text-center">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100 mb-3">
                                                        <img src={v.profileImage} className="w-full h-full object-cover" alt="" />
                                                    </div>
                                                    <span className="text-[10px] font-black text-[#1E226A] uppercase truncate w-24 text-center">{v.name}</span>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className="text-[10px] font-bold uppercase tracking-widest text-[#1E226A]">
                                <tr className="border-b border-gray-50">
                                    <td className="py-6 text-gray-300">Rating</td>
                                    {compareList.map(id => <td key={id} className="py-6 text-center text-orange-500 font-black">{MOCK_VENDORS.find(v => v.id === id).rating}</td>)}
                                </tr>
                                <tr className="border-b border-gray-50">
                                    <td className="py-6 text-gray-300">Location</td>
                                    {compareList.map(id => <td key={id} className="py-6 text-center text-gray-500">{MOCK_VENDORS.find(v => v.id === id).location}</td>)}
                                </tr>
                                <tr>
                                    <td className="py-10 bg-gray-50 rounded-l-2xl pl-4">Starting</td>
                                    {compareList.map(id => <td key={id} className="py-10 text-center font-black text-[#2D328C] bg-gray-50 last:rounded-r-2xl">₹{MOCK_VENDORS.find(v => v.id === id).packages[0].price.toLocaleString()}</td>)}
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="pb-10">
                        <button
                            onClick={() => { alert("Inquiry Sent!"); setShowCompareModal(false); setCompareList([]); }}
                            className="w-full bg-[#2D328C] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-blue-100"
                        >
                            Bulk Inquiry
                        </button>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default VendorDirectory;
