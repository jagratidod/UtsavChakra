import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Sparkles, ChevronRight } from 'lucide-react';
import Logo from '../../../assets/logo/utsavchakralogo.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.1)] border-x border-gray-50 relative overflow-x-hidden">
            {/* Boutique Header - Splash Style */}
            <div className="bg-[#2D328C] px-8 pt-20 pb-40 rounded-b-[4rem] relative overflow-hidden shrink-0 shadow-2xl">
                {/* Liquid Background Decorations */}
                <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-pink-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-orange-400/10 rounded-full blur-[80px]"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="h-16 mb-8 brightness-0 invert opacity-90">
                        <img src={Logo} alt="Utsav Chakra" className="h-full w-auto object-contain" />
                    </div>
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-3 block italic">Welcome to</span>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter italic leading-none">
                        Premium Event<br />
                        <span className="text-orange-400">Concierge</span>
                    </h1>
                </div>
            </div>

            {/* Entry Paths */}
            <div className="flex-1 px-6 -mt-24 relative z-20 space-y-6 pb-20">
                {/* User Entry */}
                <div
                    onClick={() => navigate('/user/login')}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 group cursor-pointer border border-gray-50 active:scale-95 transition-all overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-orange-100 transition-colors"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-[#2D328C] flex items-center justify-center text-white shadow-lg shadow-blue-100">
                            <User size={28} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-black text-[#2D328C] italic tracking-tight uppercase leading-none mb-2">Planning an Event?</h2>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Discover top-tier vendors and manage your dream celebration.</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#2D328C] group-hover:bg-[#2D328C] group-hover:text-white transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Vendor Entry */}
                <div
                    onClick={() => navigate('/vendor/login')}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/5 group cursor-pointer border border-gray-50 active:scale-95 transition-all overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-100 transition-colors"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-100">
                            <Briefcase size={28} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-black text-[#2D328C] italic tracking-tight uppercase leading-none mb-2">Are you a Partner?</h2>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">Grow your business with premium leads and professional tools.</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#2D328C] group-hover:bg-[#2D328C] group-hover:text-white transition-all">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>

                {/* Bottom Tagline */}
                <div className="pt-10 text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-gray-100"></div>
                        <Sparkles size={14} className="text-orange-400" />
                        <div className="h-[1px] w-8 bg-gray-100"></div>
                    </div>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em] italic mb-1">Crafting Unforgettable Moments</p>
                    <p className="text-[7px] font-bold text-gray-200 uppercase tracking-widest">© 2026 Utsav Chakra • Boutique Luxury</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

