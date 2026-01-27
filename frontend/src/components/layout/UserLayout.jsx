import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Store, Calendar, Home as HomeIcon, Newspaper, MessageCircle } from 'lucide-react';

const UserLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="min-h-screen bg-brand-light-pink relative">
            {/* Content Area */}
            <div className="pb-24">
                <Outlet />
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-50">
                {[
                    { icon: Store, label: 'Vendors', path: '/user/vendors' },
                    { icon: Calendar, label: 'Planner', path: '/user/planner' },
                    { icon: HomeIcon, label: 'Home', path: '/user/home' },
                    { icon: Newspaper, label: 'News', path: '/user/news' },
                    { icon: MessageCircle, label: 'Chat', path: '/user/chat' }
                ].map((item) => {
                    const Icon = item.icon;
                    // Check if active: exact match or sub-paths for some specific routes if needed
                    // For now, using strict match or startsWith for related sections to keep highlights logical
                    const isActive = location.pathname === item.path ||
                        (item.path !== '/user/home' && location.pathname.startsWith(item.path) && item.path !== '/user/chat') ||
                        (item.path === '/user/chat' && location.pathname.startsWith('/user/chat'));

                    // Note: 'Home' is usually exact. 'Vendors' could be active for '/user/vendor/...' too.
                    // Improving logic slightly to catch single vendor pages under 'Vendors' tab if user desires, 
                    // but standard 'vendors' path is plural. Single vendor path is singular '/user/vendor/:id'.
                    // Let's make 'Vendors' tab active for '/user/vendor/' as well.

                    const isVendorActive = item.label === 'Vendors' && (location.pathname === '/user/vendors' || location.pathname.startsWith('/user/vendor/'));
                    const isNewsActive = item.label === 'News' && (location.pathname === '/user/news' || location.pathname.startsWith('/user/news/'));

                    const finalIsActive = isActive || isVendorActive || isNewsActive;

                    return (
                        <button
                            key={item.label}
                            onClick={() => navigate(item.path)}
                            className={`flex flex-col items-center gap-1 transition-colors ${finalIsActive ? 'text-brand-pink' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <div className="relative">
                                <Icon className={`w-6 h-6`} />
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default UserLayout;
