import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ArrowRight, Star, IndianRupee, MapPin, Calendar, CheckCircle, X, Check, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import VendorCard from '../../../components/cards/VendorCard';

const VendorList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State Refactored: Single Category, Multi Subcategories
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'Decoration');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // Custom dropdown state
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // Custom sort dropdown state
    const [selectedSubCategories, setSelectedSubCategories] = useState([]); // Array for multi-select
    const [selectedVendorIds, setSelectedVendorIds] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Applied Filter States
    const [appliedSortBy, setAppliedSortBy] = useState('rating');
    const [appliedPriceRange, setAppliedPriceRange] = useState([0, 200000]);
    const [appliedSelectedDate, setAppliedSelectedDate] = useState('');

    // Temporary Filter States
    const [tempSortBy, setTempSortBy] = useState('rating');
    const [tempPriceRange, setTempPriceRange] = useState([0, 200000]);
    const [tempSelectedDate, setTempSelectedDate] = useState('');

    const [showFilters, setShowFilters] = useState(false);

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

    useEffect(() => {
        if (location.state?.category) {
            setSelectedCategory(location.state.category);
            setSelectedSubCategories([]); // Reset subcats on nav
        }
    }, [location.state]);

    // Categories Data
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
        "Photo": ["Wedding", "Events"]
    };

    const sortOptions = [
        { value: 'rating', label: 'Highest Rated' },
        { value: 'price_asc', label: 'Price: Low to High' },
        { value: 'price_desc', label: 'Price: High to Low' },
        { value: 'distance', label: 'Distance (Nearest)' }
    ];

    // Helper to change category (Single Select)
    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setSelectedSubCategories([]); // Reset subcats
    };

    // Helper to toggle subcategory (Multi Select)
    const toggleSubCategory = (sub) => {
        if (selectedSubCategories.includes(sub)) {
            setSelectedSubCategories(prev => prev.filter(s => s !== sub));
        } else {
            setSelectedSubCategories(prev => [...prev, sub]);
        }
    };

    // Helper to toggle vendor selection
    const toggleVendorSelection = (id, e) => {
        e.stopPropagation();
        if (selectedVendorIds.includes(id)) {
            setSelectedVendorIds(prev => prev.filter(vId => vId !== id));
        } else {
            setSelectedVendorIds(prev => [...prev, id]);
        }
    };

    // Dummy Data
    const vendors = [
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

    // Filter Logic
    const filteredVendors = vendors
        .filter(vendor => {
            // Category Filter (Single)
            const matchesCategory = vendor.category === selectedCategory ||
                (selectedCategory === 'Venues' && vendor.category === 'Decoration');

            // Subcategory Filter (Multi)
            const matchesSubCategory = selectedSubCategories.length === 0 ||
                selectedSubCategories.includes(vendor.subCategory);

            // Budget Filter
            const matchesBudget = vendor.price >= appliedPriceRange[0] && vendor.price <= appliedPriceRange[1];

            // Date Availability Filter
            const matchesDate = !appliedSelectedDate || !vendor.bookedDates.includes(appliedSelectedDate);

            return matchesCategory && matchesSubCategory && matchesBudget && matchesDate;
        })
        .sort((a, b) => {
            // 1. PIN SELECTED VENDORS TO TOP
            const aSelected = selectedVendorIds.includes(a.id);
            const bSelected = selectedVendorIds.includes(b.id);
            if (aSelected && !bSelected) return -1;
            if (!aSelected && bSelected) return 1;

            // 2. Normal Sorting
            switch (appliedSortBy) {
                case 'price_asc': return a.price - b.price;
                case 'price_desc': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                case 'distance': return a.distance - b.distance;
                default: return 0;
            }
        });

    // Get subcategories for selected category
    const availableSubCategories = categories[selectedCategory] || [];

    return (
        <div className="min-h-screen bg-brand-light-pink/30 pb-24">
            {/* Header with Search and Filters */}
            <header className="bg-white sticky top-0 z-40 px-5 py-4 shadow-sm rounded-b-[24px]">
                <div className="flex flex-col gap-2 mb-3">
                    <h1 className="text-xl font-serif font-bold text-slate-800">Find Vendors</h1>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-pink/20 focus:outline-none placeholder:text-slate-400 text-sm font-medium"
                        />
                    </div>
                    <button
                        onClick={toggleFilters}
                        className={`w-11 flex items-center justify-center rounded-xl transition-colors shadow-lg ${showFilters ? 'bg-brand-pink text-white' : 'bg-slate-900 text-white shadow-slate-900/20'}`}
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawers for Filters */}
                {showFilters && (
                    <div className="mt-2 p-3 bg-slate-50 rounded-2xl animate-in slide-in-from-top-2 border border-slate-100 shadow-xl relative z-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                            {/* Sort Option */}
                            <div className="relative">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Sort By</label>
                                <div
                                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                    className="w-full p-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus-within:ring-2 focus-within:ring-brand-pink/20 cursor-pointer flex justify-between items-center transition-colors hover:border-brand-pink/30"
                                >
                                    <span className="text-slate-700">{sortOptions.find(o => o.value === tempSortBy)?.label}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180 text-brand-pink' : ''}`} />
                                </div>

                                {isSortDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 origin-top">
                                            {sortOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() => {
                                                        setTempSortBy(option.value);
                                                        setIsSortDropdownOpen(false);
                                                    }}
                                                    className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors flex items-center justify-between ${tempSortBy === option.value
                                                        ? 'bg-brand-pink/5 text-brand-pink'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                        }`}
                                                >
                                                    {option.label}
                                                    {tempSortBy === option.value && <Check className="w-4 h-4" />}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Budget Range */}
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                                    Max Budget: ₹{(tempPriceRange[1] / 1000).toFixed(0)}k
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="5000"
                                    value={tempPriceRange[1]}
                                    onChange={(e) => setTempPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-brand-pink h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-bold">
                                    <span>₹0</span>
                                    <span>₹2L+</span>
                                </div>
                            </div>

                            {/* Date Availability */}
                            <div>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Event Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                                    <input
                                        type="date"
                                        value={tempSelectedDate}
                                        onChange={(e) => setTempSelectedDate(e.target.value)}
                                        className="w-full pl-9 p-1.5 rounded-xl bg-white border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-brand-pink/20 outline-none text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="flex justify-end pt-2 border-t border-slate-200">
                            <button
                                onClick={() => {
                                    setTempSortBy('rating');
                                    setTempPriceRange([0, 200000]);
                                    setTempSelectedDate('');
                                }}
                                className="px-3 py-1.5 text-slate-500 text-xs font-bold mr-3 hover:text-slate-800 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                onClick={applyFilters}
                                className="bg-brand-pink text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-brand-pink/20 hover:bg-brand-dark-pink transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
                {/* Sidebar Categories (Single-Select) & Subcategories (Multi-Select) */}
                <div className="w-full md:w-72 flex-shrink-0">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 sticky top-32">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-serif font-bold text-slate-800 text-base">Categories</h3>
                        </div>

                        <div className="mb-4 relative z-20">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block ml-1">
                                Select Category
                            </label>

                            {/* Custom Dropdown Trigger */}
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            >
                                <div className={`w-full bg-slate-50 border transition-all duration-300 text-slate-800 text-xs font-bold rounded-xl p-2.5 pr-8 flex items-center justify-between ${isCategoryDropdownOpen ? 'border-brand-pink bg-white ring-2 ring-brand-pink/10' : 'border-slate-200 hover:bg-slate-100 hover:border-slate-300'}`}>
                                    <span className="truncate">{selectedCategory}</span>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180 text-brand-pink' : ''}`} />
                                </div>
                            </div>

                            {/* Custom Dropdown Menu */}
                            {isCategoryDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsCategoryDropdownOpen(false)}></div>
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200 max-h-64 overflow-y-auto custom-scrollbar">
                                        {Object.keys(categories).map((category) => (
                                            (category !== 'Photo' || selectedCategory === 'Photo') && (
                                                <div
                                                    key={category}
                                                    onClick={() => {
                                                        handleCategoryChange(category);
                                                        setIsCategoryDropdownOpen(false);
                                                    }}
                                                    className={`px-4 py-3 text-sm font-bold cursor-pointer transition-colors flex items-center justify-between ${selectedCategory === category
                                                        ? 'bg-brand-pink/5 text-brand-pink'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                        }`}
                                                >
                                                    {category}
                                                    {selectedCategory === category && <Check className="w-4 h-4" />}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Subcategories (Multi-Select Chips) */}
                        {availableSubCategories.length > 0 && (
                            <div className="border-t border-slate-100 pt-4">
                                <h4 className="font-serif font-bold text-slate-800 text-xs mb-2.5">Filter by Type</h4>
                                <div className="flex flex-wrap gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar pr-1">
                                    <button
                                        onClick={() => setSelectedSubCategories([])}
                                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${selectedSubCategories.length === 0
                                            ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-900/20'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                            }`}
                                    >
                                        All Types
                                    </button>
                                    {availableSubCategories.map((sub, index) => (
                                        <button
                                            key={index}
                                            onClick={() => toggleSubCategory(sub)}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${selectedSubCategories.includes(sub)
                                                ? 'bg-slate-800 text-white border-slate-800 shadow-lg shadow-slate-900/20'
                                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                                }`}
                                        >
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Vendor Grid */}
                <div className="flex-1">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold text-slate-800">
                                {selectedSubCategories.length === 0
                                    ? `${selectedCategory} Vendors`
                                    : `${selectedCategory} (${selectedSubCategories.length} Filters)`}
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">
                                {filteredVendors.length} results found
                            </p>
                        </div>

                        {/* Selected Subcategories Tags (Top Display) */}
                        {(selectedSubCategories.length > 0 || selectedVendorIds.length > 0) && (
                            <div className="flex flex-wrap gap-2">
                                {selectedSubCategories.map(sub => (
                                    <div key={sub} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-white rounded-full text-xs font-bold shadow-sm animate-in fade-in zoom-in">
                                        <span>{sub}</span>
                                        <button
                                            onClick={() => toggleSubCategory(sub)}
                                            className="hover:bg-slate-600 rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {selectedVendorIds.length > 0 && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-pink text-white rounded-full text-xs font-bold shadow-sm">
                                        <span>{selectedVendorIds.length} Selected</span>
                                        <button
                                            onClick={() => setSelectedVendorIds([])}
                                            className="hover:bg-brand-dark-pink rounded-full p-0.5 transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {filteredVendors.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVendors.map(vendor => (
                                <div key={vendor.id} className="relative group">
                                    <VendorCard vendor={vendor} />
                                    {/* Selection Checkbox Overlay */}
                                    <button
                                        onClick={(e) => toggleVendorSelection(vendor.id, e)}
                                        className={`absolute top-4 right-14 z-20 w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-200 ${selectedVendorIds.includes(vendor.id)
                                            ? 'bg-brand-pink border-brand-pink text-white scale-110'
                                            : 'bg-white border-slate-200 text-slate-300 hover:border-brand-pink hover:text-brand-pink'
                                            }`}
                                        title={selectedVendorIds.includes(vendor.id) ? "Unselect" : "Select to pin to top"}
                                    >
                                        <Check className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-slate-800 font-bold text-lg mb-1">No Vendors Found</h3>
                            <button
                                onClick={() => {
                                    setAppliedPriceRange([0, 200000]);
                                    setAppliedSelectedDate('');
                                    setAppliedSortBy('rating');
                                    setSelectedCategory('Decoration');
                                    setSelectedSubCategories([]);
                                }}
                                className="mt-4 text-brand-pink text-sm font-bold hover:underline"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default VendorList;