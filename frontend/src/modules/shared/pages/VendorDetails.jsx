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
    Wallet
} from 'lucide-react';

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const vendor = MOCK_VENDORS.find(v => v.id === parseInt(id)) || MOCK_VENDORS[0];
    const [selectedPackage, setSelectedPackage] = useState(null);

    const handlePayment = () => {
        if (!selectedPackage) return alert("Please select a package first");
        // Simulated payment flow
        console.log("Processing payment for:", selectedPackage);
        alert(`Redirecting to payment for ${selectedPackage.name} - ₹${selectedPackage.price}`);
        // After "success", redirect to orders or dashboard
        navigate('/user/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Header */}
            <div className="bg-white px-6 py-5 border-b border-gray-100 sticky top-0 z-50 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800"><ArrowLeft size={24} /></button>
                <h1 className="text-xl font-black text-gray-900 truncate">{vendor.name}</h1>
            </div>

            <div className="flex-1 overflow-y-auto pb-40">
                {/* Hero / Banner Area */}
                <div className="relative">
                    {/* Cover Image */}
                    <div className="h-64 bg-gradient-to-br from-pink-100/50 to-orange-100/50 relative overflow-hidden">
                        {vendor.coverImage ? (
                            <img
                                src={vendor.coverImage}
                                alt={vendor.name}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#FF4D6D]/20">
                                <Calendar size={80} strokeWidth={1} />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>

                    {/* Overlapping Profile Image */}
                    <div className="absolute -bottom-12 left-8 group">
                        <div className="w-32 h-32 rounded-3xl p-1.5 bg-white shadow-2xl shadow-pink-200/50 transform transition-transform group-hover:scale-105 active:scale-95">
                            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-pink-50">
                                {vendor.profileImage ? (
                                    <img
                                        src={vendor.profileImage}
                                        alt={vendor.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-pink-100 flex items-center justify-center text-[#FF4D6D]">
                                        <CheckCircle2 size={32} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vendor Identity Details */}
                <div className="pt-16 pb-8 px-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-[#FF4D6D]/10 text-[#FF4D6D] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border border-[#FF4D6D]/20">
                                {vendor.category}
                            </span>
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-emerald-100">
                                <CheckCircle2 size={10} /> Verified
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mt-2">{vendor.name}</h2>

                        <div className="flex flex-wrap items-center gap-6 mt-3">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < Math.floor(vendor.rating) ? "fill-orange-400 text-orange-400" : "text-gray-200"} />
                                    ))}
                                </div>
                                <span className="text-sm font-black text-gray-700">{vendor.rating}</span>
                                <span className="text-xs font-bold text-gray-400">({vendor.reviews || 0} reviews)</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                                <MapPin size={16} className="text-[#FF4D6D]" />
                                <span className="text-sm font-bold tracking-tight">{vendor.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages Section */}
                <div className="p-6 space-y-8">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                            <CreditCard size={20} className="text-[#FF4D6D]" /> Service Packages
                        </h3>
                        <div className="space-y-4">
                            {vendor.packages.map((pkg) => (
                                <div
                                    key={pkg.id}
                                    onClick={() => setSelectedPackage(pkg)}
                                    className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${selectedPackage?.id === pkg.id
                                        ? 'border-[#FF4D6D] bg-pink-50/50 shadow-lg'
                                        : 'border-white bg-white hover:border-gray-100'
                                        }`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-black text-gray-900 text-lg">{pkg.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1 font-medium">Professional service with full support</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-[#FF4D6D]">₹{pkg.price}</div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Starting Price</div>
                                        </div>
                                    </div>
                                    {selectedPackage?.id === pkg.id && (
                                        <div className="mt-4 pt-4 border-t border-pink-100 flex items-center justify-between text-[#FF4D6D]">
                                            <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
                                                <CheckCircle2 size={14} /> Package Selected
                                            </span>
                                            <ChevronRight size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Basic Info / Terms */}
                    <div className="bg-white rounded-[2rem] p-6 text-gray-500 text-xs font-medium leading-relaxed">
                        <strong className="text-gray-900 block mb-2 uppercase tracking-widest text-[10px]">Note to User:</strong>
                        Payments are processed securely via Utsav Chakra. Contact vendor directly via chat for custom requirements before making full payment.
                    </div>
                </div>
            </div>

            {/* Bottom Payment Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50">
                <div className="max-w-md mx-auto flex items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Payable</div>
                        <div className="text-2xl font-black text-gray-900">₹{selectedPackage ? selectedPackage.price : '0'}</div>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={!selectedPackage}
                        className={`flex-1 py-5 rounded-[2rem] font-black text-white text-sm uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 ${selectedPackage ? 'bg-[#FF4D6D] hover:scale-105 shadow-pink-200' : 'bg-gray-300 pointer-events-none'
                            }`}
                    >
                        Proceed to Pay <Wallet size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorDetails;
