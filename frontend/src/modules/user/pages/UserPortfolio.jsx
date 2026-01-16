import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ImageIcon,
    Maximize2,
    Heart,
    X,
    Sparkles
} from 'lucide-react';

const UserPortfolio = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([
        { id: 1, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', title: 'Grand Celebration', likes: 7 },
        { id: 2, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', title: 'Elegant Floral Decor', likes: 4 },
        { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', title: 'Royal Reception', likes: 24 },
        { id: 4, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', title: 'Evening Ambiance', likes: 35 },
        { id: 5, url: 'https://images.unsplash.com/photo-1519225495045-3b3d97c50dfb?w=800&q=80', title: 'Traditional Setup', likes: 12 },
        { id: 6, url: 'https://images.unsplash.com/photo-1465495910483-04504d576b5d?w=800&q=80', title: 'Modern Vibe', likes: 18 },
    ]);
    const [previewImage, setPreviewImage] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('user_photo_wishlist') || '[]');
        setWishlist(savedWishlist);
    }, []);

    const toggleWishlist = (id) => {
        let newWishlist;
        if (wishlist.includes(id)) {
            newWishlist = wishlist.filter(item => item !== id);
        } else {
            newWishlist = [...wishlist, id];
        }
        setWishlist(newWishlist);
        localStorage.setItem('user_photo_wishlist', JSON.stringify(newWishlist));
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans pb-20">
            {/* Premium Sticky Header */}
            <div className="fixed top-0 left-0 right-0 z-[60]">
                <div className="bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-6 py-5 flex items-center justify-between shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-[#FF4D6D] hover:text-white transition-all transform hover:-translate-x-1 active:scale-90"
                        >
                            <ArrowLeft size={18} strokeWidth={2.5} />
                        </button>
                        <div>
                            <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">Photo Gallery</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.1em]">Explore Memories</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-24 px-4">
                {/* Refined Image Grid */}
                <div className="grid grid-cols-2 gap-1 px-1">
                    {images.map((img) => (
                        <div
                            key={img.id}
                            className="relative aspect-square overflow-hidden group shadow-sm bg-gray-100"
                        >
                            <img
                                src={img.url}
                                alt={img.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Like Counter Overlay */}
                            <div className="absolute bottom-0 right-0 left-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent opacity-100 flex items-end justify-end p-3">
                                <div
                                    className="flex items-center gap-1.5 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWishlist(img.id);
                                    }}
                                >
                                    <Heart
                                        size={18}
                                        className={`transition-all duration-300 ${wishlist.includes(img.id) ? 'text-[#FF4D6D] fill-[#FF4D6D]' : 'text-white fill-none hover:fill-white'}`}
                                    />
                                    <span className="text-xs font-black text-white drop-shadow-md">{img.likes + (wishlist.includes(img.id) ? 1 : 0)}</span>
                                </div>
                            </div>

                            {/* Preview Action on Hover */}
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <button
                                    onClick={() => setPreviewImage(img.url)}
                                    className="w-12 h-12 bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all rounded-full"
                                >
                                    <Maximize2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Full-Screen Preview */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setPreviewImage(null)}
                >
                    <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <X size={24} />
                    </button>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-full max-h-[80vh] object-contain shadow-2xl transform animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};

export default UserPortfolio;
