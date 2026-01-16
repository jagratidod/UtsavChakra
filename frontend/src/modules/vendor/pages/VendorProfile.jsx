import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import {
    ArrowLeft,
    Camera,
    User,
    CreditCard,
    MapPin,
    Upload,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    PhoneCall,
    Globe
} from 'lucide-react';
import { VENDOR_CATEGORIES } from '../../../utils/constants';

const VendorProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        businessCategory: '',
        businessName: 'Sri Balaji Entertainments',
        ownerName: 'Kotaiah',
        businessYears: '5',
        completedEvents: '10',
        phone: '+91 98765 43210',
        address: '123, Celebration Lane, Hyderabad, Telangana',
        instagramProfile: '',
        websiteLink: '',
        terms: ''
    });

    const [images, setImages] = useState({
        profile: null,
        cover: null,
        aadhar: null,
        pan: null
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => ({ ...prev, [type]: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log('Saving vendor profile:', { ...formData, ...images });
        navigate('/vendor/dashboard');
    };

    const DocumentUpload = ({ id, label, currentImage }) => (
        <div className="flex flex-col space-y-4">
            <label className="block text-gray-700 text-sm font-bold ml-1">
                {label} (Image)
            </label>
            <label className="relative group cursor-pointer w-full h-44 rounded-[2rem] border-2 border-dashed border-pink-100 bg-white hover:bg-pink-50/30 hover:border-[#FF4D6D] transition-all duration-300 flex flex-col items-center justify-center overflow-hidden shadow-sm hover:shadow-md">
                {currentImage ? (
                    <div className="w-full h-full relative">
                        <img src={currentImage} alt={label} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                            <Upload size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF4D6D] mb-3">
                            <Upload size={24} />
                        </div>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Select Image</span>
                    </div>
                )}
                <input type="file" className="hidden" onChange={(e) => handleImageChange(e, id)} accept="image/*" />
            </label>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col font-sans">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
                >
                    <ArrowLeft size={22} />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-gray-900 leading-none">Profile Editor</h1>
                    <span className="text-[10px] font-bold text-[#FF4D6D] uppercase tracking-[0.2em] mt-1">Utsav Chakra</span>
                </div>
                <div className="w-10"></div>
            </div>

            <div className="flex-1 overflow-y-auto pb-40">
                {/* Visual Identity Section */}
                <div className="relative mb-24">
                    {/* Cover Photo */}
                    <div className="h-56 w-full bg-gradient-to-br from-[#FFDEE9] to-[#B5FFFC] relative group">
                        {images.cover ? (
                            <img src={images.cover} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-30">
                                <Sparkles size={64} className="text-pink-400" />
                            </div>
                        )}
                        <label className="absolute bottom-4 right-6 bg-white shadow-xl px-4 py-2 rounded-2xl cursor-pointer hover:bg-[#FF4D6D] hover:text-white transition-all duration-300 flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                            <Camera size={16} /> Update Cover
                            <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'cover')} accept="image/*" />
                        </label>
                    </div>

                    {/* Profile Avatar */}
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative group">
                            <div className="w-36 h-36 rounded-[2.5rem] border-[6px] border-white bg-white shadow-2xl overflow-hidden flex items-center justify-center">
                                {images.profile ? (
                                    <img src={images.profile} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-200">
                                        <User size={64} />
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-2 -right-2 bg-gradient-to-br from-[#FF4D6D] to-[#FF8540] p-3 rounded-2xl cursor-pointer shadow-xl hover:scale-110 active:scale-95 transition-all border-4 border-white">
                                <Camera size={20} className="text-white" />
                                <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="px-6 space-y-10">
                    {/* Card: Basic Info */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#FF4D6D]"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF4D6D]">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Brand Identity</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Let your business shine</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Input
                                id="businessName"
                                label="Business Name"
                                placeholder="e.g. Dream Weddings"
                                className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                            />
                            <Input
                                id="ownerName"
                                label="Owner Name"
                                placeholder="Your Full Name"
                                className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                            />
                            <Select
                                id="businessCategory"
                                label="Specialization"
                                options={VENDOR_CATEGORIES}
                                className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    id="businessYears"
                                    label="Experience"
                                    placeholder="Years"
                                    className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                                />
                                <Input
                                    id="completedEvents"
                                    label="Events"
                                    placeholder="Total Done"
                                    className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card: Location */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-[#FF8540]"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF8540]">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Contact Point</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Where guests find you</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="w-full text-left">
                                <label className="block text-gray-700 text-sm font-bold mb-3 ml-4">
                                    Office/Venue Address
                                </label>
                                <textarea
                                    id="address"
                                    rows="3"
                                    className="w-full px-6 py-5 rounded-[2rem] border-transparent bg-gray-50/50 text-gray-700 font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/5 transition-all text-sm leading-relaxed"
                                    placeholder="Complete address with landmark..."
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <Input
                                    id="phone"
                                    label="Business Contact"
                                    placeholder="+91"
                                    className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                                />
                                <Input
                                    id="websiteLink"
                                    label="Official Website"
                                    placeholder="https://"
                                    className="!bg-gray-50/50 !border-transparent focus:!bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Card: Verification */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-gray-900">Trust Verification</h2>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Verify your authenticity</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DocumentUpload
                                id="aadhar"
                                label="Aadhar ID"
                                currentImage={images.aadhar}
                            />
                            <DocumentUpload
                                id="pan"
                                label="PAN Card"
                                currentImage={images.pan}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-white/60 backdrop-blur-2xl border-t border-gray-50 z-50">
                <button
                    onClick={handleSave}
                    className="w-full py-5 text-sm font-black text-white rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(255,77,109,0.4)] transform transition-all active:scale-[0.98] hover:shadow-[0_20px_50px_-10px_rgba(255,77,109,0.5)] hover:-translate-y-1 group relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #FF4D6D 0%, #FF8540 100%)',
                    }}
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]"></div>
                    <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em]">
                        Finalize Profile <CheckCircle2 size={20} />
                    </span>
                </button>
            </div>
        </div>
    );
};

export default VendorProfile;
