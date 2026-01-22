import React from 'react';
import { Star, MapPin, IndianRupee, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
    const navigate = useNavigate();
    const { id, name, category, subCategory, rating, reviewCount, location, price, image, verified } = vendor;

    return (
        <div 
            onClick={() => navigate(`/user/vendor/${id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-100"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={image} 
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-pink-50 transition-colors">
                    <Heart className="w-4 h-4 text-brand-pink" />
                </div>
                {verified && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Verified
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-brand-pink transition-colors">{name}</h3>
                        <p className="text-xs text-brand-pink font-bold uppercase tracking-wider">{category} • {subCategory}</p>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-bold text-sm text-slate-700">{rating}</span>
                        <span className="text-xs text-slate-400 ml-1">({reviewCount})</span>
                    </div>
                </div>

                <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium">Starting from</span>
                        <div className="flex items-center text-slate-800 font-bold">
                            <IndianRupee className="w-4 h-4" />
                            <span>{price.toLocaleString()}</span>
                        </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold hover:bg-brand-pink hover:text-white transition-all">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorCard;
