import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, MessageSquare, User } from 'lucide-react';
import { useVendor } from '../../context/VendorContext';

const VendorLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { getStats, notifications } = useVendor();
    const stats = getStats();

    return (
        <div className="min-h-screen bg-slate-50 font-sans relative">
            {/* Content Area */}
            <div className="pb-24 lg:pb-0">
                <Outlet />
            </div>

            {/* Bottom Navigation - Mobile Only (lg:hidden) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-50">
                {[
                    { icon: Home, label: 'Home', path: '/vendor/dashboard' },
                    { icon: FileText, label: 'Requests', path: '/vendor/requests', badge: stats.pendingRequests },
                    { icon: Calendar, label: 'Availability', path: '/vendor/availability' },
                    { icon: MessageSquare, label: 'Chat', path: '/vendor/chat' },
                    { icon: User, label: 'Profile', path: '/vendor/profile' }
                ].map((item) => {
                    const Icon = item.icon;
                    // Active state logic similar to UserLayout
                    const isActive = location.pathname === item.path ||
                        (item.path !== '/vendor/dashboard' && location.pathname.startsWith(item.path));

                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-brand-pink' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <div className="relative">
                                {/* Icon with 'stroke' styling only (via text-color), no fill/bg changes */}
                                <Icon className={`w-6 h-6`} />

                                {item.badge > 0 && (
                                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default VendorLayout;
