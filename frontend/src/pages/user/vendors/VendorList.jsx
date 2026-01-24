import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ArrowRight, Star, IndianRupee, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import VendorCard from '../../../components/cards/VendorCard';

const VendorList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize category from navigation state if available, else default to 'Decoration'
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'Decoration');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Applied Filter States (These actively filter the list)
    const [appliedSortBy, setAppliedSortBy] = useState('rating');
    const [appliedPriceRange, setAppliedPriceRange] = useState([0, 200000]);
    const [appliedSelectedDate, setAppliedSelectedDate] = useState('');

    // Temporary Filter States (For the UI drawer, not applied until button click)
    const [tempSortBy, setTempSortBy] = useState('rating');
    const [tempPriceRange, setTempPriceRange] = useState([0, 200000]);
    const [tempSelectedDate, setTempSelectedDate] = useState('');

    const [showFilters, setShowFilters] = useState(false);

    // Sync temp state with applied state when opening drawer
    const toggleFilters = () => {
        if (!showFilters) {
            setTempSortBy(appliedSortBy);
            setTempPriceRange(appliedPriceRange);
            setTempSelectedDate(appliedSelectedDate);
        }
        setShowFilters(!showFilters);
    };

    const applyFilters = () => {
        setAppliedSortBy(tempSortBy);
        setAppliedPriceRange(tempPriceRange);
        setAppliedSelectedDate(tempSelectedDate);
        setShowFilters(false);
    };

    // Update category if location state changes
    useEffect(() => {
        if (location.state?.category) {
            setSelectedCategory(location.state.category);
        }
    }, [location.state]);

    // Image array for slideshow
    const images = [
        '/illustrations/vendor.jpg',
        '/illustrations/vendor2.jpg',
        '/illustrations/vendor3.jpg',
        '/illustrations/vendor4.jpg'
    ];

    // Categories with subcategories
    const categories = {
        "Decoration": [
            "Engagement", "Haldi / Mehndi", "Sangeet", "Batchelor party",
            "Bride-to-be Ceremony (Pellikuthuru)", "Groom-to-be Ceremony (Pellikoduku)",
            "Mandap", "Reception", "After Party / Family get together",
            "Cradle ceremony", "Saree/ Dothi ceremony", "House warming",
            "Birthday's", "Grand Welcome", "Retirement", "Others"
        ],
        "Photography & Videography": [
            "Candid", "Cinematic", "Regular Photo", "Regular Video", "Album",
            "Drone pilots", "Pre wedding", "Post wedding", "Teaser", "Digital Invitation"
        ],
        "Makeup Artist": ["Bride / Groom"],
        "Catering": ["Veg / Non Veg", "Live food stalls"],
        "Venues": ["Banquet Halls", "Lawns", "Resorts", "Hotels"],
        "Photo": ["Wedding", "Events"] // Mapping for Home page icons if needed
    };

    // Dummy Data with augmented fields (distance, bookedDates)
    const vendors = [
        // Decoration Vendors
        {
            id: 1,
            name: "Royal Decorators",
            category: "Decoration",
            subCategory: "Mandap",
            rating: 4.8,
            reviewCount: 124,
            location: "Bandra, Mumbai",
            price: 50000,
            distance: 5.2,
            bookedDates: ["2024-02-14", "2024-03-01"],
            image: "https://images.unsplash.com/photo-1519225468359-2996bc01c34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 2,
            name: "Dream Events",
            category: "Decoration",
            subCategory: "Birthday's",
            rating: 4.5,
            reviewCount: 89,
            location: "Andheri, Mumbai",
            price: 25000,
            distance: 2.1,
            bookedDates: [],
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 3,
            name: "Elegant Touch",
            category: "Decoration",
            subCategory: "Engagement",
            rating: 4.9,
            reviewCount: 210,
            location: "Juhu, Mumbai",
            price: 75000,
            distance: 8.5,
            bookedDates: ["2024-02-20"],
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false
        },
        {
            id: 4,
            name: "Celebration Makers",
            category: "Decoration",
            subCategory: "Haldi / Mehndi",
            rating: 4.6,
            reviewCount: 150,
            location: "Dadar, Mumbai",
            price: 30000,
            distance: 12.0,
            bookedDates: ["2024-01-25"],
            image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        // Photography
        {
            id: 7,
            name: "Creative Shots",
            category: "Photography & Videography",
            subCategory: "Candid",
            rating: 4.8,
            reviewCount: 156,
            location: "Versova, Mumbai",
            price: 40000,
            distance: 3.4,
            bookedDates: [],
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc364687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        // Makeup
        {
            id: 10,
            name: "Glam Studio",
            category: "Makeup Artist",
            subCategory: "Bride / Groom",
            rating: 4.7,
            reviewCount: 189,
            location: "Khar, Mumbai",
            price: 35000,
            distance: 1.8,
            bookedDates: ["2024-02-14"],
            image: "https://images.unsplash.com/photo-1571781948742-0ec7b5518a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        // Catering
        {
            id: 12,
            name: "Taste of India",
            category: "Catering",
            subCategory: "Veg / Non Veg",
            rating: 4.6,
            reviewCount: 167,
            location: "Dadar, Mumbai",
            price: 80000,
            distance: 6.7,
            bookedDates: [],
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        }
    ];

    // Slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Enhanced Filtering Logic
    const filteredVendors = vendors
        .filter(vendor => {
            // Category Filter
            const matchesCategory = vendor.category === selectedCategory ||
                (selectedCategory === 'Venues' && vendor.category === 'Decoration'); // Mock Fallback for new cats

            // Subcategory Filter
            const matchesSubCategory = selectedSubCategory === 'All' || vendor.subCategory === selectedSubCategory;

            // Budget Filter
            const matchesBudget = vendor.price >= appliedPriceRange[0] && vendor.price <= appliedPriceRange[1];

            // Date Availability Filter
            const matchesDate = !appliedSelectedDate || !vendor.bookedDates.includes(appliedSelectedDate);

            return matchesCategory && matchesSubCategory && matchesBudget && matchesDate;
        })
        .sort((a, b) => {
            switch (appliedSortBy) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating; // High to Low
                case 'distance':
                    return a.distance - b.distance; // Low to High
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-brand-light-pink/30 pb-24">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 px-6 pt-12 pb-6 shadow-sm rounded-b-[32px]">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center gap-4">

                        <h1 className="text-xl font-serif font-bold text-slate-800">Find Vendors</h1>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-pink/20 focus:outline-none placeholder:text-slate-400 text-sm font-medium"
                        />
                    </div>
                    <button
                        onClick={toggleFilters}
                        className={`w-12 flex items-center justify-center rounded-xl transition-colors shadow-lg ${showFilters ? 'bg-brand-pink text-white' : 'bg-slate-900 text-white shadow-slate-900/20'}`}
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Filter & Sort Drawer (Expandable) */}
                {showFilters && (
                    <div className="mt-4 p-5 bg-slate-50 rounded-2xl animate-in slide-in-from-top-2 border border-slate-100 shadow-xl relative z-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            {/* Sort Option */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Sort By</label>
                                <select
                                    value={tempSortBy}
                                    onChange={(e) => setTempSortBy(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-pink/20 outline-none"
                                >
                                    <option value="rating">Highest Rated</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="distance">Distance (Nearest)</option>
                                </select>
                            </div>

                            {/* Budget Range */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                                    Max Budget: ₹{(tempPriceRange[1] / 1000).toFixed(0)}k
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="5000"
                                    value={tempPriceRange[1]}
                                    onChange={(e) => setTempPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-brand-pink h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                                    <span>₹0</span>
                                    <span>₹2L+</span>
                                </div>
                            </div>

                            {/* Date Availability */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Event Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="date"
                                        value={tempSelectedDate}
                                        onChange={(e) => setTempSelectedDate(e.target.value)}
                                        className="w-full pl-10 p-3 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-pink/20 outline-none text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-end pt-4 border-t border-slate-200">
                            <button
                                onClick={() => {
                                    setTempSortBy('rating');
                                    setTempPriceRange([0, 200000]);
                                    setTempSelectedDate('');
                                }}
                                className="px-6 py-2.5 text-slate-500 text-sm font-bold mr-4 hover:text-slate-800 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyFilters}
                                className="bg-brand-pink text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-brand-pink/20 hover:bg-brand-dark-pink transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
                {/* Sidebar Categories */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-5 rounded-2xl shadow-sm sticky top-48">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-brand-pink rounded-full"></span>
                            Categories
                        </h3>

                        <div className="space-y-2 mb-4">
                            {Object.keys(categories).map((category) => (
                                category !== 'Photo' && category !== 'Venues' && ( // Hiding helper keys if needed, or showing them
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setSelectedSubCategory('All');
                                        }}
                                        className={`w-full text-left p-3 rounded-xl text-sm font-bold transition-all ${selectedCategory === category ? 'bg-brand-pink/10 text-brand-pink' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                                    >
                                        {category}
                                    </button>
                                )
                            ))}
                            {/* Explicitly showing Venues/Photo if they were passed from Home */}
                            {['Venues', 'Photo'].includes(selectedCategory) && (
                                <button
                                    className="w-full text-left p-3 rounded-xl text-sm font-bold bg-brand-pink/10 text-brand-pink"
                                >
                                    {selectedCategory}
                                </button>
                            )}
                        </div>

                        {/* Subcategories */}
                        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <button
                                onClick={() => setSelectedSubCategory('All')}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedSubCategory === 'All' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                            >
                                All
                            </button>
                            {(categories[selectedCategory] || []).map((sub, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSubCategory(sub)}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedSubCategory === sub ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vendor Grid */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                {selectedSubCategory === 'All' ? `${selectedCategory} Vendors` : `${selectedSubCategory}`}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                {filteredVendors.length} results found
                                {appliedSortBy !== 'rating' && ` • Sorted by ${appliedSortBy.replace('_', ' ')}`}
                            </p>
                        </div>
                    </div>

                    {filteredVendors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVendors.map(vendor => (
                                <VendorCard key={vendor.id} vendor={vendor} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-slate-800 font-bold text-lg mb-1">No Vendors Found</h3>
                            <p className="text-slate-400 text-sm">Try adjusting your filters or price range</p>
                            <button
                                onClick={() => {
                                    setAppliedPriceRange([0, 200000]);
                                    setAppliedSelectedDate('');
                                    setAppliedSortBy('rating');
                                }}
                                className="mt-4 text-brand-pink text-sm font-bold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorList;