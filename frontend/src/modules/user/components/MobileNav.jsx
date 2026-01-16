import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, History, Heart, MessageCircle, User } from 'lucide-react';

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/user/dashboard' },
        { id: 'history', label: 'Record', icon: History, path: '/user/schedule' },
        { id: 'wishlist', label: 'Saved', icon: Heart, path: '/user/wishlist' },
        { id: 'chats', label: 'Chats', icon: MessageCircle, path: '/user/messages' },
        { id: 'profile', label: 'Me', icon: User, path: '/user/profile' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[100] animate-in slide-in-from-bottom-6 duration-700">
            <div className="bg-white border border-gray-100 rounded-[2.8rem] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex justify-between items-center px-4 relative overflow-hidden">
                {/* Active Indicator Decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-50">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-gray-50 to-transparent"></div>
                </div>

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                        <button
                            key={item.id}
                            onClick={() => item.path !== '#' && navigate(item.path)}
                            className={`relative flex flex-col items-center justify-center w-14 h-14 transition-all duration-300 ${active ? 'text-[#FF4D6D] scale-110' : 'text-gray-300 hover:text-gray-500'
                                }`}
                        >
                            {active && (
                                <div className="absolute -top-1 w-1 h-1 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,77,109,0.8)]"></div>
                            )}
                            <Icon
                                size={22}
                                strokeWidth={active ? 3 : 2}
                                className={`transition-all duration-300 ${active ? 'drop-shadow-[0_0_8px_rgba(255,77,109,0.3)]' : ''}`}
                            />
                            <span className={`text-[8px] font-black uppercase tracking-tighter mt-1 transition-all duration-300 ${active ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-1'
                                }`}>
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
