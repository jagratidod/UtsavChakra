import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_VENDORS } from '../../../utils/constants';
import pagesData from '../../../data/pages.json';
import LanguageSelector from '../../../components/ui/LanguageSelector';
import {
    Bell,
    Home,
    Search,
    User,
    Calendar,
    Camera,
    Heart,
    MapPin,
    Star,
    Sparkles,
    Settings,
    Grid,
    History,
    MessageCircle,
    ChevronRight,
    Phone,
    SlidersHorizontal,
    Music,
    Utensils,
    Gift,
    Scissors,
    Mic2,
    Palette,
    X,
    ChevronLeft,
    Clock,
    UserCircle
} from 'lucide-react';
import logo from '../../../assets/logo/utsavchakralogo.png';
import calendarIcon from '../../../assets/icons/calender-removebg-preview.png';
import vendorListIcon from '../../../assets/icons/vendorlist-removebg-preview.png';
import findVenuesIcon from '../../../assets/vendor icons/findvenues.png';
import photosIcon from '../../../assets/icons/photos.png';

const ALL_CATEGORIES = [
    { id: 'wedding-venues', label: 'Wedding venues', icon: Home, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop' },
    { id: 'home-decors', label: 'Home decors', icon: Sparkles, img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&h=200&fit=crop' },
    { id: 'farm-house', label: 'Farm house', icon: Home, img: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=200&h=200&fit=crop' },
    { id: 'banquet-hall', label: 'Banquet hall', icon: Calendar, img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop' },
    { id: 'convention-centre', label: 'Convention centre', icon: Grid, img: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=200&h=200&fit=crop' },
    { id: 'community-hall', label: 'Community Hall', icon: User, img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=200&fit=crop' },
    { id: 'religious-centres', label: 'Religious community centres', icon: Heart, img: 'https://images.unsplash.com/photo-1548625315-9989bc1197c3?w=200&h=200&fit=crop' },
    { id: 'club-house', label: 'Club House', icon: Home, img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop' },
    { id: 'conference-hall', label: 'Conference hall', icon: Mic2, img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200&h=200&fit=crop' },
    { id: 'auditorium', label: 'Auditorium', icon: Mic2, img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop' },
    { id: 'resort', label: 'Resort', icon: Home, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=200&fit=crop' },
    { id: 'beach-resort', label: 'Beach Resort', icon: Home, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&h=200&fit=crop' },
    { id: 'hill-station-resort', label: 'Hill Station Resort', icon: Home, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=200&fit=crop' },
    { id: 'destination-resort', label: 'Destination Resort', icon: MapPin, img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200&h=200&fit=crop' },
    { id: 'gifting', label: 'Gifting', icon: Gift, img: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=200&h=200&fit=crop' },
    { id: 'album-designer', label: 'Album designer', icon: Palette, img: 'https://images.unsplash.com/photo-1544648397-72ab6de978ad?w=200&h=200&fit=crop' },
    { id: 'bartender', label: 'Bartender', icon: Utensils, img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200&h=200&fit=crop' },
    { id: 'magicians', label: 'Magicians', icon: Sparkles, img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop' },
    { id: 'anchors', label: 'Anchors', icon: Mic2, img: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=200&h=200&fit=crop' },
    { id: 'garlands', label: 'Garlands', icon: Palette, img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&h=200&fit=crop' },
    { id: 'painting-activities', label: 'Painting Activities', icon: Palette, img: 'https://images.unsplash.com/photo-1460662136040-556e7980d418?w=200&h=200&fit=crop' },
    { id: 'german-hangers', label: 'German hangers', icon: Home, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop' },
    { id: 'mangala-vadyam', label: 'Mangala vadyam', icon: Music, img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop' },
    { id: 'instant-photobooths', label: 'Instant Photo Booths', icon: Camera, img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=200&h=200&fit=crop' },
    { id: 'luxury-car-rentals', label: 'Luxury Wedding Car Rentals', icon: Star, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop' },
    { id: 'hospitality', label: 'Hospitality', icon: User, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop' },
    { id: 'floral-arrangements', label: 'Floweral Arrangements', icon: Sparkles, img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=200&h=200&fit=crop' },
    { id: 'beauticians', label: 'Beauticians', icon: Scissors, img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop' },
    { id: 'pre-wedding-studios', label: 'Pre wedding studios', icon: Camera, img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=200&h=200&fit=crop' },
    { id: 'pre-birthday-studios', label: 'Pre Birthday Studios', icon: Camera, img: 'https://images.unsplash.com/photo-1502086223501-7ea2443f84fd?w=200&h=200&fit=crop' },
    { id: 'photographers', label: 'Photographers', icon: Camera, img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=200&h=200&fit=crop' },
    { id: 'video-editors', label: 'Video Editors', icon: Camera, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200&h=200&fit=crop' },
    { id: 'album-designers', label: 'Album designers', icon: Palette, img: 'https://images.unsplash.com/photo-1544648397-72ab6de978ad?w=200&h=200&fit=crop' },
    { id: 'drone-pilots', label: 'Drone pilots', icon: Camera, img: 'https://images.unsplash.com/photo-1473968512647-3e44a47144e1?w=200&h=200&fit=crop' },
    { id: 'reels-makers', label: 'Reels makers', icon: Camera, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200&h=200&fit=crop' },
    { id: 'lights-decorators', label: 'Lights decorators', icon: Sparkles, img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=200&h=200&fit=crop' },
    { id: 'fire-works', label: 'Fire works', icon: Sparkles, img: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=200&h=200&fit=crop' },
    { id: 'live-food-stalls', label: 'Live food stalls', icon: Utensils, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&fit=crop' },
    { id: 'caterings', label: 'Caterings', icon: Utensils, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&fit=crop' },
    { id: 'cooking-masters', label: 'Cooking Masters', icon: Utensils, img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&fit=crop' },
    { id: 'luxury-car-dealers', label: 'Luxury car dealers', icon: Star, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop' },
    { id: 'bridal-groom-couture', label: 'Bridal & Groom Couture', icon: Scissors, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&h=200&fit=crop' },
    { id: 'wedding-fashions', label: 'Wedding fashions', icon: Scissors, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&h=200&fit=crop' },
    { id: 'special-effects', label: 'Special effects', icon: Sparkles, img: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=200&h=200&fit=crop' },
    { id: 'lighting-and-sound', label: 'Lighting and sound', icon: Mic2, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop' },
    { id: 'panditis-priests', label: 'Panditis / Priests', icon: Heart, img: 'https://images.unsplash.com/photo-1548625315-9989bc1197c3?w=200&h=200&fit=crop' },
    { id: 'transport-logistics', label: 'Transport and logistics', icon: Star, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=200&fit=crop' },
    { id: 'facility-staff', label: 'Facility Support Staff', icon: User, img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200&h=200&fit=crop' },
    { id: 'tent-house', label: "Tent House supplier's", icon: Home, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=200&fit=crop' },
    { id: 'birthday-decors', label: 'Birthday decors', icon: Sparkles, img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=200&h=200&fit=crop' },
    { id: 'led-screen', label: 'LED screen', icon: Camera, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200&h=200&fit=crop' },
    { id: 'live-streaming', label: 'Live Streaming', icon: Camera, img: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200&h=200&fit=crop' },
    { id: 'wedding-essentials', label: 'Wedding Essentials', icon: Gift, img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&h=200&fit=crop' },
    { id: 'live-performances', label: 'Live Performances', icon: Music, img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop' },
];

const CategoryCard = ({ icon: Icon, label, active, onClick, img }) => (
    <div className="flex flex-col items-center gap-2.5 shrink-0 w-20" onClick={onClick}>
        <div className={`w-16 h-16 rounded-full shadow-sm border-2 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden relative group ${active
            ? 'border-[#FF4D6D] scale-110 shadow-lg shadow-pink-100'
            : 'border-gray-100 hover:border-pink-200 hover:scale-105'
            }`}>
            {img ? (
                <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            ) : (
                <div className="w-full h-full bg-pink-50 flex items-center justify-center text-[#FF4D6D]">
                    <Icon size={24} />
                </div>
            )}
            {active && <div className="absolute inset-0 bg-[#FF4D6D]/20"></div>}
        </div>
        <span className={`text-[9px] font-black uppercase tracking-tight text-center leading-tight transition-colors ${active ? 'text-[#FF4D6D]' : 'text-gray-500 group-hover:text-gray-900'}`}>
            {label}
        </span>
    </div>
);

const UserDashboard = () => {
    const navigate = useNavigate();
    const [locationSearch, setLocationSearch] = useState('');
    const [filteredVendors, setFilteredVendors] = useState(MOCK_VENDORS);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [isVenueModalOpen, setIsVenueModalOpen] = useState(false);
    const [venueForm, setVenueForm] = useState({
        userName: 'Julliet Yirrah',
        eventDate: '',
        location: '',
        timing: 'Morning',
        specificTime: ''
    });

    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const placeholders = [
        "Search the venue...",
        "Search the vendor...",
        "Find photographers...",
        "Looking for decors?",
        "Discover caterers...",
        "Book a makeup artist..."
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
        // Load preferences on mount
        const prefLocation = localStorage.getItem('user_preference_location');
        if (prefLocation && !locationSearch) {
            setLocationSearch(prefLocation);
        }
    }, []);

    useEffect(() => {
        let results = MOCK_VENDORS;

        if (locationSearch) {
            results = results.filter(v =>
                v.location.toLowerCase().includes(locationSearch.toLowerCase()) ||
                v.city?.toLowerCase().includes(locationSearch.toLowerCase())
            );
        }

        setFilteredVendors(results);
    }, [locationSearch]);

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
                typeSpeed = 2000; // Pause at the end
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

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col font-sans pb-32">
                {/* Premium Header */}
                <div className="bg-white/95 backdrop-blur-2xl border-b border-gray-100 px-6 pt-10 pb-6 sticky top-0 z-50">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-pink-100 shadow-lg border border-pink-50">
                                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-gray-900 tracking-tighter leading-none">Utsav Chakra</h1>
                                <div className="flex items-center gap-1.5 mt-1.5">
                                    {locationSearch ? (
                                        <div className="flex items-center gap-1 bg-pink-50/50 px-2 py-0.5 rounded-lg border border-pink-100/50">
                                            <MapPin size={10} className="text-[#FF4D6D]" />
                                            <span className="text-[9px] font-black text-[#FF4D6D] uppercase tracking-widest truncate max-w-[120px]">{locationSearch}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Online</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="scale-90 origin-right">
                                <LanguageSelector />
                            </div>
                            <button
                                onClick={() => navigate('/user/profile')}
                                className="w-11 h-11 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 shadow-sm hover:border-[#FF4D6D] hover:text-[#FF4D6D] transition-all group active:scale-95"
                            >
                                <User size={22} className="group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Search & Location Controls */}
                    <div className="space-y-3">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF4D6D]">
                                <Search size={18} className="text-gray-300" />
                            </div>
                            <input
                                type="text"
                                placeholder={animatedPlaceholder}
                                className="w-full bg-gray-50/80 border-transparent border rounded-[1.6rem] py-4 pl-14 pr-6 text-sm font-bold text-gray-700 focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none placeholder:text-gray-300 shadow-inner"
                            />
                        </div>

                        {!locationSearch && (
                            <div className="flex gap-2 animate-fade-in-down">
                                <div className="relative flex-1 group">
                                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-[#FF4D6D]">
                                        <MapPin size={18} className="text-[#FF4D6D]/40" />
                                    </div>
                                    <input
                                        type="text"
                                        value={locationSearch}
                                        onChange={(e) => setLocationSearch(e.target.value)}
                                        placeholder="Nearest Location (Banjara Hills...)"
                                        className="w-full bg-pink-50/20 border-gray-100 border rounded-[1.6rem] py-3.5 pl-14 pr-6 text-xs font-black text-gray-700 focus:bg-white focus:border-pink-200 focus:ring-4 focus:ring-pink-500/5 transition-all outline-none"
                                    />
                                </div>
                                <button className="w-12 h-12 bg-white border border-gray-100 rounded-[1.2rem] flex items-center justify-center text-gray-400 hover:text-[#FF4D6D] hover:border-pink-100 transition-all shadow-sm">
                                    <SlidersHorizontal size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 space-y-10">
                    {/* Hero section removed as per request */}

                    {/* Fine-tuned Category Selection */}
                    <div className="relative -mx-6 px-6 py-8 bg-gray-50/50">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Top Categories</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {ALL_CATEGORIES.slice(0, 6).map((cat) => (
                                <CategoryCard
                                    key={cat.id}
                                    img={cat.img}
                                    label={cat.label}
                                    active={false}
                                    onClick={() => navigate(`/user/category/${cat.id}`)}
                                />
                            ))}
                            {/* View All Button */}
                            <div className="flex flex-col items-center gap-2.5 shrink-0 w-20" onClick={() => setShowAllCategories(true)}>
                                <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#FF4D6D] hover:text-[#FF4D6D] transition-all cursor-pointer bg-white active:scale-95 group">
                                    <Grid size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-tight text-center text-gray-400">All</span>
                            </div>
                        </div>
                    </div>
                    {/* Horizontal Image Actions - No Background Containers */}
                    <div className="flex justify-around items-center px-4 mt-10">
                        <div
                            className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
                            onClick={() => setIsVenueModalOpen(true)}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32">
                                <img src={findVenuesIcon} alt="Find Venues" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
                            onClick={() => navigate('/user/schedule')}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32">
                                <img src={calendarIcon} alt="Schedule" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
                            onClick={() => navigate('/user/gallery')}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32">
                                <img src={photosIcon} alt="Gallery" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center group cursor-pointer active:scale-95 transition-all"
                            onClick={() => navigate('/user/vendor-directory')}
                        >
                            <div className="w-24 h-24 md:w-32 md:h-32">
                                <img src={vendorListIcon} alt="Directory" className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Category Sidebar Popup */}
                {showAllCategories && (
                    <div className="fixed inset-0 z-[100] flex">
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
                            onClick={() => setShowAllCategories(false)}
                        ></div>
                        <div className="relative w-[300px] h-full bg-white shadow-2xl animate-slide-in-right flex flex-col ml-auto">
                            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter">All Services</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Discover what we offer</p>
                                </div>
                                <button
                                    onClick={() => setShowAllCategories(false)}
                                    className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm active:scale-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {(() => {
                                    const nudeColors = [
                                        'bg-[#FDF5E6]', // Old Lace
                                        'bg-[#FAF0E6]', // Linen
                                        'bg-[#FFF5EE]', // Seashell
                                        'bg-[#F5F5DC]', // Beige
                                        'bg-[#FAF9F6]', // Off White
                                        'bg-[#F2E8DF]', // Nude Taupe
                                        'bg-[#E9DCC9]', // Vanilla
                                        'bg-[#FFF0F5]', // Lavender Blush
                                    ];

                                    return ALL_CATEGORIES.map((cat, index) => {
                                        const bgColor = nudeColors[index % nudeColors.length];
                                        return (
                                            <div
                                                key={cat.id}
                                                onClick={() => navigate(`/user/category/${cat.id}`)}
                                                className={`flex items-center gap-5 group cursor-pointer p-5 rounded-none border-l-4 border-transparent hover:border-[#FF4D6D] hover:shadow-[20px_0_40px_rgba(0,0,0,0.03)] transition-all duration-400 ${bgColor}`}
                                            >
                                                <div className="w-14 h-14 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-all duration-500 relative overflow-hidden shrink-0 group-hover:scale-105">
                                                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col flex-1">
                                                    <span className="text-sm font-medium tracking-[0.05em] transition-colors text-gray-900 group-hover:text-[#FF4D6D] font-serif italic">
                                                        {cat.label}
                                                    </span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[8px] font-light text-gray-400 uppercase tracking-[0.3em]">View Collection</span>
                                                        <div className="h-[1px] w-4 bg-gray-200 group-hover:w-8 group-hover:bg-[#FF4D6D] transition-all"></div>
                                                    </div>
                                                </div>
                                                <div className="text-gray-300 group-hover:text-[#FF4D6D] transition-all">
                                                    <ChevronRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>

                        </div>
                    </div>
                )}

                {/* Full Vendor List with Contact Info */}
                <div className="pb-10">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Available Vendors</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {locationSearch ? `In ${locationSearch}` : 'Across all locations'}
                            </p>
                        </div>
                        <div className="bg-pink-50 px-3 py-1.5 rounded-xl border border-pink-100">
                            <span className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest">{filteredVendors.length} Listings</span>
                        </div>
                    </div>

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
                                            <Sparkles size={36} />
                                        </div>
                                        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1.5 shadow-sm border border-white">
                                            <Star size={10} className="fill-[#FF4D6D] text-[#FF4D6D]" />
                                            <span className="text-[10px] font-black text-gray-900">{vendor.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 py-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-black text-gray-900 group-hover:text-[#FF4D6D] transition-colors line-clamp-1 tracking-tight">{vendor.name}</h4>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleWishlist(vendor.id);
                                                }}
                                                className={`p-2 -mr-2 transition-all duration-300 transform active:scale-125 ${wishlist.includes(vendor.id) ? 'text-[#FF4D6D]' : 'text-gray-200'}`}
                                            >
                                                <Heart size={20} fill={wishlist.includes(vendor.id) ? "currentColor" : "none"} />
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

                                        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                    <Phone size={14} />
                                                </div>
                                                <span className="text-[11px] font-black text-gray-600 tracking-tight">{vendor.phone}</span>
                                            </div>
                                            <div className="w-10 h-10 bg-[#FF4D6D] rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
                                                <ChevronRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3.5rem] border border-gray-50 shadow-inner">
                                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-200 mb-6">
                                    <Search size={40} />
                                </div>
                                <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">No Vendors Found</h4>
                                <p className="text-xs font-bold text-gray-400 mt-2 text-center max-w-[200px]">We couldn't find any local partners in this area.</p>
                                <button
                                    onClick={() => setLocationSearch('')}
                                    className="mt-8 px-8 py-3 bg-[#FF4D6D] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-pink-200 active:scale-95 transition-all"
                                >
                                    View All Vendors
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Floated Bottom Nav */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-50">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.8rem] p-3 shadow-[0_25px_60px_rgba(255,77,109,0.15)] flex justify-between items-center px-4 relative">
                    <button className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-[#FF4D6D] relative group">
                        <div className="absolute top-[-12px] w-1 h-1 bg-[#FF4D6D] rounded-full"></div>
                        <Home size={22} strokeWidth={3} />
                        <span className="text-[8px] font-black uppercase tracking-tighter">Home</span>
                    </button>
                    <button className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group">
                        <History size={22} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Record</span>
                    </button>
                    <button
                        onClick={() => navigate('/user/wishlist')}
                        className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group"
                    >
                        <Heart size={22} className={wishlist.length > 0 ? "fill-[#FF4D6D] text-[#FF4D6D]" : ""} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Saved</span>
                    </button>
                    <button
                        onClick={() => navigate('/user/messages')}
                        className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group"
                    >
                        <MessageCircle size={22} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Chats</span>
                    </button>
                    <button
                        onClick={() => navigate('/user/profile')}
                        className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group"
                    >
                        <User size={22} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Me</span>
                    </button>
                </div>
            </div>

            {/* Venue Search Modal */}
            {
                isVenueModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-md">
                        <div className="bg-white w-full rounded-t-[3rem] p-10 animate-slide-up shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-none">Find Perfect Venue</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Set your requirements</p>
                                </div>
                                <button onClick={() => setIsVenueModalOpen(false)} className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6 pb-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2 flex items-center gap-2">
                                        <UserCircle size={12} /> User Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        value={venueForm.userName}
                                        onChange={(e) => setVenueForm({ ...venueForm, userName: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2 flex items-center gap-2">
                                        <Calendar size={12} /> Event Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        value={venueForm.eventDate}
                                        onChange={(e) => setVenueForm({ ...venueForm, eventDate: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2 flex items-center gap-2">
                                        <MapPin size={12} /> Conventional Venue Location
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Hyderabad, Banjara Hills"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        value={venueForm.location}
                                        onChange={(e) => setVenueForm({ ...venueForm, location: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2 flex items-center gap-2">
                                            <Clock size={12} /> Preference
                                        </label>
                                        <div className="flex gap-2">
                                            {['Morning', 'Evening'].map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setVenueForm({ ...venueForm, timing: time })}
                                                    className={`flex-1 py-4 rounded-2xl font-black text-[9px] uppercase tracking-widest transition-all ${venueForm.timing === time
                                                        ? 'bg-[#FF4D6D] text-white shadow-lg shadow-pink-100'
                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2 flex items-center gap-2">
                                            <Clock size={12} /> Specific Time
                                        </label>
                                        <input
                                            type="time"
                                            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none h-[52px]"
                                            value={venueForm.specificTime}
                                            onChange={(e) => setVenueForm({ ...venueForm, specificTime: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setLocationSearch(venueForm.location);
                                        setIsVenueModalOpen(false);
                                        navigate('/user/category/wedding-venues');
                                    }}
                                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4"
                                >
                                    Search Venues <Sparkles size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default UserDashboard;
