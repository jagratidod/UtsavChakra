import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../../../components/ui/LanguageSelector';
import {
    Bell,
    Home,
    MessageCircle,
    Calendar,
    User,
    Users,
    PlusSquare,
    Camera,
    Newspaper,
    MessageSquare,
    BookOpen,
    MapPin,
    Folder,
    FileText,
    UserPlus,
    Search,
    Sparkles
} from 'lucide-react';

const ServiceIcon = ({ icon: Icon, label }) => (
    <div className="flex flex-col items-center justify-center space-y-2 group cursor-pointer">
        <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF4D6D] shadow-sm border border-pink-100 group-hover:scale-110 group-hover:bg-[#FF4D6D] group-hover:text-white transition-all duration-300">
            <Icon size={24} />
        </div>
        <span className="text-[10px] font-bold text-gray-700 text-center uppercase tracking-tight leading-tight px-1">
            {label}
        </span>
    </div>
);

const StatCard = ({ label, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-50 flex flex-col space-y-3 flex-1 min-w-[140px]">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon size={20} />
        </div>
        <div>
            <div className="text-2xl font-black text-gray-900 leading-none">{value}</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase mt-2 tracking-wider">{label}</div>
        </div>
        {trend && (
            <div className="text-[9px] font-bold text-emerald-500 bg-emerald-50 self-start px-2 py-0.5 rounded-lg">
                +{trend}% this week
            </div>
        )}
    </div>
);

const VendorDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col font-sans pb-32">
            {/* Simple Clean Header / Navbar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-6 sticky top-0 z-50">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles size={14} className="text-[#FF4D6D]" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FF4D6D]">Pro Vendor</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Hi ! Kotaiah</h2>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Sri Balaji Events</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSelector />
                        <div className="relative">
                            <button
                                onClick={() => navigate('/vendor/notifications')}
                                className="w-11 h-11 bg-gray-50 rounded-2xl relative flex items-center justify-center text-gray-400 border border-gray-100 cursor-pointer hover:bg-pink-50 hover:text-[#FF4D6D] transition-all active:scale-90"
                            >
                                <Bell size={20} />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF4D6D] rounded-full border-2 border-white"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 pt-10 space-y-10 z-10">
                {/* Floating Image Action Icons - with Naming */}
                <div className="grid grid-cols-2 gap-8 px-4">
                    <div
                        onClick={() => navigate('/vendor/portfolio')}
                        className="flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-full aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                            <img
                                src="/src/assets/vendor icons/photos.png"
                                alt="Portfolio"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-2">Photo Sharing</span>
                    </div>

                    <div
                        onClick={() => navigate('/vendor/schedule')}
                        className="flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-full aspect-square flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                            <img
                                src="/src/assets/vendor icons/calender-removebg-preview.png"
                                alt="Schedule"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest mt-2">Schedules</span>
                    </div>
                </div>

                {/* Quick Shortcuts Grid */}
                <div>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Services</h3>
                        <button className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest hover:underline">View All</button>
                    </div>
                    <div className="grid grid-cols-4 gap-y-10">
                        <ServiceIcon icon={Users} label="Leads" />
                        <ServiceIcon icon={Search} label="Search" />
                        <ServiceIcon icon={PlusSquare} label="Packages" />
                        <ServiceIcon icon={Newspaper} label="News" />
                        <ServiceIcon icon={MessageSquare} label="Quote" />
                        <div onClick={() => navigate('/vendor/messages')} className="contents">
                            <ServiceIcon icon={BookOpen} label="Guide" />
                        </div>
                        <ServiceIcon icon={Calendar} label="Events" />
                        <ServiceIcon icon={MapPin} label="Venues" />
                        <ServiceIcon icon={Folder} label="My Folder" />
                        <ServiceIcon icon={FileText} label="Quoted" />
                        <ServiceIcon icon={UserPlus} label="Team" />
                        <ServiceIcon icon={Sparkles} label="Premium" />
                    </div>
                </div>

            </div>

            {/* Bottom Navigation (Floating) */}
            <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 z-50">
                <div className="bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-8 py-4 flex justify-between items-center">
                    <button className="flex flex-col items-center space-y-1 text-[#FF4D6D] transition-all">
                        <div className="bg-pink-50 p-3 rounded-2xl shadow-sm border border-pink-100">
                            <Home size={22} strokeWidth={3} />
                        </div>
                    </button>
                    <button className="flex flex-col items-center p-3 text-gray-300 hover:text-[#FF4D6D] transition-colors">
                        <MessageCircle size={24} />
                    </button>
                    <button
                        onClick={() => navigate('/vendor/schedule')}
                        className="flex flex-col items-center p-3 text-gray-300 hover:text-[#FF4D6D] transition-colors"
                    >
                        <Calendar size={24} />
                    </button>
                    <button
                        onClick={() => navigate('/vendor/profile')}
                        className="flex flex-col items-center p-3 text-gray-300 hover:text-[#FF4D6D] transition-colors"
                    >
                        <User size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
