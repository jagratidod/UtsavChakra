import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Image as ImageIcon,
    Upload,
    Maximize2,
    X,
    Sparkles,
    Heart
} from 'lucide-react';

const VendorPortfolio = () => {
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

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage = {
                    id: Date.now(),
                    url: reader.result,
                    title: 'New Memory',
                    likes: 0
                };
                setImages([newImage, ...images]);
            };
            reader.readAsDataURL(file);
        }
    };

    const deleteImage = (id) => {
        setImages(images.filter(img => img.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans pb-20 max-w-[440px] mx-auto shadow-2xl shadow-gray-200/50 border-x border-gray-50 relative">
            {/* Premium Sticky Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[60]">
                <div className="bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-6 py-5 flex items-center justify-between shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center gap-4">

                        <div>
                            <h1 className="text-2xl font-script text-[#FF4D6D] tracking-tight leading-none">Photo Gallery</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.1em]">Public Portfolio</span>
                            </div>
                        </div>
                    </div>

                    <label className="h-10 px-4 bg-[#FF4D6D] text-white rounded-full flex items-center justify-center gap-2 shadow-lg shadow-pink-200 cursor-pointer hover:shadow-pink-300 hover:-translate-y-0.5 active:scale-95 transition-all">
                        <Plus size={18} strokeWidth={3} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Add New</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>
                </div>
            </div>

            <div className="pt-24 px-4 pb-20">

                {/* Refined Image Grid - Matching Uploaded UI */}
                <div className="grid grid-cols-2 gap-1 px-1">
                    {/* Add Placeholder Card */}
                    <label className="relative aspect-square border-2 border-dashed border-gray-100 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer group hover:bg-pink-50/30 hover:border-[#FF4D6D]/20 transition-all duration-500">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 group-hover:text-[#FF4D6D] group-hover:scale-110 transition-all shadow-sm">
                            <Plus size={24} strokeWidth={2} />
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] group-hover:text-[#FF4D6D]">Add Photo</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>

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

                            {/* Like Counter Overlay - Precisely Matching Image */}
                            <div className="absolute bottom-0 right-0 left-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent opacity-100 transition-opacity flex items-end justify-end p-3">
                                <div className="flex items-center gap-1.5">
                                    <Heart size={18} className="text-white fill-none group-hover:fill-white transition-all duration-300 cursor-pointer" />
                                    <span className="text-xs font-black text-white drop-shadow-md">{img.likes}</span>
                                </div>
                            </div>

                            {/* Actions Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                                <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <button
                                        onClick={() => setPreviewImage(img.url)}
                                        className="w-10 h-10 bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
                                    >
                                        <Maximize2 size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteImage(img.id);
                                        }}
                                        className="w-10 h-10 bg-red-500/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-red-500 transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Full-Screen Preview */}
            {previewImage && (
                <div
                    className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setPreviewImage(null)}
                >
                    <button className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <X size={24} />
                    </button>
                    <img
                        src={previewImage}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transform animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* Mobile Bottom Bar for Actions */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-xs">
                <div className="bg-gray-900/90 backdrop-blur-xl rounded-full py-4 px-6 shadow-2xl flex items-center justify-between text-white border border-white/10">
                    <div className="flex items-center gap-2">
                        <ImageIcon size={14} className="text-pink-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{images.length} Photos</span>
                    </div>
                    <div className="h-4 w-px bg-white/20"></div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-[10px] font-bold uppercase tracking-widest hover:text-pink-400 transition-colors"
                    >
                        Top
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorPortfolio;
