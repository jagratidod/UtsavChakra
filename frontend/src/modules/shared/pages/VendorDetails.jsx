import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_VENDORS } from '../../../utils/constants';
import {
    ArrowLeft,
    Star,
    MapPin,
    CheckCircle2,
    CreditCard,
    Calendar,
    ChevronRight,
    Wallet,
    Heart,
    Camera,
    Info,
    MessageCircle,
    MessageSquare,
    Plus,
    X,
    PhoneCall,
    Grid,
    MessageCircle as ChatIcon
} from 'lucide-react';

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vendor = MOCK_VENDORS.find(v => v.id === parseInt(id)) || MOCK_VENDORS[0];
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [activeTab, setActiveTab] = useState('packages'); // packages, gallery, about, reviews
    const [isLiked, setIsLiked] = useState(false);
    const [showAllGallery, setShowAllGallery] = useState(false);

    // Extended Mock Data for Demo
    const mockData = {
        about: "We are group of professional wedding decorators based in Hyderabad. With over 10 years of experience, we specialize in creating magical settings for your special day. From traditional floral arrangements to modern themed setups, we bring your vision to life with precision and style.",
        gallery: [
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format",
            "https://images.unsplash.com/photo-1544161515-4af6b1d4b1b2?auto=format",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format",
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format",
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format",
            "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format"
        ],
        albums: [
            { id: 1, title: 'Wedding Themes', count: 24, cover: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format' },
            { id: 2, title: 'Engagement Decor', count: 12, cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format' },
            { id: 3, title: 'Reception Setup', count: 18, cover: 'https://images.unsplash.com/photo-1544161515-4af6b1d4b1b2?auto=format' }
        ],
        reviews: [
            { id: 1, user: 'Rahul Mehta', rating: 5, comment: 'Absolutely stunning work! They transformed our backyard into a royal palace.', date: '2 days ago' },
            { id: 2, user: 'Sonal Singh', rating: 4, comment: 'Very professional and creative. Highly recommended.', date: '1 week ago' }
        ]
    };

    const handlePayment = () => {
        if (!selectedPackage) return alert("Please select a package first");
        console.log("Processing payment for:", selectedPackage);
        alert(`Redirecting to payment for ${selectedPackage.name} - ₹${selectedPackage.price}`);
        navigate('/user/dashboard');
    };

    const handleCustomQuote = () => {
        navigate('/user/messages', { state: { vendorId: id, vendorName: vendor.name } });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.1)] border-x border-gray-50 relative overflow-x-hidden">
            {/* Boutique Header - Liquid Style */}
            <div className="bg-[#2D328C] px-5 pt-12 pb-20 rounded-b-[2rem] relative overflow-hidden shrink-0 shadow-lg">
                {/* Liquid Background Decorations */}
                <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-pink-500/5 rounded-full blur-[80px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-400/5 rounded-full blur-[60px]"></div>

                <div className="relative z-10 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 active:scale-95 transition-all"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="flex-1 text-center px-4">
                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] block mb-0.5 italic">Boutique Profile</span>
                        <h1 className="text-[11px] font-black text-white tracking-[0.2em] uppercase truncate leading-none">{vendor.name}</h1>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-orange-400 border border-white/20">
                        <Star size={16} fill="currentColor" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide pb-48 -mt-12 relative z-10">
                {/* Hero / Banner Area */}
                <div className="px-5">
                    <div className="relative">
                        {/* Cover Image */}
                        <div className="h-48 bg-[#2D328C] rounded-[2rem] relative overflow-hidden shadow-xl border-2 border-white/5">
                            {vendor.coverImage ? (
                                <img
                                    src={vendor.coverImage}
                                    alt={vendor.name}
                                    className="w-full h-full object-cover transition-transform duration-1000"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/10">
                                    <Camera size={60} strokeWidth={1} />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D328C]/90 via-transparent to-transparent"></div>

                            {/* Wishlist Toggle */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsLiked(!isLiked);
                                }}
                                className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${isLiked ? 'bg-[#FF4D6D] text-white shadow-lg shadow-pink-200' : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
                                    }`}
                            >
                                <Heart
                                    size={18}
                                    className={isLiked ? 'fill-currentColor' : ''}
                                />
                            </button>

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg">
                                <span className="text-[8px] font-black text-white uppercase tracking-widest italic">{vendor.category}</span>
                            </div>

                            {/* Location Floating Badge */}
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 rounded-full shadow-lg border border-gray-100 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[8px] font-black text-[#2D328C] uppercase tracking-widest">{vendor.location}</span>
                            </div>
                        </div>

                        {/* Overlapping Profile Branding */}
                        <div className="absolute -bottom-8 left-6 flex items-end gap-3 z-20">
                            <div className="w-20 h-20 rounded-[1.8rem] p-1 bg-white shadow-xl relative translate-y-1">
                                <div className="w-full h-full rounded-[1.5rem] overflow-hidden border border-gray-50">
                                    <img
                                        src={vendor.profileImage || vendor.coverImage}
                                        alt={vendor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center text-white border-[3px] border-white shadow-md">
                                    <CheckCircle2 size={10} fill="currentColor" strokeWidth={3} className="text-white" />
                                </div>
                            </div>
                            <div className="pb-3 text-left">
                                <div className="flex gap-0.5 mb-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} className={i < 4 ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"} />
                                    ))}
                                </div>
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg border border-gray-100 inline-flex items-center gap-1.5 shadow-md">
                                    <span className="text-[10px] font-black text-[#2D328C] italic">{vendor.rating}</span>
                                    <div className="w-[1px] h-2.5 bg-gray-200"></div>
                                    <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest">Premium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendor Identity Details */}
                <div className="mt-12 px-8 mb-6 flex justify-between items-end">
                    <div className="flex-1">
                        <h2 className="text-2xl font-black text-[#2D328C] italic tracking-tighter leading-none mb-3 uppercase">
                            {vendor.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg border border-gray-100">
                                <MapPin size={9} className="text-orange-400" />
                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{vendor.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100">
                                <CheckCircle2 size={9} className="text-emerald-500" />
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="px-5 mb-8 sticky top-0 z-50">
                    <div className="flex gap-1.5 bg-white/70 backdrop-blur-md p-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100/50">
                        {['packages', 'gallery', 'about', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-3 rounded-full text-[8.5px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden ${activeTab === tab
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-[#2D328C]'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <div className="absolute inset-0 bg-[#2D328C] shadow-lg shadow-blue-200"></div>
                                )}
                                <span className="relative z-10">{tab}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Content Based on Tabs */}
                <div className="no-scrollbar">
                    {activeTab === 'gallery' && (
                        <div className="px-5 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
                            {/* Images Section */}
                            <div className="bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[10px] font-black text-[#2D328C] italic uppercase tracking-[0.25em] flex items-center gap-2">
                                        <Camera size={16} className="text-orange-400" /> Showcase
                                    </h3>
                                    {mockData.gallery.length > 4 && (
                                        <button
                                            onClick={() => setShowAllGallery(!showAllGallery)}
                                            className="text-[#2D328C] text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 hover:underline decoration-orange-400 decoration-2 underline-offset-4 transition-all active:scale-95"
                                        >
                                            {showAllGallery ? 'Show Less' : 'View All'} <ChevronRight size={12} className={`transition-transform duration-300 ${showAllGallery ? '-rotate-90' : ''}`} />
                                        </button>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-3 transition-all duration-700">
                                    {(showAllGallery ? mockData.gallery : mockData.gallery.slice(0, 4)).map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-gray-50 shadow-sm group relative active:scale-95 transition-all animate-in fade-in zoom-in duration-500">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <div className="absolute inset-x-2 bottom-2 py-1.5 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Plus size={12} className="text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Albums Section */}
                            <div className="bg-white rounded-[2rem] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-[10px] font-black text-[#2D328C] italic uppercase tracking-[0.25em] flex items-center gap-2">
                                        <Grid size={16} className="text-orange-400" /> Signature Albums
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    {mockData.albums.map((album) => (
                                        <div key={album.id} className="flex bg-gray-50/50 rounded-2xl p-3 border border-gray-50 items-center gap-4 group cursor-pointer hover:bg-white hover:border-[#2D328C]/10 hover:shadow-lg active:scale-[0.98] transition-all">
                                            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border-2 border-white shrink-0">
                                                <img src={album.cover} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-[11px] font-black text-[#2D328C] italic tracking-tight">{album.title}</h4>
                                                <p className="text-[8px] font-black text-gray-400 mt-1 uppercase tracking-widest">{album.count} ITEMS</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[#2D328C] shadow-sm group-hover:bg-[#2D328C] group-hover:text-white transition-colors">
                                                <ChevronRight size={14} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="px-5 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
                            <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D328C]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#2D328C] flex items-center justify-center text-white shadow-lg shadow-blue-50">
                                        <Info size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-[#2D328C] italic uppercase tracking-tight leading-none">The Story</h3>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">Elite Industry Standard</p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 font-bold leading-relaxed italic px-1">
                                    "{mockData.about}"
                                </p>

                                <div className="grid grid-cols-2 gap-6 mt-10 pt-8 border-t border-gray-50">
                                    <div className="space-y-1 pl-1">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Since</p>
                                        <p className="text-[12px] font-black text-[#2D328C] italic tracking-tight">Active 2014</p>
                                    </div>
                                    <div className="space-y-1 text-right pr-1">
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Portfolio</p>
                                        <p className="text-[12px] font-black text-emerald-600 italic tracking-tight uppercase">450+ Solid</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability Checker Section */}
                            <div className="bg-[#2D328C] rounded-[2rem] p-8 text-white shadow-xl shadow-blue-900/5 relative overflow-hidden group">
                                <div className="absolute top-[-40%] right-[-20%] w-64 h-64 bg-white/5 rounded-full blur-[60px]"></div>
                                <div className="flex items-center justify-between relative z-10">
                                    <div>
                                        <h3 className="text-white text-xl font-black italic tracking-tighter uppercase leading-none">Calendar</h3>
                                        <div className="flex items-center gap-2 text-orange-400 mt-3 animate-pulse">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                            <span className="text-[8px] font-black uppercase tracking-[0.2em]">Tracking Live</span>
                                        </div>
                                    </div>
                                    <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20 active:scale-90 transition-all shadow-lg">
                                        <Calendar size={22} />
                                    </button>
                                </div>
                                <div className="mt-8 bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-[9px] font-black text-white/30 leading-relaxed uppercase tracking-[0.1em]">Currently accepting priority bookings for the next festive season.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="px-5 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
                            {/* Rating Summary */}
                            <div className="bg-white rounded-[2rem] p-7 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-2 relative overflow-hidden">
                                <div className="absolute top-[-10%] left-[-10%] w-24 h-24 bg-orange-400/5 rounded-full blur-2xl"></div>
                                <div className="flex items-center justify-between mb-8 relative z-10">
                                    <div>
                                        <div className="text-[40px] font-black text-[#2D328C] italic leading-none tracking-tighter">{vendor.rating}</div>
                                        <div className="flex gap-1 mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} className={i < 4 ? "fill-orange-400 text-orange-400" : "fill-gray-100 text-gray-100"} />
                                            ))}
                                        </div>
                                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-3 italic">{vendor.reviews} EXPERIENCES</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[9px] font-black text-white italic uppercase tracking-[0.2em] bg-[#2D328C] px-4 py-2 rounded-xl shadow-lg">Elite Rank</div>
                                    </div>
                                </div>
                                <div className="space-y-3.5 px-1 relative z-10">
                                    {[5, 4, 3, 2, 1].map((rating) => (
                                        <div key={rating} className="flex items-center gap-4">
                                            <span className="text-[9px] font-black text-gray-400 w-3">{rating}</span>
                                            <div className="flex-1 h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-50">
                                                <div
                                                    className="h-full bg-gradient-to-r from-orange-400 to-orange-300 rounded-full"
                                                    style={{ width: `${rating === 5 ? '85%' : rating === 4 ? '12%' : '3%'}` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Reviews List */}
                            <div className="space-y-4">
                                {mockData.reviews.map((rev) => (
                                    <div key={rev.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm group active:scale-[0.98] transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-[#2D328C]/5 flex items-center justify-center text-[#2D328C] font-black text-xs border border-blue-50">
                                                    {rev.user.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="text-[12px] font-black text-[#2D328C] italic leading-none">{rev.user}</h4>
                                                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1 italic">{rev.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={9} className={i < rev.rating ? "fill-orange-400 text-orange-400" : "fill-gray-100 text-gray-100"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-gray-500 font-bold leading-relaxed italic px-0.5">"{rev.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'packages' && (
                        <div className="px-5 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
                            <div>
                                <div className="flex justify-between items-center mb-8 pl-1">
                                    <h3 className="text-[10px] font-black text-[#2D328C] italic uppercase tracking-[0.25em] flex items-center gap-2.5">
                                        <CreditCard size={16} className="text-orange-400" /> signature Bundles
                                    </h3>
                                    <button
                                        onClick={handleCustomQuote}
                                        className="text-[8px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 active:scale-95 transition-all"
                                    >
                                        <ChatIcon size={12} /> Help
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {vendor.packages.map((pkg) => (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPackage(pkg)}
                                            className={`p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${selectedPackage?.id === pkg.id
                                                ? 'border-[#2D328C] bg-white shadow-xl shadow-blue-900/5'
                                                : 'border-gray-50 bg-white hover:border-[#2D328C]/10 shadow-sm'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start relative z-10">
                                                <div className="flex-1">
                                                    <h4 className="font-black text-[#2D328C] italic text-base tracking-tight flex items-center gap-2 mb-1.5">
                                                        {pkg.name}
                                                        {selectedPackage?.id === pkg.id && (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                                        )}
                                                    </h4>
                                                    <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.1em] leading-none mb-1">Market Standard Rate</p>
                                                    {selectedPackage?.id === pkg.id && (
                                                        <div className="mt-4 flex flex-wrap gap-1.5 animate-in slide-in-from-left-2 duration-300">
                                                            {['Lighting', 'Setup', 'Sound'].map(feat => (
                                                                <span key={feat} className="text-[7px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 px-2 py-0.5 rounded border border-gray-100 italic">{feat}</span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-black text-[#2D328C] italic tracking-tighter leading-none">₹{pkg.price}</div>
                                                    <div className="text-[7px] font-black text-[#FF4D6D] uppercase tracking-[0.2em] mt-1.5 italic">Official</div>
                                                </div>
                                            </div>
                                            {selectedPackage?.id === pkg.id && (
                                                <div className="mt-6 pt-5 border-t border-blue-50 flex items-center justify-between text-[#2D328C] animate-in slide-in-from-bottom-2 duration-500">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
                                                        <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[7px] animate-pulse">READY</div>
                                                        Checkout Securely
                                                    </span>
                                                    <div className="w-9 h-9 rounded-xl bg-[#2D328C] flex items-center justify-center text-white shadow-xl shadow-blue-100 animate-boutique-bounce">
                                                        <ChevronRight size={18} />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Request Custom Quote Banner */}
                            <div
                                onClick={handleCustomQuote}
                                className="bg-[#2D328C] rounded-[2rem] p-10 text-center cursor-pointer group active:scale-[0.98] transition-all shadow-xl shadow-blue-900/5 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl mx-auto flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-all border border-white/10 shadow-xl relative z-10">
                                    <MessageSquare size={24} />
                                </div>
                                <h4 className="text-white text-2xl font-black italic tracking-tighter uppercase leading-none relative z-10">Custom Consultation</h4>
                                <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] mt-3 px-6 leading-relaxed relative z-10">Direct concierge for high-limit event curations.</p>
                                <div className="mt-8 flex items-center justify-center gap-3 text-orange-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10 italic">
                                    INITIATE CHAT <ArrowLeft size={16} className="rotate-180 animate-boutique-bounce" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Payment Bar - Floating Boutique Style */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-5 pb-6 z-[200]">
                <div className="bg-[#2D328C] rounded-2xl p-4 flex items-center justify-between gap-5 shadow-[0_20px_40px_rgba(45,50,140,0.3)] border border-white/10 backdrop-blur-md">
                    <div className="flex-1 pl-4">
                        <div className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] leading-none mb-1.5 italic">Total</div>
                        <div className="text-xl font-black text-white italic tracking-tighter leading-none">₹{selectedPackage ? selectedPackage.price : <span className="opacity-30">0.00</span>}</div>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={!selectedPackage}
                        className={`flex-[1.8] py-3.5 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5 active:scale-95 italic ${selectedPackage
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-white/5 text-white/10 pointer-events-none'
                            }`}
                    >
                        Secure Booking <Wallet size={16} className={selectedPackage ? 'animate-bounce' : ''} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorDetails;
