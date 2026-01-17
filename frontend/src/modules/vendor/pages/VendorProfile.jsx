import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Camera,
    User,
    CreditCard,
    MapPin,
    Upload,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    PhoneCall,
    Globe,
    LogOut,
    HelpCircle,
    Settings,
    MessageSquare,
    Home,
    Calendar
} from 'lucide-react';
import { VENDOR_CATEGORIES } from '../../../utils/constants';

const VendorProfile = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState({
        profile: null,
    });

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

    const menuItems = [
        {
            icon: <Sparkles size={22} />,
            label: 'Brand Identity',
            onClick: () => alert('Edit Brand Identity mode coming soon!')
        },
        {
            icon: <MapPin size={22} />,
            label: 'Contact Point',
            onClick: () => alert('Edit Contact Point coming soon!')
        },
        {
            icon: <ShieldCheck size={22} />,
            label: 'Trust Verification',
            onClick: () => alert('Trust Verification status coming soon!')
        },
        { icon: <Settings size={22} />, label: 'Settings', onClick: () => alert('Vendor settings coming soon!') },
        { icon: <Globe size={22} />, label: 'Business Profile View', onClick: () => alert('Public profile view coming soon!') },
        { icon: <HelpCircle size={22} />, label: 'Help & Support', onClick: () => alert('Support ticket system coming soon!') },
    ];

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col relative overflow-x-hidden max-w-[440px] mx-auto shadow-2xl shadow-pink-100/50 border-x border-gray-50">
            {/* Wavy Header Background */}
            <div className="absolute top-0 left-0 right-0 h-[300px] z-0">
                <svg viewBox="0 0 500 200" preserveAspectRatio="none" className="w-full h-full">
                    <path
                        d="M0,0 L500,0 L500,150 Q350,200 250,150 T0,150 Z"
                        fill="#FF4D6D"
                    />
                </svg>
            </div>



            {/* Profile Center Section */}
            <div className="relative mt-8 flex flex-col items-center z-10 px-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-50 shadow-xl overflow-hidden flex items-center justify-center">
                        {images.profile ? (
                            <img src={images.profile} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-200">
                                <User size={50} />
                            </div>
                        )}
                    </div>
                    <label className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all text-[#FF4D6D] border border-pink-50">
                        <Camera size={16} className="text-[#FF4D6D]" />
                        <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} accept="image/*" />
                    </label>
                </div>

                <div className="text-center mt-5 mb-10">
                    <h2 className="text-3xl font-script text-[#FF4D6D] tracking-tight">Sri Balaji Entertainments</h2>
                    <button
                        onClick={() => alert('Full vendor profile editor coming soon!')}
                        className="text-[11px] font-bold text-gray-400 hover:text-[#FF4D6D] transition-colors mt-1 block w-full text-center"
                    >
                        View full profile
                    </button>
                </div>

                {/* Menu List */}
                <div className="w-full space-y-4 max-w-sm mb-32">
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.onClick}
                            className="w-full bg-[#FFF2F5] hover:bg-[#FFE5EB] py-4 px-6 rounded-2xl flex items-center gap-5 group transition-all active:scale-[0.98] border border-transparent hover:border-pink-100"
                        >
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-700 group-hover:text-[#FF4D6D] group-hover:scale-110 transition-all shadow-sm">
                                {item.icon}
                            </div>
                            <div className="flex-1 text-left">
                                <span className="text-[15px] font-bold text-gray-700 tracking-tight block">
                                    {item.label}
                                </span>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[#FF4D6D] group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-red-50 hover:bg-red-100 py-4 px-6 rounded-2xl flex items-center gap-5 group transition-all active:scale-[0.98] border border-red-50"
                    >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-all shadow-sm">
                            <LogOut size={22} className="rotate-180" />
                        </div>
                        <span className="text-[15px] font-bold text-red-500 tracking-tight">
                            Log out
                        </span>
                        <ChevronRight size={16} className="text-red-200 group-hover:translate-x-1 transition-all" />
                    </button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-[60] px-4 pb-6">
                <div className="bg-[#FFF2F5]/80 backdrop-blur-xl rounded-[2.5rem] px-8 py-4 flex items-center justify-between shadow-lg shadow-pink-100/50 border border-white/50">
                    <button onClick={() => navigate('/vendor/dashboard')} className="text-gray-400 hover:text-[#FF4D6D] transition-all transform hover:scale-110">
                        <Home size={22} />
                    </button>
                    <button className="text-gray-400 hover:text-[#FF4D6D] transition-all transform hover:scale-110">
                        <Calendar size={22} />
                    </button>
                    <button className="text-gray-400 hover:text-[#FF4D6D] transition-all transform hover:scale-110">
                        <MessageSquare size={22} />
                    </button>
                    <button className="text-[#FF4D6D] transition-all transform scale-110">
                        <User size={22} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorProfile;
