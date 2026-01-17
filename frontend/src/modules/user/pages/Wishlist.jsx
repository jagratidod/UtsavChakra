import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Heart,
    Star,
    MapPin,
    Phone,
    MessageCircle,
    Search,
    Sparkles,
    Trash2,
} from 'lucide-react';
import { MOCK_VENDORS } from '../../../utils/constants';
import MobileNav from '../components/MobileNav';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        setWishlistIds(savedWishlist);
        const likedVendors = MOCK_VENDORS.filter(v => savedWishlist.includes(v.id));
        setWishlist(likedVendors);
    }, []);

    const toggleWishlist = (e, vendorId) => {
        e.stopPropagation();
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        let newWishlist;
        if (savedWishlist.includes(vendorId)) {
            newWishlist = savedWishlist.filter(id => id !== vendorId);
        } else {
            newWishlist = [...savedWishlist, vendorId];
        }
        localStorage.setItem('user_wishlist', JSON.stringify(newWishlist));
        setWishlistIds(newWishlist);

        // Update local state for display
        const likedVendors = MOCK_VENDORS.filter(v => newWishlist.includes(v.id));
        setWishlist(likedVendors);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative font-sans overflow-x-hidden">
            {/* Header - Boutique Liquid Style */}
            <div className="bg-[#2D328C] px-5 pt-12 pb-24 rounded-b-[2.5rem] relative overflow-hidden shadow-2xl shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-orange-400 border border-white/10 shadow-lg">
                            <Heart size={20} fill="currentColor" />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 block italic">My Collection</span>
                            <h1 className="text-sm font-black text-white uppercase tracking-widest italic leading-none">Your Wishlist</h1>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <div className="text-white text-[10px] font-black italic">{wishlist.length}</div>
                    </div>
                </div>
            </div>

            <div className="px-5 -mt-10 pt-4 space-y-8 z-10 relative">
                {wishlist.length > 0 ? (
                    <div className="space-y-8 pb-10">
                        {wishlist.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 border border-gray-50 flex flex-col group cursor-pointer active:scale-98 transition-all duration-300"
                                onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                            >
                                <div className="h-44 relative overflow-hidden shrink-0">
                                    <img
                                        src={`https://images.unsplash.com/photo-${vendor.id % 2 === 0 ? '1519167758481-83f550bb49b3' : '1511795409834-ef04bbd61622'}?w=800&q=80`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        alt={vendor.name}
                                    />
                                    {/* Glass Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                        <span className="text-white text-[8px] font-black uppercase tracking-widest italic">{vendor.category}</span>
                                    </div>

                                    {/* Profile Branding Overlay */}
                                    <div className="absolute left-4 bottom-4 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl border-2 border-white shadow-xl overflow-hidden bg-white">
                                            <img src={`https://i.pravatar.cc/100?u=${vendor.id}`} className="w-full h-full object-cover" alt="" />
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
                                        className="absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-all bg-[#FF4D6D] text-white shadow-lg shadow-pink-200"
                                    >
                                        <Heart size={14} fill="currentColor" />
                                    </button>
                                </div>

                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1 italic">Starting from</span>
                                            <span className="text-[13px] font-black text-[#1E226A] italic">₹{vendor.packages?.[0]?.price?.toLocaleString() || '15,000'}+</span>
                                        </div>
                                        <div className="w-[1px] h-6 bg-gray-100"></div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[7px] text-gray-400 font-bold uppercase tracking-widest italic">{vendor.reviews || '220'} reviews</span>
                                            <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-50 rounded-lg mt-0.5 border border-orange-100/50">
                                                <Star size={10} className="fill-orange-400 text-orange-400" />
                                                <span className="text-[10px] font-black text-orange-700">{vendor.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="bg-gradient-to-r from-[#2D328C] to-[#4F46E5] text-white px-5 rounded-2xl font-black text-[9px] shadow-lg shadow-blue-100 active:scale-95 transition-all uppercase tracking-widest italic leading-none h-11 border border-white/20">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner px-10 text-center">
                        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center text-gray-200 mb-6 border border-gray-100">
                            <Heart size={24} />
                        </div>
                        <h4 className="text-xs font-black text-[#1E226A] uppercase tracking-widest mb-2 italic">Nothing saved yet</h4>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tighter leading-relaxed">Save your favorite vendors to see them here.<br />Start exploring our premium directory.</p>
                        <button
                            onClick={() => navigate('/user/dashboard')}
                            className="mt-6 px-10 py-3 bg-[#2D328C] text-white rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg shadow-blue-100 italic"
                        >
                            Start Exploring
                        </button>
                    </div>
                )}
            </div>

            <MobileNav />
        </div>
    );
};

export default Wishlist;
