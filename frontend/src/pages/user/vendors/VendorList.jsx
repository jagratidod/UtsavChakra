import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VendorCard from '../../../components/cards/VendorCard';

const VendorList = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('Decoration');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            "Engagement",
            "Haldi / Mehndi",
            "Sangeet",
            "Batchelor party",
            "Bride-to-be Ceremony (Pellikuthuru)",
            "Groom-to-be Ceremony (Pellikoduku)",
            "Mandap",
            "Reception",
            "After Party / Family get together",
            "Cradle ceremony",
            "Saree/ Dothi ceremony",
            "House warming",
            "Birthday's",
            "Grand Welcome",
            "Retirement",
            "Others"
        ],
        "Photography & Videography": [
            "Candid",
            "Cinematic",
            "Regular Photo",
            "Regular Video",
            "Album",
            "Drone pilots",
            "Pre wedding",
            "Post wedding",
            "Teaser",
            "Digital Invitation"
        ],
        "Makeup Artist": [
            "Bride / Groom"
        ],
        "Catering": [
            "Veg / Non Veg",
            "Live food stalls"
        ]
    };

    // Dummy Data
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
            image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 5,
            name: "Vintage Vibes",
            category: "Decoration",
            subCategory: "Reception",
            rating: 4.7,
            reviewCount: 95,
            location: "Colaba, Mumbai",
            price: 60000,
            image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 6,
            name: "Floral Fantasy",
            category: "Decoration",
            subCategory: "Mandap",
            rating: 4.4,
            reviewCount: 76,
            location: "Powai, Mumbai",
            price: 45000,
            image: "https://images.unsplash.com/photo-1507504031981-523e3c6ef12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false
        },
        // Photography & Videography Vendors
        {
            id: 7,
            name: "Creative Shots",
            category: "Photography & Videography",
            subCategory: "Candid",
            rating: 4.8,
            reviewCount: 156,
            location: "Versova, Mumbai",
            price: 40000,
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc364687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 8,
            name: "Cinematic Dreams",
            category: "Photography & Videography",
            subCategory: "Cinematic",
            rating: 4.9,
            reviewCount: 203,
            location: "Bandra, Mumbai",
            price: 60000,
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 9,
            name: "Drone Vision",
            category: "Photography & Videography",
            subCategory: "Drone pilots",
            rating: 4.6,
            reviewCount: 112,
            location: "Navi Mumbai",
            price: 25000,
            image: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false
        },
        // Makeup Artist Vendors
        {
            id: 10,
            name: "Glam Studio",
            category: "Makeup Artist",
            subCategory: "Bride / Groom",
            rating: 4.7,
            reviewCount: 189,
            location: "Khar, Mumbai",
            price: 35000,
            image: "https://images.unsplash.com/photo-1571781948742-0ec7b5518a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 11,
            name: "Bridal Glow",
            category: "Makeup Artist",
            subCategory: "Bride / Groom",
            rating: 4.8,
            reviewCount: 234,
            location: "Andheri, Mumbai",
            price: 45000,
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        // Catering Vendors
        {
            id: 12,
            name: "Taste of India",
            category: "Catering",
            subCategory: "Veg / Non Veg",
            rating: 4.6,
            reviewCount: 167,
            location: "Dadar, Mumbai",
            price: 80000,
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 13,
            name: "Street Food Delights",
            category: "Catering",
            subCategory: "Live food stalls",
            rating: 4.5,
            reviewCount: 123,
            location: "Juhu, Mumbai",
            price: 50000,
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false
        }
    ];

    // Slideshow effect: change image every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [images.length]);

    const filteredVendors = vendors.filter(vendor => 
        vendor.category === selectedCategory && 
        (selectedSubCategory === 'All' || vendor.subCategory === selectedSubCategory)
    );

    return (
        <div className="min-h-screen bg-brand-light-pink/30 pb-24">
            {/* Header */}
            <header className="bg-white sticky top-0 z-40 px-6 pt-12 pb-6 shadow-sm rounded-b-[32px]">
                <div className="flex flex-col gap-4 mb-6">
                    {/* Back button and title */}
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-brand-pink hover:text-white transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-serif font-bold text-slate-800">Find Vendors</h1>
                    </div>
                    
                    {/* Large Image Slideshow */}
                    <div className="w-full">
                        <div 
                            className="w-full h-48 md:h-64 rounded-xl bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
                            style={{ 
                                backgroundImage: `url('${images[currentImageIndex]}')`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundColor: 'white',
                                borderRadius: '16px'
                            }}
                        ></div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search vendors..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-pink/20 focus:outline-none placeholder:text-slate-400 text-sm font-medium"
                        />
                    </div>
                    <button className="w-12 flex items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
                {/* Sidebar / Horizontal Scroll for Categories */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white p-5 rounded-2xl shadow-sm sticky top-48">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 bg-brand-pink rounded-full"></span>
                            Categories
                        </h3>
                        
                        {/* Main Categories */}
                        <div className="space-y-2 mb-4">
                            {Object.keys(categories).map((category) => (
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
                            ))}
                        </div>

                        {/* Subcategories */}
                        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <button
                                onClick={() => setSelectedSubCategory('All')}
                                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedSubCategory === 'All' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                            >
                                All
                            </button>
                            {categories[selectedCategory].map((sub, index) => (
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
                        <h2 className="text-lg font-bold text-slate-800">
                            {selectedSubCategory === 'All' ? `${selectedCategory} Vendors` : `${selectedSubCategory} Vendors`}
                        </h2>
                        <span className="text-sm text-slate-400 font-medium">{filteredVendors.length} results</span>
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
                            <p className="text-slate-400 text-sm">Try selecting a different category</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorList;