import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, ClipboardList, Heart, MessageCircle, Home } from 'lucide-react';

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'planner', label: 'Planner', icon: FileText, path: '/user/planner' },
        { id: 'bookings', label: 'My Bookings', icon: ClipboardList, path: '/user/schedule' },
        { id: 'discovery', label: '', icon: Home, path: '/user/dashboard', center: true },
        { id: 'wishlist', label: 'Favorites', icon: Heart, path: '/user/wishlist' },
        { id: 'chats', label: 'Messages', icon: MessageCircle, path: '/user/messages' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 max-w-[440px] mx-auto">
            <div className="bg-[#2D328C] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex justify-between items-center px-6 py-3 relative border border-white/10">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    if (item.center) {
                        return (
                            <div key={item.id} className="relative -mt-16">
                                <button
                                    onClick={() => navigate(item.path)}
                                    className="w-16 h-16 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full border-4 border-[#2D328C] shadow-2xl flex items-center justify-center text-[#2D328C] active:scale-90 transition-transform animate-boutique-bounce"
                                >
                                    <Icon size={28} strokeWidth={3} />
                                </button>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 animate-tilt ${active ? 'text-white scale-110' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            <Icon
                                size={22}
                                strokeWidth={active ? 3 : 2}
                            />
                            <span className={`text-[8px] font-bold tracking-tight uppercase transition-all duration-300 ${active ? 'opacity-100' : 'opacity-70'}`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;
