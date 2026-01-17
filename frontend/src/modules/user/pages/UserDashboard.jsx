import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_VENDORS } from '../../../utils/constants';
import {
    Bell,
    Home,
    Search,
    User,
    Calendar,
    Heart,
    MapPin,
    Star,
    Mic2,
    X,
    ChevronRight,
    ChevronLeft,
    Grid,
    Gift,
    Scissors,
    Camera,
    Music,
    Sparkles,
    Utensils,
    Settings,
    Zap,
    Clock,
    CheckCircle,
    AlertCircle,
    Megaphone,
    PartyPopper
} from 'lucide-react';
import logo from '../../../assets/logo/utsavchakralogo.png';
import MobileNav from '../components/MobileNav';

const CategoryCard = ({ label, onClick, img, bgColor }) => (
    <div className="flex flex-col items-center gap-2 shrink-0 w-24" onClick={onClick}>
        <div className={`w-20 h-20 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden relative group ${bgColor || 'bg-white'}`}>
            {img ? (
                <img src={img} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-[#FF4D6D]">
                    <Search size={32} />
                </div>
            )}
        </div>
        <span className="text-[10px] font-bold text-gray-700 text-center leading-tight">
            {label}
        </span>
    </div>
);

const SERVICE_GROUPS = [
    {
        title: "1. Venues",
        desc: "Event locations",
        icon: Home,
        subgroups: [
            {
                name: "Wedding & Event Venues",
                items: [
                    { label: "Wedding Venues", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200" },
                    { label: "Banquet Halls", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200" },
                    { label: "Convention Centres", img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=200" },
                    { label: "Community Halls", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200" },
                    { label: "Religious Centres", img: "https://images.unsplash.com/photo-1544253324-44ed556f8f74?w=200" },
                    { label: "Club Houses", img: "https://images.unsplash.com/photo-1540339832862-4745591bf6a3?w=200" },
                    { label: "Conference Halls", img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=200" },
                    { label: "Auditoriums", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200" }
                ]
            },
            {
                name: "Outdoor & Destination",
                items: [
                    { label: "Farm Houses", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200" },
                    { label: "Resorts", img: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=200" },
                    { label: "Beach Resorts", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200" },
                    { label: "Hill Station", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200" },
                    { label: "Destination", img: "https://images.unsplash.com/photo-1510076857177-74700760f198?w=200" }
                ]
            }
        ]
    },
    {
        title: "2. Gifting & Accessories",
        desc: "Decor & gifts",
        icon: Gift,
        items: [
            { label: "Custom Gifting", img: "https://images.unsplash.com/photo-1549465220-1a129d2f2d9e?w=200" },
            { label: "Garlands", img: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200" },
            { label: "Painting", img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200" },
            { label: "Instant Photo", img: "https://images.unsplash.com/photo-1520853502340-919530a24c0a?w=200" }
        ]
    },
    {
        title: "3. Luxury Transport",
        desc: "Premium vehicles",
        icon: Star,
        items: [
            { label: "Wedding Cars", img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200" },
            { label: "Luxury Dealers", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200" }
        ]
    },
    {
        title: "4. Beauty & Styling",
        desc: "Fashion & grooming",
        icon: Scissors,
        items: [
            { label: "Beauticians", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200" },
            { label: "Bridal Couture", img: "https://images.unsplash.com/photo-1513220556209-1cd4c4c23c10?w=200" },
            { label: "Pre-Wedding", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200" },
            { label: "Groom Wear", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200" }
        ]
    },
    {
        title: "5. Photography & Media",
        desc: "Visual creation",
        icon: Camera,
        items: [
            { label: "Photographers", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200" },
            { label: "Videographers", img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=200" },
            { label: "Drone Pilots", img: "https://images.unsplash.com/photo-1473968512647-3e4402444c5e?w=200" },
            { label: "Reels Makers", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200" }
        ]
    },
    {
        title: "6. Entertainment",
        desc: "Artists & live acts",
        icon: Music,
        items: [
            { label: "Anchors", img: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=200" },
            { label: "Magicians", img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=200" },
            { label: "Live Bands", img: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=200" },
            { label: "Fireworks", img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=200" }
        ]
    }
];

const UserDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userLocation, setUserLocation] = useState('');
    const [userCategory, setUserCategory] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [activeGroupIdx, setActiveGroupIdx] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/user/vendor-directory?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    const [currentAdIdx, setCurrentAdIdx] = useState(0);
    const [currentPartnerAdIdx, setCurrentPartnerAdIdx] = useState(0);
    const [filteredVendors, setFilteredVendors] = useState(MOCK_VENDORS);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'booking',
            title: 'Booking Confirmed!',
            message: 'Your booking with Elite Celebrations for Feb 14 has been confirmed.',
            time: '2 hours ago',
            read: false,
            icon: CheckCircle,
            color: 'text-green-500'
        },
        {
            id: 2,
            type: 'reminder',
            title: 'Upcoming Event Reminder',
            message: 'Your wedding venue visit is scheduled for tomorrow at 11:00 AM.',
            time: '5 hours ago',
            read: false,
            icon: Clock,
            color: 'text-orange-500'
        },
        {
            id: 3,
            type: 'promo',
            title: '🎉 Special Offer!',
            message: 'Get 20% off on all photography packages this weekend.',
            time: '1 day ago',
            read: true,
            icon: Megaphone,
            color: 'text-purple-500'
        },
        {
            id: 4,
            type: 'reminder',
            title: 'Payment Due',
            message: 'Advance payment for Royal Catering Services is due in 3 days.',
            time: '1 day ago',
            read: true,
            icon: AlertCircle,
            color: 'text-red-500'
        },
        {
            id: 5,
            type: 'update',
            title: 'New Vendor Added',
            message: '5 new photographers are now available in your area.',
            time: '2 days ago',
            read: true,
            icon: PartyPopper,
            color: 'text-blue-500'
        }
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    // Load user preferences from localStorage
    useEffect(() => {
        const savedLocation = localStorage.getItem('user_preference_location') || '';
        const savedCategory = localStorage.getItem('user_preference_category') || '';
        setUserLocation(savedLocation);
        setUserCategory(savedCategory);

        // Filter vendors by location
        if (savedLocation) {
            const locationLower = savedLocation.toLowerCase();
            const filtered = MOCK_VENDORS.filter(v =>
                v.location?.toLowerCase().includes(locationLower) ||
                v.city?.toLowerCase().includes(locationLower) ||
                locationLower.includes(v.city?.toLowerCase() || '')
            );
            setFilteredVendors(filtered.length > 0 ? filtered : MOCK_VENDORS);
        } else {
            setFilteredVendors(MOCK_VENDORS);
        }
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('all') === 'true') {
            setShowCategories(true);
        }
    }, [location]);

    const AD_SLIDES = [
        {
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
            title: "Memorable Weddings",
            subtitle: "Up to 30% off on premium venues"
        },
        {
            image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
            title: "Exquisite Catering",
            subtitle: "Delighted guests, heavenly tastes"
        },
        {
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
            title: "Candid Photography",
            subtitle: "Capturing moments that last forever"
        }
    ];

    const PARTNER_ADS = [
        {
            type: 'partners',
            brands: [
                { role: 'FASHION', name: 'MUFTI' },
                { role: 'TIME', name: 'TIMEX' },
                { role: 'TRAVEL', name: 'WILDCRAFT' }
            ]
        },
        {
            type: 'bank',
            bank: 'HDFC BANK',
            offer: '10% Instant Discount*'
        },
        {
            type: 'partners',
            brands: [
                { role: 'SHOES', name: 'ADIDAS' },
                { role: 'TECH', name: 'APPLE' },
                { role: 'STYLE', name: 'ZARA' }
            ]
        },
        {
            type: 'bank',
            bank: 'ICICI BANK',
            offer: 'Flat ₹2000 Cashback*'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPartnerAdIdx((prev) => (prev + 1) % PARTNER_ADS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIdx((prev) => (prev + 1) % AD_SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

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

    return (
        <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans pb-32 max-w-[440px] mx-auto shadow-2xl shadow-blue-900/10 border-x border-blue-50 relative">
            {/* Dark Blue Header Container */}
            <div className="bg-[#2D328C] px-4 pt-4 pb-10 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
                {/* Liquid Background Decorations */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 -left-20 w-48 h-48 bg-orange-400/20 rounded-full blur-3xl"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                            <span className="text-white font-bold text-xl tracking-tight">Utsav Chakra</span>
                        </div>
                        {/* Location Badge under Title */}
                        <div className="flex items-center gap-1.5 text-white/90 pl-1 cursor-pointer" onClick={() => navigate('/user/preferences')}>
                            <MapPin size={14} className="text-orange-400" />
                            <span className="text-xs font-bold">{userLocation || 'Select Location'}</span>
                            <ChevronRight size={12} className="opacity-50" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                        <div className="relative cursor-pointer" onClick={() => setShowNotifications(true)}>
                            <Bell size={24} className="text-white" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden cursor-pointer shadow-lg" onClick={() => navigate('/user/profile')}>
                            <img src="https://i.pravatar.cc/100?u=user123" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                {/* Search Section (Floating) */}
                <form onSubmit={handleSearch} className="space-y-3 -mb-6 relative z-10 mx-4">
                    <div className="bg-white rounded-xl shadow-xl p-0.5 flex items-center gap-2 border border-blue-50">
                        <div className="pl-3 text-gray-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for services..."
                            className="flex-1 py-2 text-xs font-bold text-gray-700 outline-none"
                        />
                        <button type="submit" className="pr-3 text-gray-400 hover:text-[#2D328C] transition-colors">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Main Content Area */}
            <div className="px-4 mt-1 py-4 space-y-6">
                {/* Popular Services Section - Now under Location */}
                <div className="animate-fade-in-down">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-[#1E226A] tracking-tight">Popular Services</h3>
                        <button
                            onClick={() => setShowCategories(true)}
                            className="text-[#2D328C] text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                            View All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                        {[
                            { id: 'flower-decoration', label: 'Flower Decoration', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200&h=200&fit=crop', bgColor: 'bg-orange-50' },
                            { id: 'caterings', label: 'Catering', img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=200&fit=crop', bgColor: 'bg-blue-50' },
                            { id: 'mehndi', label: 'Mehndi', img: 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=200&h=200&fit=crop', bgColor: 'bg-purple-50' },
                            { id: 'photographers', label: 'Photography', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop', bgColor: 'bg-pink-50' },
                            { id: 'beauticians', label: 'Makeup', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop', bgColor: 'bg-yellow-50' },
                        ].map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                img={cat.img}
                                label={cat.label}
                                bgColor={cat.bgColor}
                                onClick={() => navigate(`/user/category/${cat.id}`)}
                            />
                        ))}
                    </div>
                </div>

                {/* Auto-Swapping Hero Banner Section (Premium Ad Style) */}
                <div
                    onClick={() => navigate('/user/category/wedding-venues')}
                    className="relative mx-auto w-full rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-[6px] border-[#D4D925] aspect-[4/3] md:aspect-[21/9]"
                >
                    {/* Background Image */}
                    <img
                        src={AD_SLIDES[currentAdIdx].image}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 transform scale-100 group-hover:scale-105"
                        alt="Advertisement"
                    />

                    {/* Bottom-heavy Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-10 px-6 text-center z-10">
                        {/* Brand Logo Pill */}
                        <div className="bg-white rounded-xl py-2.5 px-6 flex items-center justify-center gap-4 mb-4 shadow-xl scale-90 md:scale-100 border border-gray-100 relative">
                            <div className="flex items-center gap-3">
                                <span className="text-[#E50012] font-black text-xl italic tracking-tighter">H&M</span>
                                <div className="w-[1px] h-6 bg-gray-200"></div>
                                <span className="text-[#002D72] font-bold text-lg tracking-tighter">mothercare</span>
                            </div>
                            {/* Small '& More' tag */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                & More
                            </div>
                        </div>

                        {/* Text Items */}
                        <div className="animate-fade-in-up">
                            <h3 className="text-white text-base md:text-lg font-bold mb-1 tracking-tight">
                                {AD_SLIDES[currentAdIdx].title}
                            </h3>
                            <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                                {AD_SLIDES[currentAdIdx].subtitle}
                            </h2>
                        </div>
                    </div>

                    {/* Progress dots */}
                    <div className="absolute top-6 right-6 flex gap-1.5 z-20">
                        {AD_SLIDES.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentAdIdx === i ? 'w-8 bg-[#D4D925]' : 'w-2 bg-white/40'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-black text-[#1E226A] tracking-tight">
                            {userLocation ? `Top Vendors in ${userLocation.split(',')[0]}` : 'Top Vendors Near You'}
                        </h3>
                        <button
                            onClick={() => navigate('/user/vendor-directory')}
                            className="text-[#2D328C] text-xs font-bold flex items-center gap-1 hover:underline"
                        >
                            View All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                        {(filteredVendors.length > 0 ? filteredVendors : MOCK_VENDORS).slice(0, 4).map((vendor) => (
                            <div key={vendor.id} className="min-w-[260px] md:min-w-[300px] bg-white rounded-2xl overflow-hidden shadow-lg shadow-blue-900/5 border border-gray-50 flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300" onClick={() => navigate(`/vendor-details/${vendor.id}`)}>
                                <div className="h-36 relative overflow-hidden">
                                    <img src={`https://images.unsplash.com/photo-${vendor.id % 2 === 0 ? '1519167758481-83f550bb49b3' : '1511795409834-ef04bbd61622'}?w=400&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={vendor.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(vendor.id); }}
                                        className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all active:scale-125 ${wishlist.includes(vendor.id) ? 'bg-[#FF4D6D] text-white' : 'bg-white/70 text-gray-600 hover:bg-white'}`}
                                    >
                                        <Heart size={16} fill={wishlist.includes(vendor.id) ? "white" : "none"} />
                                    </button>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-[#1E226A] text-[13px] leading-tight group-hover:text-[#2D328C] transition-colors line-clamp-1">{vendor.name}</h4>
                                            <div className="flex items-center gap-1 text-[8px] text-[#2D328C] font-bold mt-0.5">
                                                <span className="opacity-70">{vendor.category} • {vendor.location}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0 gap-0.5">
                                            <div className="flex items-center gap-0.5 bg-orange-50 px-1 py-0.5 rounded-lg border border-orange-100">
                                                <Star size={9} className="fill-orange-400 text-orange-400" />
                                                <span className="text-[9px] font-black text-orange-700">{vendor.rating}</span>
                                            </div>
                                            <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest">{vendor.reviews || '220'} reviews</span>
                                        </div>
                                    </div>

                                    <div className="pt-1.5 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Starting from</span>
                                            <span className="text-sm font-black text-[#1E226A]">₹{vendor.packages?.[0]?.price?.toLocaleString() || '10,000'}</span>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigate(`/vendor-details/${vendor.id}`); }}
                                            className="bg-gradient-to-r from-[#2D328C] to-[#4F46E5] text-white px-4 py-1.5 rounded-lg font-black text-[9px] shadow-md shadow-blue-50 active:scale-95 transition-all uppercase tracking-widest"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Partner Advertisement Section (Fading Animation) */}
                <div className="relative w-full space-y-3">
                    <div className="flex justify-center gap-1 mb-2">
                        {[0, 1, 2, 3].map((i) => (
                            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${currentPartnerAdIdx === i ? 'w-4 bg-[#FF4D6C]' : 'w-1 bg-gray-200'}`} />
                        ))}
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-white h-16">
                        <div key={currentPartnerAdIdx} className="animate-in fade-in duration-1000 p-4 h-full flex items-center">
                            <div className="flex items-center justify-between w-full gap-4">
                                {PARTNER_ADS[currentPartnerAdIdx].type === 'partners' ? (
                                    PARTNER_ADS[currentPartnerAdIdx].brands.map((brand, bIdx) => (
                                        <div key={bIdx} className="flex items-center gap-2 border-r last:border-r-0 border-gray-100 pr-4 last:pr-0">
                                            <div className="flex flex-col">
                                                <span className="text-[6px] font-black text-gray-400 uppercase tracking-tighter leading-none">{brand.role}</span>
                                                <span className="text-[6px] font-black text-gray-400 uppercase tracking-tighter leading-none">PARTNER</span>
                                            </div>
                                            <span className="text-sm font-black text-gray-900 tracking-tighter uppercase italic">{brand.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-[#002D72] text-white px-3 py-1.5 rounded font-black text-sm italic">
                                                {PARTNER_ADS[currentPartnerAdIdx].bank}
                                            </div>
                                            <div className="w-[1px] h-8 bg-gray-100"></div>
                                            <span className="text-xs font-black text-gray-800 uppercase tracking-tight">
                                                {PARTNER_ADS[currentPartnerAdIdx].offer}
                                            </span>
                                        </div>
                                        <span className="text-[6px] text-gray-300 rotate-90 whitespace-nowrap">*T&C Apply</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Redesigned Categories Full-Screen Modal (Boutique Style) */}
            {showCategories && (
                <div className="fixed inset-0 z-[200] bg-white flex flex-col animate-fade-in max-w-[500px] mx-auto shadow-2xl">
                    {/* Header */}
                    <div className="bg-[#2D328C] px-5 py-6 flex items-center justify-between shadow-xl relative overflow-hidden shrink-0">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <button
                                onClick={() => setShowCategories(false)}
                                className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white"
                            >
                                <ChevronLeft size={18} strokeWidth={3} />
                            </button>
                            <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Shop By Category</h2>
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white"><Search size={16} /></button>
                            <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white"><Bell size={16} /></button>
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Sidebar */}
                        <div className="w-20 bg-[#F8FAFC] overflow-y-auto flex flex-col gap-0 border-r border-gray-100 no-scrollbar pb-32">
                            {SERVICE_GROUPS.map((group, idx) => {
                                const Icon = group.icon;
                                const isActive = activeGroupIdx === idx;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveGroupIdx(idx)}
                                        className={`flex flex-col items-center justify-center py-6 px-1 relative transition-all duration-500 group ${isActive ? 'bg-white' : 'bg-transparent hover:bg-white/40'}`}
                                    >
                                        {isActive && (
                                            <>
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-orange-500 rounded-r-full shadow-[0_0_15px_rgba(249,115,22,0.6)] animate-in slide-in-from-left duration-300 animate-indicator-glow" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-transparent pointer-events-none"></div>
                                            </>
                                        )}
                                        <div className={`w-12 h-12 rounded-[1.3rem] flex items-center justify-center mb-2 transition-all duration-500 overflow-hidden relative shadow-sm animate-tilt ${isActive ? 'bg-[#2D328C] text-white shadow-xl shadow-blue-200 -translate-y-0.5 scale-110 animate-boutique-bounce' : 'bg-white text-gray-300 border border-gray-50'}`}>
                                            {isActive && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent"></div>
                                            )}
                                            <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                                        </div>
                                        <span className={`text-[8px] font-black text-center leading-none uppercase tracking-[0.05em] transition-all duration-300 ${isActive ? 'text-[#2D328C] scale-105' : 'text-gray-400 opacity-60'}`}>
                                            {group.title.split('. ')[1].split(' ')[0]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-white overflow-y-auto p-5 no-scrollbar slide-in-bottom">
                            <div className="space-y-8">
                                <section className="space-y-6">
                                    <div className="flex flex-col gap-1.5">
                                        <h3 className="text-[12px] font-black text-[#1E226A] uppercase tracking-widest italic pl-1">
                                            In The Spotlight
                                        </h3>
                                        <div className="w-10 h-1 bg-orange-400 rounded-full ml-1" />
                                    </div>

                                    {/* Subgroups or Items in Grid */}
                                    {SERVICE_GROUPS[activeGroupIdx].subgroups ? (
                                        <div className="space-y-10">
                                            {SERVICE_GROUPS[activeGroupIdx].subgroups.map((sub, sIdx) => (
                                                <div key={sIdx} className="space-y-4">
                                                    <h4 className="text-[8px] font-black text-orange-500 uppercase tracking-[0.2em] pl-2 border-l-2 border-orange-500/30">
                                                        {sub.name}
                                                    </h4>
                                                    <div className="grid grid-cols-3 gap-y-6 gap-x-3">
                                                        {sub.items.map((item, iIdx) => (
                                                            <button
                                                                key={iIdx}
                                                                onClick={() => {
                                                                    setShowCategories(false);
                                                                    navigate(`/user/category/${item.label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
                                                                }}
                                                                className="flex flex-col items-center gap-2 active:scale-95 transition-transform group"
                                                            >
                                                                <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                                                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                                </div>
                                                                <span className="text-[8px] font-black text-gray-500 text-center leading-tight uppercase tracking-tighter group-hover:text-[#2D328C]">
                                                                    {item.label}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 gap-y-6 gap-x-3">
                                            {SERVICE_GROUPS[activeGroupIdx].items.map((item, iIdx) => (
                                                <button
                                                    key={iIdx}
                                                    onClick={() => {
                                                        setShowCategories(false);
                                                        navigate(`/user/category/${item.label.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`);
                                                    }}
                                                    className="flex flex-col items-center gap-2 active:scale-95 transition-transform group"
                                                >
                                                    <div className="w-16 h-16 rounded-[1.5rem] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm group-hover:border-blue-100 group-hover:shadow-md transition-all">
                                                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                    </div>
                                                    <span className="text-[8px] font-black text-gray-500 text-center leading-tight uppercase tracking-tighter group-hover:text-[#2D328C]">
                                                        {item.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </section>

                                {/* Trending / Footer Section */}
                                <div className="pt-6 border-t border-gray-50">
                                    <div className="bg-[#2D328C]/5 p-4 rounded-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#2D328C] rounded-xl flex items-center justify-center text-white"><Sparkles size={18} /></div>
                                            <div>
                                                <p className="text-[9px] font-black text-[#2D328C] uppercase tracking-widest">Premium Support</p>
                                                <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">Contact Concierge</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-[#2D328C]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Panel Modal */}
            {showNotifications && (
                <div className="fixed inset-0 z-[100] max-w-[440px] mx-auto">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setShowNotifications(false)}
                    ></div>

                    {/* Panel */}
                    <div className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        {/* Header */}
                        <div className="bg-[#2D328C] px-5 pt-12 pb-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <h2 className="text-white font-black text-lg tracking-tight">Notifications</h2>
                                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">
                                        {unreadCount} unread messages
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white active:scale-95 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="mt-4 text-[10px] font-black text-orange-400 uppercase tracking-widest hover:underline"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                            {notifications.map((notification) => {
                                const Icon = notification.icon;
                                return (
                                    <div
                                        key={notification.id}
                                        onClick={() => markAsRead(notification.id)}
                                        className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer active:scale-[0.98] ${notification.read
                                            ? 'border-gray-100'
                                            : 'border-[#2D328C]/20 shadow-lg shadow-blue-900/5'
                                            }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notification.read ? 'bg-gray-100' : 'bg-[#2D328C]/10'
                                                }`}>
                                                <Icon size={18} className={notification.color} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className={`text-[12px] font-black leading-tight ${notification.read ? 'text-gray-600' : 'text-[#2D328C]'
                                                        }`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.read && (
                                                        <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1"></div>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Clock size={10} className="text-gray-300" />
                                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {notification.time}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty State */}
                            {notifications.length === 0 && (
                                <div className="text-center py-12">
                                    <Bell size={48} className="text-gray-200 mx-auto mb-4" />
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                        No notifications yet
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <button
                                onClick={() => {
                                    setShowNotifications(false);
                                    navigate('/user/schedule');
                                }}
                                className="w-full py-3 bg-[#2D328C] rounded-xl text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                            >
                                <Calendar size={14} />
                                View All Reminders
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default UserDashboard;
