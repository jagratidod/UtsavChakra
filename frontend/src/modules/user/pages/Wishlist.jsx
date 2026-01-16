import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Heart,
    Trash2,
    Star,
    MapPin,
    Phone,
    ChevronRight,
    Search,
    Home,
    History,
    MessageCircle,
    User
} from 'lucide-react';
import { MOCK_VENDORS } from '../../../utils/constants';

const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        const likedVendors = MOCK_VENDORS.filter(v => savedWishlist.includes(v.id));
        setWishlist(likedVendors);
    }, []);

    const toggleWishlist = (vendorId) => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_wishlist') || '[]');
        let newWishlist;
        if (savedWishlist.includes(vendorId)) {
            newWishlist = savedWishlist.filter(id => id !== vendorId);
        } else {
            newWishlist = [...savedWishlist, vendorId];
        }
        localStorage.setItem('user_wishlist', JSON.stringify(newWishlist));

        // Update local state
        const likedVendors = MOCK_VENDORS.filter(v => newWishlist.includes(v.id));
        setWishlist(likedVendors);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 pt-12 pb-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 active:scale-95 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">Saved Items</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{wishlist.length} Vendors Liked</p>
                    </div>
                </div>
            </div>

            <div className="p-6 pb-32">
                {wishlist.length > 0 ? (
                    <div className="space-y-6">
                        {wishlist.map((vendor) => (
                            <div
                                key={vendor.id}
                                className="bg-white p-5 rounded-[2.8rem] border border-gray-50 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex gap-6 hover:shadow-2xl hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                onClick={() => navigate(`/vendor-details/${vendor.id}`)}
                            >
                                <div className="w-28 h-28 bg-gray-50 rounded-[2.2rem] overflow-hidden relative shrink-0 shadow-inner border border-gray-100/50">
                                    <div className="w-full h-full bg-gradient-to-br from-pink-50/50 to-orange-50/50 flex items-center justify-center text-pink-200">
                                        <Heart size={36} className="fill-[#FF4D6D] text-[#FF4D6D]" />
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
                                            className="p-2 -mr-2 text-[#FF4D6D] hover:scale-110 transition-transform"
                                        >
                                            <Trash2 size={18} />
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3.5rem] border border-gray-50 shadow-inner">
                        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-200 mb-8 relative">
                            <Heart size={48} />
                            <div className="absolute top-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center border-4 border-pink-50">
                                <Search size={12} className="text-pink-300" />
                            </div>
                        </div>
                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Your collection is empty</h4>
                        <p className="text-xs font-bold text-gray-300 mt-2 text-center max-w-[200px]">Save your favorite vendors to see them here.</p>
                        <button
                            onClick={() => navigate('/user/dashboard')}
                            className="mt-10 px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-gray-200 active:scale-95 transition-all"
                        >
                            Explore Vendors
                        </button>
                    </div>
                )}
            </div>

            {/* Premium Floated Bottom Nav */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-50">
                <div className="bg-white/90 backdrop-blur-2xl border border-white/50 rounded-[2.8rem] p-3 shadow-[0_25px_60px_rgba(255,77,109,0.15)] flex justify-between items-center px-4 relative">
                    <button onClick={() => navigate('/user/dashboard')} className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group">
                        <Home size={22} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Home</span>
                    </button>
                    <button className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group">
                        <History size={22} />
                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Record</span>
                    </button>
                    <button className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-[#FF4D6D] relative group">
                        <div className="absolute top-[-12px] w-1 h-1 bg-[#FF4D6D] rounded-full"></div>
                        <Heart size={22} strokeWidth={3} fill="currentColor" />
                        <span className="text-[8px] font-black uppercase tracking-tighter">Saved</span>
                    </button>
                    <button className="w-14 h-14 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-[#FF4D6D] transition-all group">
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
        </div>
    );
};

export default Wishlist;
