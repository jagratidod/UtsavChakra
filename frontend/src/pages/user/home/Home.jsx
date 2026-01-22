import React from 'react';
import { Search, Heart, MapPin, Calendar, Bell } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-brand-light-pink pb-24">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 rounded-b-[40px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-slate-400 text-sm">Hello,</p>
                        <h1 className="text-2xl font-serif font-bold text-slate-800">Surbhi & Aryan</h1>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-pink rounded-full border border-white" />
                        <Bell className="w-6 h-6 text-slate-400" />
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for Venues, Decorators..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-light-pink/50 border-none focus:ring-2 focus:ring-brand-pink/20 focus:outline-none placeholder:text-slate-400 text-sm"
                    />
                </div>
            </header>

            {/* Content Area */}
            <div className="px-6 py-8">
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-serif font-bold text-slate-800">Categories</h2>
                    <button className="text-brand-pink text-xs font-bold font-sans uppercase tracking-wider">View All</button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: "🏛️", name: "Venues" },
                        { icon: "📸", name: "Photo" },
                        { icon: "💄", name: "Makeup" },
                        { icon: "🍽️", name: "Catering" }
                    ].map((cat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-pink-50">
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Featured Section */}
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">Popular Venues</h2>
                <div className="space-y-6">
                    <div className="glass-card overflow-hidden">
                        <div className="h-48 relative">
                            <img
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Venue"
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                <Heart className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-4 inline-flex px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-brand-pink uppercase">
                                Trending
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif font-bold text-lg">Grand Palace Resort</h3>
                                <div className="text-brand-pink font-bold">₹1.5L - 2.5L</div>
                            </div>
                            <div className="flex items-center text-slate-400 text-sm gap-1 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>Mumbai, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium border-t border-pink-50 pt-4">
                                <span className="flex items-center gap-1 text-slate-500">
                                    <Calendar className="w-4 h-4 text-brand-pink" />
                                    Next Available: Oct 20
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-xl rounded-[32px] flex items-center justify-around px-4 shadow-2xl z-50">
                <button className="text-white bg-brand-pink p-3 rounded-2xl">
                    <Search className="w-6 h-6" />
                </button>
                <button className="text-slate-400 p-3">
                    <Calendar className="w-6 h-6" />
                </button>
                <button className="text-slate-400 p-3">
                    <Heart className="w-6 h-6" />
                </button>
                <button className="text-slate-400 p-3">
                    <UserCircle2 className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
};

// Placeholder for UserCircle2 if not imported
const UserCircle2 = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className={className}><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
);

export default Home;
